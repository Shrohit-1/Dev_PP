const fs=require("fs");

let pendingpromise1=fs.promises.readFile("f1.txt");
pendingpromise1.then(function (data){
    console.log(data +"");

    let pendingpromise2=fs.promises.readFile("f2.txt");
  //hell occurs from here
    pendingpromise2.then(function (data){
        console.log(data +"");
                                                            ///but this is also similar as callback hell so this is not good to have serial execution we have promises chaining
        let pendingpromise3=fs.promises.readFile("f3.txt");
        pendingpromise3.then(function (data){
            console.log(data+" ");   

        });
        
    });

});


