let canvas=document.querySelector("#canvas");
let line=[];
let db=[];

let { top : canvasTop } = canvas.getBoundingClientRect();

canvas.width=window.innerWidth;
canvas.height=window.innerHeight-(canvasTop);

window.addEventListener("resize",function(e){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight-(canvasTop);
    redrawLine();
});

let mouseDown=false;
let ctx=canvas.getContext("2d");
ctx.lineCap = 'round';
canvas.addEventListener("mousedown",function(e){
    let x=e.clientX;
    let y=e.clientY -(canvasTop);
    mouseDown=true;
    ctx.beginPath();
    ctx.moveTo(x,y);
    let pointObject={
        type: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        x:x,
        y:y
    };
    line.push(pointObject);
    redoDB=[];
})

canvas.addEventListener("mousemove",function(e){
    if(mouseDown){
        let x=e.clientX;
        let y=e.clientY-(canvasTop);
        ctx.lineTo(x,y);
        ctx.stroke();
        let pointObject={
            type:"mm",
            x:x,
            y:y
        };
        line.push(pointObject);
    }
})
canvas.addEventListener("mouseup",function(){
    mouseDown=false;
    db.push(line);
    line=[];
})