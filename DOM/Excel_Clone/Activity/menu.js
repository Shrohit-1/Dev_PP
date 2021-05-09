let menu= document.querySelector(".menu");
let fileMenuOptions=document.querySelector(".file-menu-options");
let homeMenuOptions=document.querySelector(".home-menu-options");

let boldBTN=document.querySelector(".bold");
let italicBTN=document.querySelector(".italic");
let underlineBTN=document.querySelector(".underline");

menu.addEventListener("click",function(e){
    let selectedOption=e.target;

    if(selectedOption.classList.contains("menu")){
        return;
    }
    if(selectedOption.classList.contains("active-menu")){
        return;
    }

    document.querySelector(".active-menu").classList.remove("active-menu");
    selectedOption.classList.add("active-menu");
    
    let menuname=selectedOption.classList[0];

    if(menuname=="home"){
        homeMenuOptions.classList.remove("hide");
        fileMenuOptions.classList.add("hide");
    }
    else{
        homeMenuOptions.classList.add("hide");
        fileMenuOptions.classList.remove("hide");
    }
})

boldBTN.addEventListener("click",function(e){
    if(lastSelectedCell){
        let{rowid,colid}= getRowIdColIdFromElement(lastSelectedCell);
        let cellObject=db[rowid][colid];
        if(cellObject.fontstyle.bold){
            lastSelectedCell.style.fontWeight="lighter";
            boldBTN.classList.remove("active-font-style");
        }
        else{
            lastSelectedCell.style.fontWeight="bold";
            boldBTN.classList.add("active-font-style");
        }
        cellObject.fontstyle.bold=!cellObject.fontstyle.bold;
    }
})

italicBTN.addEventListener("click",function(e){
    if(lastSelectedCell){
        let{rowid,colid}= getRowIdColIdFromElement(lastSelectedCell);
        let cellObject=db[rowid][colid];
        if(cellObject.fontstyle.italic){
            lastSelectedCell.style.fontStyle="normal";
            italicBTN.classList.remove("active-font-style");
        }
        else{
            lastSelectedCell.style.fontStyle="italic";
            italicBTN.classList.add("active-font-style");
        }
        cellObject.fontstyle.italic=!cellObject.fontstyle.italic;
    }
})

underlineBTN.addEventListener("click",function(e){
    if(lastSelectedCell){
        let{rowid,colid}= getRowIdColIdFromElement(lastSelectedCell);
        let cellObject=db[rowid][colid];
        if(cellObject.fontstyle.underline){
            lastSelectedCell.style.textDecoration="none";
            e.target.classList.remove("active-font-style");
        }
        else{
            lastSelectedCell.style.textDecoration="underline";
            e.target.classList.add("active-font-style");
        }
        cellObject.fontstyle.underline=!cellObject.fontstyle.underline;
    }
})