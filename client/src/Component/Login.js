import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Please Enter Email Address').trim(),
            password: Yup.string()
                .trim()
                .required('Password is required')
        }),
        onSubmit: async (values) => {
            const { email, password } = values;
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/accesstoken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password })
            })
            const token = await response.json();
            if (!response.ok) {
                console.log("Invalid Credential");
            } else {
                localStorage.setItem("token", token.access_token)
                navigate("/home");
            }
        },
    });
    let errors;
    if (formik.touched.email && formik.errors.email) {
        errors = formik.errors.email;
    } else if (formik.touched.password && formik.errors.password) {
        errors = formik.errors.password;
    }
    return (
        <Container maxWidth="md" sx={{
            display: 'flex !important',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: { xs: 0, md: "32px" },
                borderRadius: "16px",
                backgroundColor: "#fff",
                maxWidth: "450px"
            }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form style={{
                    width: '100%',
                    marginTop: "16px",
                }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {errors}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: "24px 0px 16px !important",
                        }}
                    >
                        Sign In
                    </Button>
                </form>
            </Box>
        </Container >
    );
};

export default Login;
