let input={
    newObj: {
      obj2: {
        obj5: {
          one: 1,
        },
      },
    },
    obj3: {
      obj4: { two: 2 },
    },
  };

function getflat(input,flatobject,str){
    for(key in input){
        if( typeof input[key] =="object"){
            str=str + key+".";
            getflat(input[key],flatobject,str);
        }
        else{
            str=str+key;
            flatobject[str]=input[key];

        }
    }
}
let flatobject={};
getflat(input,flatobject,"");
console.log(flatobject);