function firstname(fullname)
{
    fullname=fullname.split(" ");  //msplits string on the basis of " " and stores the two parts in an array with indices 0 and 1
    return fullname[0];
}

function lastname(fullname)
{
    fullname=fullname.split(" ");
    return fullname[1];
}

function sayhi(fullname , fun)
{
    console.log(fun(fullname));
}


sayhi("Shrohit soam",firstname);
sayhi("shivam singh",lastname);
