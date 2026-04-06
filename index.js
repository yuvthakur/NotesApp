const express = require('express');
const app = express();
const path = require("path")
let {v4:uuidv4} = require('uuid')
let methodOverride = require('method-override');

let port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

    // DATABASE 
    let Notelist = [
        {id:uuidv4(),content:"this is sachin"},
        {id:uuidv4(),content:"this is rahul"},
        {id:uuidv4(),content:"this is gaurav"}
    ];


    // show all notes 
app.get("/notes",(req,res)=>{
        res.render("index.ejs",{Notelist});
})

    // create new note

app.get("/notes/new",(req,res)=>{
    res.render("create.ejs");
})


app.post("/notes",(req,res)=>{
    let {content} = req.body;
    let id = uuidv4();
    Notelist.push({id,content});
    res.redirect("/notes")
})

    // show a specific post

app.get("/notes/:id",(req,res)=>{
    let {id} = req.params;
    let note = Notelist.find((n)=> n.id === id);
    res.render("note.ejs",{note})
})

    // Edit a specific post

app.get("/notes/:id/edit",(req,res)=>{
    let {id} = req.params;
    let note = Notelist.find((n)=> n.id === id);
    res.render("edit.ejs",{note})
})

app.patch("/notes/:id",(req,res)=>{
    let {id} = req.params;
    let note = Notelist.find((n)=> n.id === id);
    let newContent = req.body.content;
    note.content = newContent;
    res.redirect("/notes")
})

    // DELETE REQUEST 
app.delete("/notes/:id",(req,res)=>{
    let {id} = req.params;
    Notelist = Notelist.filter((n)=> n.id !== id);
})


app.listen(port,()=>{
    console.log(`App is listening on port : ${port}`)
});

