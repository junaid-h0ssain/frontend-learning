import express from 'express';
import path from 'path';
import { connectDB} from './config.js';
import dotenv from 'dotenv';
import Note from './note.js';
import cors from 'cors';

dotenv.config(); 
const port = process.env.PORT || 5001;

// connect to database
connectDB(); 

const app = express();
app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : [
        "http://localhost:5173",
        "http://localhost:5500",
        "https://frontend-learning-omega.vercel.app",
        "https://frontend-learning-two.vercel.app/"
    ];

app.use(cors({
    origin: function (origin, callback) {
        // allow non-browser requests (like curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: This origin is not allowed'));
    },
    credentials: true
}));

// get note
async function getNote(req,res){
    try {
        const notes =  await Note.find({}).sort({createdAt: -1}); //sorts by newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes", error);
        res.status(500).json({message : "Error fetching notes"});
    }
}
app.get("/api/notes",getNote);  // get note ends here

async function getNoteById(req,res){
    try {
        const note =  await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note", error);
        res.status(500).json({message : "Error fetching note"});
    }
}
app.get("/api/notes/:id",getNoteById);  // get note by id ends here

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
app.put("/api/notes/:id",putNote);   // put notes ends here

// delete note
async function deleteNote(req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({deletedNote, message : " note deleted successfully"});
    } catch (error) {
        console.error("Error deleting note", error);
        res.status(500).json({message : "Error deleting note"});
    }
}
app.delete("/api/notes/:id",deleteNote);   // delete note ends here

// server listening
function hello () {
    console.log("Server running on port "+port);
}
app.listen(port, hello);