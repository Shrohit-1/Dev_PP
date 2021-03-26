let users = [
    {
      name: "Rajneesh",
      age: 34,
      address: {
        local: "22 Alaknanda",
        city: "Dehradun",
        state: "UK",
      },
      orders: [{ id: 1, name: "GOT Book Series" }],
    },
    {
      name: "Bhavesh",
      age: 37,
      address: {
        local: "48 DT Row",
        city: "Hyderabad",
        state: "AP",
      },
    },
    {
      name: "Jasbir",
      age: 38,
      address: {
        local: "196 Lama Bhavan",
        city: "Gangtok",
        state: "Sikkim",
      },
      orders: [
        { id: 1, name: "Chair" },
        { id: 2, name: "PS5" },
      ],
    },
  ];
  

  function isexist(users,userObject){
      for(let i=0;i<users.length;i++){
          if(users[i].name==userObject.name){
              return i;
          }
      }
      return -1;
  }

  function orderexist(users,idx){
     
      for(key in users[idx]){
        if(key=="orders"){
          return true;
        }
      }
      return false;
  }
  function itemexist(users,idx,item){
      for(let i=0;i<users[idx].orders.length;i++){
        if(users[idx].orders[i].name==item){
          return true;
        }
        
      }
      return false;
  }


  function updateUsers(users, userObject, item="") {
    //write your code here
    let idx=isexist(users,userObject);
     if(idx!=-1){
         if(item!=""){
              
              if(orderexist(users,idx)){
                
                if(!(itemexist(users,idx,item))){
                  let newitem={
                    id : users[idx].orders.length+1,
                    name: item,
                  };
                  users[idx].orders.push(newitem);
                }
                
              }
              else{
                let neworde=[];
                let newitem={
                  id : 1,
                  name: item,
                };
                neworde.push(newitem);
                users[idx].orders=neworde;
              }
              
         }
     }
     else{

        users.push(userObject);
        if(item!=""){
          let newitem={
            id : 1,
            name:item
          };
          users[users.size()-1].orders=newitem;
        }
     }
     return users;
  }
  
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "GOT Book Series"
      )
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(users, {
        name: "Ravi",
        age: 24,
        address: {
          local: "25 Iroda",
          city: "Dehradun",
          state: "UK",
        },
      })
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Ravi",
          age: 24,
          address: {
            local: "25 Iroda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Chair"
      )
    )
  );
  
  console.log(
    JSON.stringify(
      updateUsers(
        users,
        {
          name: "Rajneesh",
          age: 34,
          address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
          },
        },
        "Fan"
      )
    )
  );
  