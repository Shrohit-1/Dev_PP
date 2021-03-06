//output
console.log("hello world!");

//top to down , left to right

//traditional  datatypes -- int , char, string, boolean ,float, double, big int;


// js data-- Number, Boolean, String, undefined, Object;

// ES6 -- let or const for defining block scoped variable

//let a= any type of value can be assigned to a;

let a=10;
let b=true;
let c= undefined;
console.log(a);

if(true)
{
    let f="enfhf w";
}
const pi=3.14;
//const. value can be assigned only once  

// == (data type check nhi hota) ,===(datatype check hoga)

console.log(10=='10');
console.log(10==='10');

//object -- key value pairs
// let moviess ={}; //empty objects

let data={
    name : "shrohit" ,
    place : "queens"
}

console.log(data.name);

let key="name";

//console.log(data.key);         //undefined
console.log(data[key]);          // will give shrohit

data.key="i am a new value";

console.log(data);                // way to indroduce new key

// keys are always unique




//Arrays

// int arr[]=[10,20,30,50];
//int [] arr= new int[n]

// js---- 
let values=[10,false,"adax",data,
             [10,20,30,20]
           ];
console.log(values);

for(let key in data)
{
    console.log
}