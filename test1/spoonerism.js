let input="kite flying";

function spoon(input){
    let words=input.split(" ");
     
    let firstletteroffirstword=words[0][0];
    let firstletterofsecondword= words[1][0];
    let ans=firstletterofsecondword+ words[0].slice(1)+" "+firstletteroffirstword+words[1].slice(1);
    return ans;
}

let ans=spoon(input);
console.log(ans);
