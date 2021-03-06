let stickyBTN=document.querySelector("#sticky");
let canvasDiv=document.querySelector(".canvas-content");

let isminimized=false;

stickyBTN.addEventListener("click",function(){
    
  let stickyDiv=document.createElement("div");
  stickyDiv.classList.add("sticky");
  stickyDiv.innerHTML=`<div class="sticky-header">
    <div id="minimize"><img src="./NewIcons/minimize.svg" alt=""></div>
    <div id="close"><img src="./NewIcons/close.svg" alt=""></div>
  </div>
  <div class="sticky-content" contenteditable="true"></div>`;

  canvasDiv.append(stickyDiv);

  let minimizeBTN=stickyDiv.querySelector("#minimize");
  let closeBTN=stickyDiv.querySelector("#close");
  minimizeBTN.addEventListener("click",function(){
       if(isminimized){
           stickyDiv.querySelector(".sticky-content").classList.remove("hide");
           isminimized=false;
       }
       else{
        stickyDiv.querySelector(".sticky-content").classList.add("hide");
        isminimized=true;
       }
  });
  closeBTN.addEventListener("click",function(){
     stickyDiv.remove();
  });

  let stickyHeader= stickyDiv.querySelector(".sticky-header");
  let ishold=false;
  let initialx;
  let initialy;

  stickyHeader.addEventListener("mousedown",function(e){
    ishold=true;
    initialx=e.clientX;
    initialy=e.clientY;
  });

  stickyHeader.addEventListener("mousemove",function(e){
    
    if(ishold){
      let finalx=e.clientX;
      let finaly=e.clientY;
      let dx=finalx-initialx;
      let dy=finaly-initialy;

      let { top, left } = stickyDiv.getBoundingClientRect();

      stickyDiv.style.top=top+dy+"px";
      stickyDiv.style.left=left+dx+"px";
      initialx=finalx;
      initialy=finaly;
    }

  });

  stickyHeader.addEventListener("mouseup",function(){
    ishold=false;
  });


})

