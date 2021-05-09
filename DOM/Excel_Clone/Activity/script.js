let topLeftCell=document.querySelector(".top-left-cell");
let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let addressInput= document.querySelector("#address");
let formulaInput=document.querySelector("#formula");
let lastSelectedCell;

cellsContentDiv.addEventListener("scroll",function(e){
    let top=e.target.scrollTop;
    let left=e.target.scrollLeft;
    topLeftCell.style.top=top+"px";
    topLeftCell.style.left=left+"px";
    topRow.style.top=top+"px";
    leftCol.style.left=left+"px";
})

let allCells=document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
        let rowid=Number(e.target.getAttribute("rowid"));
        let colid=Number(e.target.getAttribute("colid"));
        let address=String.fromCharCode(65+colid)+(rowid+1)+"";
        addressInput.value=address;
        formulaInput.value=db[rowid][colid].formula;

        let cellObject=db[rowid][colid];
        if(cellObject.fontstyle.bold==true){
            document.querySelector(".bold").classList.add("active-font-style");
        }
        else{
            document.querySelector(".bold").classList.remove("active-font-style");
        }
        if(cellObject.fontstyle.italic==true){
            document.querySelector(".italic").classList.add("active-font-style");
        }
        else{
            document.querySelector(".italic").classList.remove("active-font-style");
        }
        if(cellObject.fontstyle.bold==true){
            document.querySelector(".underline").classList.add("active-font-style");
        }
        else{
            document.querySelector(".underline").classList.remove("active-font-style");
        }
    });

    allCells[i].addEventListener("blur",function(e){
        let cellValue=e.target.textContent;
        lastSelectedCell=e.target;
        let rowid=e.target.getAttribute("rowid");
        let colid=e.target.getAttribute("colid");
        let cellObject=db[rowid][colid];
        if(cellObject.value == cellValue){
            return;
        }
        if(cellObject.formula){
            removeformula(cellObject);
            formulaInput.value="";
        }
        cellObject.value=cellValue;
        updateChildren(cellObject);

        if(cellObject.visited){
            return;
        }
       cellObject.visited=true;
       visitedCells.push({ rowid:rowid , colid :colid });
    });
}

formulaInput.addEventListener("blur",function(e){
    let formula=e.target.value;

    if(formula){
        let{rowid,colid}=getRowIdColIdFromElement(lastSelectedCell);

        let cellObject=db[rowid][colid];
        if(cellObject.formula){
            removeformula(cellObject);
        }
        let computeValue=solveFormula(formula,cellObject);
        cellObject.formula=formula;
        cellObject.value=computeValue;
        lastSelectedCell.textContent=computeValue;
        updateChildren(cellObject);

        if(cellObject.visited){
            return;
        }
        cellObject.visited=true;
        visitedCells.add({ rowid:rowid , colid :colid });
    }

})