let undoBTN=document.querySelector("#undo");
let redoBTN=document.querySelector("#redo");

let redoDB=[];

undoBTN.addEventListener("click",function(){
    let lineObject=db.pop();
    redoDB.push(lineObject);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    redrawLine();
})

function redrawLine(){
    ctx.lineCap = 'round';
    for(let i=0 ; i<db.length ; i++){
        let line = db[i];

        for(let j=0 ; j<line.length ; j++){

            let pointObject = line[j];
            if(pointObject.type=="md"){
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }

        }
    }
}


redoBTN.addEventListener("click",function(e){
    if(redoDB.length>=1){
        let redoLine=redoDB.pop();

        for(let i=0;i<redoLine.length;i++){
            let pointObject = redoLine[i];
            if(pointObject.type=="md"){
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x , pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x , pointObject.y);
                ctx.stroke();
            }
        }

        db.push(redoLine);
    }
})