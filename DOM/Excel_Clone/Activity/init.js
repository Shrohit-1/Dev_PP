let cellsContentDiv=document.querySelector(".cellsContent");

function initCells(){

    let cellContent = "<div class='top-left-cell'></div>";
    
    cellContent += '<div class="top-row">';
    for(let i=0;i<26;i++){
        cellContent += `<div class='top-row-cell'>${String.fromCharCode(65+i)}</div>`;
    }
    cellContent += "</div>";

    cellContent += "<div class='left-col'>";
    for(let i=0;i<100;i++){
        cellContent += `<div class="left-col-cell">${i+1}</div>`
    }
    cellContent +="</div>"

    cellContent += "<div class='cells'>";
    for(let i=0; i<100; i++){
        cellContent += '<div class="row">';
        for(let j=0; j<26; j++){
            cellContent+= `<div class="cell" contentEditable="true" rowid="${i}" colid="${j}"></div>`;
        }
        cellContent += '</div>';
    }
    cellContent += '</div>';
    cellsContentDiv.innerHTML=cellContent;
}
initCells();

let sheetsDB=[];
let db;
let visitedCells;

function initUI(){
    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).innerHTML="";
    //     }
    // }
    for(let i=0;i<visitedCells.length;i++){
        let {rowid,colid}=visitedCells[i];
        document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).innerHTML="";
    }
}

function initDB(){
    let newSheetdb=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let name=String.fromCharCode(65+j)+(i+1)+"";
            let cellObject={
                name: name,
                value:"",
                formual:"",
                children:[],
                parents:[],
                visited:false,
                fontstyle: { bold:false , italic:false , underline:false},
            };
            row.push(cellObject);
        }
        newSheetdb.push(row);
    }
    visitedCells=[];
    db=newSheetdb;
    sheetsDB.push({db:newSheetdb , visitedCells:visitedCells});
}
initDB();

function initUIOfSheet(){
    let SheetID=document.querySelector(".active-sheet").getAttribute("sheetid");
    db=sheetsDB[SheetID].db;
    visitedCells=sheetsDB[SheetID].visitedCells;
    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).textContent=db[i][j].value;
    //     }
    // }
    for(let i=0;i<visitedCells.length;i++){
        let {rowid,colid}=visitedCells[i];
        document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).textContent=db[rowid][colid].value;
    }
}

