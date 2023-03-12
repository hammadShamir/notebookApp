import { Typography, Paper, Container } from '@mui/material';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { NoteContext } from '../Context/NoteState'

const Note = () => {
    const { id } = useParams();
    const { notes } = useContext(NoteContext);
    const targetNote = notes.filter((note) => {
        return note._id === id;
    })

    return (
        <Container maxWidth="lg" sx={{ marginTop: "5rem" }}>
            <Paper sx={{
                padding: "16px"
            }}>
                <Typography variant="h5" component="h2" sx={{
                    marginBottom: "20px !important"
                }}>
                    {targetNote[0].title}
                </Typography>
                <Typography variant="body1" component="p">
                    {targetNote[0].description}
                </Typography>
            </Paper>
        </Container>
    )
}

export default Note;

