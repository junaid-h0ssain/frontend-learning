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
app.get("/api/notes",getNote);  // get note ends here

// post note
async function postNote(req,res){
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const note = await newNote.save();
        res.status(201).json({note,message : " post created successfully"});
    } catch (error) {
        console.error("Error creating note", error);
        res.status(500).json({message : "Error creating note"});
    }
}
app.post("/api/notes",postNote); // post note ends here

// put note
async function putNote(req,res){
    try {

        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content});

        if (!updatedNote) {
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({updatedNote, message : " note updated successfully"});

    } catch (error) {
        console.error("Error updating note", error);
        res.status(500).json({message : "Error updating note"});
    }
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