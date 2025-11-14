const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride=require("method-override");

app.use(express.urlencoded ({extended:true}));

app.set("view engine", "ejs");
app.set("views" ,path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.get("/" ,(req, res)=>{
    res.send("this is root of the route");
});

app.req("/home" ,(req, res)=>{
    res.send("this is root of the route");
});


let posts=[
    {
        id:"3a",
        username:"Indresh kumar Gupta",
        content:"I love coding very much",

    },
    {   
        id:"4a",
        username:"Rahul Yadav",
        content:"I am always happy to do hardwork",

    },
    {   
        id:"5a",
        username:"Nitish Gupta",
        content:"I am always in silent for learing new thing",
    }
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    console.log(req.body);
    let {username, content} =req.body;
    posts.push({username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    
    let {id} =req.params;
    console.log(id);
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req, res)=>{
    let {id} =req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
     post.content=newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id} =req.params;
    let post =posts.find((p)=> id===p.id);
    res.render("edit.ejs", {post});
});



app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
     posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("app is listening in port 8080");
});

console.log("hello world");