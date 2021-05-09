function getRowIdColIdFromElement(e){
    let rowid=e.getAttribute("rowid");
    let colid=e.getAttribute("colid");
    return{
        rowid,
        colid
    };
}

function getRowIdColIdFromAddress(address){
    let rowid=Number(address.substring(1))-1;
    let colid=address.charCodeAt(0)-65;
    return{
        rowid,
        colid
    };
}

function solveFormula(formula,selfcellobject){
    let formComps=formula.split(" ");

    for(let i=0;i<formComps.length;i++){
        let component=formComps[i];
        if(component[0]>="A" && component[0]<="Z"){
            let {rowid,colid}=getRowIdColIdFromAddress(component);
            let cellObject=db[rowid][colid];
            let value=cellObject.value;

            if (selfcellobject) {
                // push yourself in the childrens of formula Components cellObject
                cellObject.children.push(selfcellobject.name);
                selfcellobject.parents.push(cellObject.name);
            }
            formula=formula.replace(component,value);   
        }
    }
    let computeValue=eval(formula); //inbuilt function for infix evaluation
    return computeValue;
}


function updateChildren(cellObject){
    for(let i=0; i<cellObject.children.length; i++){
        let childname=cellObject.children[i];
        let {rowid,colid}=getRowIdColIdFromAddress(childname);
        let childObject=db[rowid][colid];
        let value=solveFormula(childObject.formula);
        document.querySelector(`div[rowid='${rowid}'][colid='${colid}']`).textContent = value;
        childObject.value=value;
        updateChildren(childObject);
    }
}

function removeformula(cellObject){
    cellObject.formula="";
    for(let i=0;i<cellObject.parents.length;i++){
        let {rowid,colid} = getRowIdColIdFromAddress(cellObject.parents[i]);
        let object=db[rowid][colid];
        console.log(object.children);
        object.children=object.children.filter(function(child){
            return child != cellObject.name ;        
        });
        console.log(object.children);
    }

    cellObject.parents=[];
}