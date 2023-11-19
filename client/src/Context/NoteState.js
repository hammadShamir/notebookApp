import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const NoteContext = createContext();

const NotesState = (props) => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState();
    const [noteData, setNoteData] = useState({
        title: "",
        description: "",
    });
    const token = localStorage.getItem("token");
    // FETCH ALL NOTES 
    const getNotes = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "access-token": token,
            }
        })
        const data = await response.json();
        setNotes(data)
    }

    // ADD NEW NOTE
    const addNote = async (data) => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": token,
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            console.log("Error")
        } else {
            console.log("Successfully Added");
            navigate("/home");
        }
    }
    // Update NOTE
    const updateNote = async (id, title, description) => {
        await fetch(`${process.env.REACT_APP_HOST}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-token": token,
            },
            body: JSON.stringify({ title: title, description: description })
        })

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes);

    }
    // DELETE NOTE
    const deleteNote = async (id) => {
        await fetch(`${process.env.REACT_APP_HOST}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "access-token": token,
            },
        })
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, setNotes, noteData, setNoteData, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;