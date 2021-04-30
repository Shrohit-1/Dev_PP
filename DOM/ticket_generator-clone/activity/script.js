let filterCodes = {
    red: "#F16D6D",
    blue: "#4D8EB7",
    green: "#34A162",
    black: "#000000",
  };
let selectedFilter="black";
let allfilters=document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let modalBtn=document.querySelector(".open-modal");
let closeModalBtn=document.querySelector(".close-modal");

modalBtn.addEventListener("click",handleOpenModal);
closeModalBtn.addEventListener("click",handlecloseModal)


function loadTickets(){
    if(localStorage.getItem("allTickets")){
        ticketContainer.innerHTML="";
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));
        for(let i=0;i<allTickets.length;i++){
            let {ticketId , ticketFilter, ticketContent}=allTickets[i];
            let ticket=document.createElement("div");
            ticket.classList.add("ticket");
            ticket.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete"  ><i class="fas fa-trash" id=${ticketId}></i></div>
            </div>
            <div class="ticket-content">${ticketContent}</div>`
            ticket.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
            ticket.querySelector(".ticket-delete i").addEventListener("click",handleDeleteTicket);
            ticketContainer.append(ticket);
        }
    }
}
loadTickets();

for(let i=0;i<allfilters.length;i++){
    allfilters[i].addEventListener("click",function(event){
        chooseFilter(event);
    })
}

function chooseFilter(e) {

    if(e.target.classList.contains("active-filter")){
        e.target.classList.remove("active-filter");
        loadTickets();
        return;
    }
    
    if(document.querySelector(".filter.active-filter")){
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }
    e.target.classList.add("active-filter");
    let ticketFilter = e.target.classList[1];
    loadSelectedTickets(ticketFilter);
   // ticketContainer.style.background = filterCode;
}

function loadSelectedTickets(ticketFilter){
    if(localStorage.getItem("allTickets")){
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets=allTickets.filter(function(filterObject){
            return filterObject.ticketFilter==ticketFilter;
        });
        ticketContainer.innerHTML="";
        for(let i=0;i<filteredTickets.length;i++){
            let {ticketId , ticketFilter, ticketContent}=filteredTickets[i];
            let ticket=document.createElement("div");
            ticket.classList.add("ticket");
            ticket.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete"  ><i class="fas fa-trash" id=${ticketId}></i></div>
            </div>
            <div class="ticket-content">${ticketContent}</div>`
            ticket.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
            ticket.querySelector(".ticket-delete i").addEventListener("click",handleDeleteTicket);
            ticketContainer.append(ticket);
        }
    }
    
}

function toggleTicketFilter(e){
    filters=["red","blue","green","black"];
     let currentFilter=e.target.classList[1];
     let idx=filters.indexOf(currentFilter);
     idx++;
     idx = idx % filters.length;

     e.target.classList.remove(currentFilter);
     e.target.classList.add(filters[idx]);

     let id=e.target.nextElementSibling.children[0].textContent.split("#")[1];
     //console.log(id);

     let allTickets=JSON.parse(localStorage.getItem("allTickets"));
     for(let i=0; i<allTickets.length; i++){
         if(allTickets[i].ticketId == id){
             allTickets[i].ticketFilter=filters[idx];
             break;
         }
     }
     localStorage.setItem("allTickets",JSON.stringify(allTickets));
}

function handlecloseModal(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove(); //remove modal
    }
}

function handleOpenModal(e){
    let modal=document.querySelector(".modal");
    if(modal){
        return;
    }

    let modalDiv=document.createElement("div");
    modalDiv.classList.add("modal");

    modalDiv.innerHTML=` <div class="modal-textbox" data-typed="false" contenteditable="true">
       WRITE YOUR TEXT HERE!!!!
    </div>
      <div class="modal-filter-options">
      <div class="modal-filter red"></div>
      <div class="modal-filter blue"></div>
      <div class="modal-filter green"></div>
      <div class="modal-filter black active-filter"></div>
    </div>`;
    let filters=modalDiv.querySelectorAll(".modal-filter");
    for(let i=0;i<filters.length;i++){
        filters[i].addEventListener("click",managefilter)
    }

    modalDiv.querySelector(".modal-textbox").addEventListener("click",clearModalTextbox);
    ticketContainer.append(modalDiv);
    modalDiv.querySelector(".modal-textbox").addEventListener("keypress",addticket);
}

function handleDeleteTicket(e){
    let allTickets=JSON.parse(localStorage.getItem("allTickets"));

    let filteredTickets=allTickets.filter(function(object){
        return object.ticketId != e.target.id; 
    })
    localStorage.setItem("allTickets",JSON.stringify(filteredTickets));
    loadTickets();
}

function managefilter(e){
    clickedFilter=e.target.classList[1];
    if(clickedFilter==selectedFilter){
        return;
    }
    selectedFilter=clickedFilter;
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}


function addticket(e){
    if(e.key=="Enter"){
        let modalText=e.target.textContent;
        let ticketId=uid();
        let ticket=document.createElement("div");
        ticket.classList.add("ticket");
        ticket.innerHTML=`<div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-info">
        <div class="ticket-id">#${ticketId}</div>
        <div class="ticket-delete" ><i class="fas fa-trash" id=${ticketId}></i></div>
        </div>
        <div class="ticket-content">${modalText}</div>`;
        ticket.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
        ticket.querySelector(".ticket-delete i").addEventListener("click",handleDeleteTicket);
        ticketContainer.append(ticket);
        //remove modal from ui
        e.target.parentNode.remove();
        //ticket has been appended 

        //storing data in localStorafe in browser 
        if(!localStorage.getItem("allTickets")){
            //first time
            let allTickets= [];
            let ticketObject={};
            ticketObject.ticketId=ticketId;
            ticketObject.ticketFilter=selectedFilter;
            ticketObject.ticketContent=modalText;
            allTickets.push(ticketObject);

            localStorage.setItem("allTickets",JSON.stringify(allTickets));
        }
        else{
            let ticketObject={};
            let allTickets= JSON.parse(localStorage.getItem("allTickets"));
            ticketObject.ticketId=ticketId;
            ticketObject.ticketFilter=selectedFilter;
            ticketObject.ticketContent=modalText;
            allTickets.push(ticketObject);
            localStorage.setItem("allTickets",JSON.stringify(allTickets));
        }


        selectedFilter="black";
    }
}

function clearModalTextbox(e){
    if(e.target.getAttribute("data-typed")=="true"){
        return;
    }
    e.target.innerHTML="";
    e.target.setAttribute("data-typed","true")
}

