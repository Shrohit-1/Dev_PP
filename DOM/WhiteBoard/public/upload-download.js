let uploadBTN= document.querySelector("#photo");
let download = document.querySelector("#download");
let photoInput = document.querySelector("#photo-upload");
let canvasContent=document.querySelector(".canvas-content");
uploadBTN.addEventListener("click",function(){
    photoInput.click();
});

photoInput.addEventListener("change",function(e){
    let fileObject = e.target.files[0];
    console.log(fileObject);

    let imageUrl = URL.createObjectURL(fileObject);
    // console.log(imageUrl);
    let img = document.createElement("img");
    img.src = imageUrl;
    img.classList.add("image-upload");
    appendStickyimg(img);
});

download.addEventListener("click" , function(){
    let canvasUrl = canvas.toDataURL({type:"image/png"});
    let aTag = document.createElement("a");
    aTag.download = "canvas.png";
    aTag.href = canvasUrl;
    aTag.click();
});

function appendStickyimg(elem){
  let stickyDiv=document.createElement("div");
  stickyDiv.classList.add("sticky");
  stickyDiv.innerHTML=`<div class="sticky-header">
    <div id="minimize"><img src="./NewIcons/minimize.svg" alt=""></div>
    <div id="close"><img src="./NewIcons/close.svg" alt=""></div>
  </div>
  <div class="sticky-content"></div>`;

  let stickycontent=stickyDiv.querySelector(".sticky-content");
  stickycontent.append(elem);
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
}
