// mkdir para crear directorio
// echo > index.js para crear archivo o touch index.js 
// npm init -y para crear archivo json 
// nmp i express
// npm i ejs (no hay que requerirlo)

const express = require("express");
const app = express();
const path =  require('path')
const methodOverride = require('method-override') 
const { v4: getUuid } = require('uuid');



app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        id : getUuid(),
        username: "Todd",
        comment: "LOL it's so funny 1"
    },
    {
        id : getUuid(),
        username: "Toddi",
        comment: "LOL it's so funny 2"
    },
    {
        id : getUuid(), 
        username: "Todde",
        comment: "LOL it's so funny 3"
    },
    {
        id : getUuid(),
        username: "Todda",
        comment: "LOL it's so funny 4"
    },
]

app.get("/comments", (req, res) => {
    res.render('comments/index', { comments })
})

app.get("/comments/new", (req, res) => {
    res.render('comments/new', { comments })
})

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})


app.get("/comments/:id/edit", (req, res) => {
    const { id }= req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment})
})


app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    comments.push({username,comment, id: getUuid()})
    res.redirect("/comments");
    
})

app.patch("/comments/:id", (req, res) => {
    const { id }= req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})   

app.delete('/comments/:id/', (req, res) => {
    const { id }= req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments');
})

app.get("/tacos", (req, res) => {
    res.send("Get /tacos response")
})

app.post("/tacos", (req, res) => {
    const {meat , qty } = req.body;
    res.send(`Ok here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log("On port 3000!")
})

// 
//Get /comments - list all comments
// POST/comments - create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /commnets/:id - Update one comment
// DELETE /commnets/:id - Destroy one comment

