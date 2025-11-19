import express from 'express';
import path from 'path';
import { connectDB} from './config.js';
import dotenv from 'dotenv';
import Note from './note.js'

dotenv.config(); 

// connect to database
connectDB(); 

const app = express();
app.use(express.json());

// get note
async function getNote(req,res){
    try {
        const notes =  await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes", error);
        res.status(500).json({message : "Error fetching notes"});
    }
}
app.get("/api/notes",getNote);

// post note
async function postNote(req,res){
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({message : " post created successfully"});
    } catch (error) {
        console.error("Error creating note", error);
        res.status(500).json({message : "Error creating note"});
    }
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