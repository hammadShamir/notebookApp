import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Register = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required('Please Enter First Name').trim()
                .max(15, 'First Name Must be 15 characters or less'),
            last_name: Yup.string()
                .required('Please Enter Last Name').trim()
                .max(15, 'Last Name Must be 15 characters or less'),
            email: Yup.string().email('Invalid email address').required('Please Enter Email Address').trim(),
            password: Yup.string()
                .trim()
                .required('Password is required')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=?`{}[\]:";'<>.,\/]).{8,}$/,
                    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
                ),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            const { first_name, last_name, email, password } = values;
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ first_name: first_name, last_name: last_name, email: email, password: password })
            })
            if (!response.ok) {
                console.log("Invalid Credential");
            } else {
                console.log("Account Created Successfully");
                navigate("/");
            }
        },
    });
    let errors;
    if (formik.touched.first_name && formik.errors.first_name) {
        errors = formik.errors.first_name;
    } else if (formik.touched.last_name && formik.errors.last_name) {
        errors = formik.errors.last_name;
    } else if (formik.touched.email && formik.errors.email) {
        errors = formik.errors.email;
    } else if (formik.touched.password && formik.errors.password) {
        errors = formik.errors.password;
    } else if (formik.touched.confirmPassword && formik.errors.confirmPassword) {
        errors = formik.errors.confirmPassword;
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
                paddingTop: "50px !important",
                borderRadius: "16px",
                backgroundColor: "#fff",
            }}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form style={{
                    width: '100%',
                    marginTop: "16px",
                }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="first_name"
                                label="First Name"
                                name="first_name"
                                autoFocus
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                            />
                        </Grid>
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
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
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
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
