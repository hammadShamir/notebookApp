import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../Context/NoteState'
import { Box, Grid, styled, Paper, Container, Alert, Stack, AlertTitle } from '@mui/material';
import NoteItem from '../Component/NoteItem';
import UpdateForm from '../Component/updateForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, updateNote } = context;
    useEffect(() => {
        getNotes();
    }, [])
    // ----------UPDATE NOTE-------
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        id: null,
        title: "",
        description: "",
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
    }
    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const { title, description, id } = data;
        updateNote(id, title, description)
        setOpen(false);
    };



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ marginTop: "5rem" }}>
                <Grid container columns={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                    {notes &&
                        notes.length < 1 ? (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert>
                                <AlertTitle>Info</AlertTitle>
                                No Note Yet! Go to Add Note page by clicking plus icon on the top right
                            </Alert>
                        </Stack>
                    ) :
                        notes && notes.map((note, index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={index} >
                                <Item sx={{ boxShadow: "none", textAlign: "left" }}>
                                    <NoteItem
                                        noteid={note._id}
                                        title={note.title.substring(0, 11) + (note.title.length > 10 ? '...' : "")}
                                        description={note.description.substring(0, 51) + (note.description.length > 50 ? "..." : "")}
                                        readMore={() => {
                                            navigate(`/note/${note._id}`)
                                        }}
                                        handleUpdate={() => {
                                            setOpen(true)
                                            setOpen(true)
                                            setData({
                                                ...data,
                                                id: note._id,
                                                title: note.title,
                                                description: note.description
                                            })
                                        }}
                                    />
                                </Item>
                            </Grid>
                        ))}
                </Grid>
            </Container>
            <UpdateForm
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleSave={handleSave}
                onChange={onChange}
                title={data.title}
                description={data.description}
            />
        </Box >
    )
}

export default Home
