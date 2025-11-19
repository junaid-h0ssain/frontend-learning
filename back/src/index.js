import express from 'express';
import path from 'path';
import { connectDB} from './config.js';
import dotenv from 'dotenv';

dotenv.config(); 

// connect to database
connectDB(); 

const app = express();

// get note
function getNote(req,res){
    let c = 5
    res.status(200).send("You got "+ c +" notes");
}
app.get("/api/notes",getNote);

// post note
function postNote(req,res){
    let c = "New Note wawa"
    res.status(201).json({message : ""+c+ " posted successfully"});
}
app.post("/api/notes",postNote);

// put note
function putNote(req,res){
    res.status(200).json({message : ""+c+ " post updated successfully"});
}
app.put("/api/notes/:id",putNote);

// delete note
function deleteNote(req,res){
    res.status(200).json({message : " post deleted successfully"});
}
app.delete("/api/notes/:id",deleteNote);


// server listening
function hello () {
    console.log("Server running on port 8080");
}
app.listen(5001, hello);