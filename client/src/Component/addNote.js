import { Box, Container, Typography, Button, TextareaAutosize } from '@mui/material'
import React, { useContext } from 'react'
import { NoteContext } from '../Context/NoteState'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Please Enter a Note Title').trim(),
            description: Yup.string()
                .trim()
                .required('Please Enter a Note Description')
        }),
        onSubmit: async (values) => {
            addNote(values)
        },
    });
    let errors;
    if (formik.touched.title && formik.errors.title) {
        errors = formik.errors.title;
    } else if (formik.touched.description && formik.errors.description) {
        errors = formik.errors.description;
    }

    return (
        <Box sx={{ marginTop: "5rem" }}>
            <Container>
                <Typography sx={{
                    fontSize: "24px",
                    marginBottom: "1rem"
                }}>
                    Add Note
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextareaAutosize
                        placeholder="Title"
                        style={{
                            display: 'block',
                            width: "-webkit-fill-available",
                            resize: "none",
                            padding: "15px 10px",
                            fontSize: "20px"
                        }}
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title} />
                    <TextareaAutosize
                        placeholder="Note"
                        style={{
                            marginTop: "1rem",
                            width: "-webkit-fill-available",
                            resize: "none",
                            padding: "15px 10px",
                            fontSize: "20px",
                            maxHeight: "300px",
                            height: "100vh"
                        }}
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description} />
                    <Typography sx={{ color: "red", fontWeight: "bold" }}>
                        {errors}
                    </Typography>
                    <Button
                        type='submit'
                        sx={{
                            background: "blue",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "blue"
                            }
                        }}>Submit</Button>
                </form>
            </Container>
        </Box>
    )
}



export default AddNote
