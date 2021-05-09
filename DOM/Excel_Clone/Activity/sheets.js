let addSheetBtn=document.querySelector(".add-sheet");
let sheetListDiv=document.querySelector(".sheets-list");
let SheetId=0;

addSheetBtn.addEventListener("click",function(e){
    let sheetDiv=document.createElement("div");
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    
    SheetId++;
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.innerHTML=`Sheet ${SheetId+1}`;
    sheetDiv.setAttribute("sheetid",SheetId);

    sheetListDiv.append(sheetDiv);
    initUI();
    initDB();
});

sheetListDiv.addEventListener("click",function(e){
    let selectedSheet=e.target;
    if(selectedSheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedSheet.classList.add("active-sheet");
    initUI();
    initUIOfSheet();
})


 