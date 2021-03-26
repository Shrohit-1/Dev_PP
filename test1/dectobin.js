let input=45;

function dectobin(input){
    let pow=1;
    let num=0;
    while(input!=0){
        let rem=input%2;
        input=parseInt(input/2);
        num=num+rem*pow;
        pow=pow*10;
    }
    return num;
}

let ans=dectobin(input);
console.log(ans);