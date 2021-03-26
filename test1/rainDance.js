let input=[
    { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
    { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
  ];

function raindance(input){
    let properoutput=[];
    
    for(let i=0;i<input.length;i++){
        let output={};
        output["name"]=input[i].name;
        let total=input[i].rainfall.reduce( function cb(total,current){
            return current+total;
        });
        let avg=total/input[i].rainfall.length;
        output["avgRainfall"]=avg;
        properoutput.push(output);
    }
    return properoutput;
}  
let obj=raindance(input);
console.log(obj);