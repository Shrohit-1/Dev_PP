//express package of node
const { next } = require("cheerio/lib/api/traversing");
const { response } = require("express");
const express=require("express");

// for using requests
const app= express();
app.use(express.json());
app.use(express.static('public'));

let user=[];
let plans=[];
const Userrouter=express.Router();
const authRouter=express.Router();
app.use("/api/user",Userrouter);
//get data from server
function getUser(req,res){
    console.log("user");
    res.json(user);
}

function createUser(req,res){
    console.log(req.body);
    user=req.body;
    res.status(200).send("done");
}

function updateUser(req,res){
    let obj = req.body;
    for( let key in obj ){
        user[key]=obj[key];
    }
    res.status(200).send("updated");
}

function deleteUser(req,res){
    user={};
    res.status(200).json(user);
}

function getUserByID(req,res){

}

app.use("/api/auth",authRouter);

function signupUser(req,res){
    //email name password
    let {email,name,password}=req.body;
    user.push({
        email,name,password
    });
    //console.log(user);
    res.status(200).json({
        message:" user created ",
        createdUser : req.body
    });
}

function authorized(req,res){
    let{email,password}=req.body;
    let flag=false;
   console.log(user);

    for( let i=0;i<user.length; i++ ){
        let obj=user[i];
        //console.log(obj);
        if(obj.email === email && obj.password === password){
            console.log(true);
            flag=true;
            return res.json({
                message:"Logged in"
            })
        }
    }

    if(flag!=true){
        return res.json({
            message:"invalid id and password"
        });
    }
}

function loginUser(req,res){
    //user authorized for login
    console.log("login function");
    res.status(200).json({
        message:"logged in"
    });
}

authRouter
    .post("/signup",signupUser)
    .post("/login",authorized);


//---------------------------------------------
Userrouter
.route("/")
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

Userrouter
.route("/:id")
.get(getUserByID);

/*
app.get("/user",)

//send data to server
app.post("/user",)

//update data in server
app.patch("/user",)

//delete data from server
app.delete("/user",)

*/

//---------------------plans-------------------
const planRouter=express.Router();
app.use("/api/plan",planRouter);

planRouter
    .route("/")
    .get(getPlans)
    .post(addPlan)
    .delete(deletePlan)

function getPlans(req,res){
    res.status(200).json({plans});
}

function addPlan(req,res){
    let {id,name,ratings,price,delivery,meals,description}=req.body;
    user.push({id,name,ratings,price,delivery,meals,description});
    res.status(200).json({
        message:"plan added"
    })
}

function deletePlan(req,res){
    let {id,name,ratings,price,delivery,meals,description}=req.body;
    for( let obj in plans ){
        if( obj.id ===id ){
            plans.remove(obj);
            break;
        }
    }
    res.status(200).json({
        message:"plan deleted"
    });
}


app.listen(8080,function(){
    console.log("Server Started");
})