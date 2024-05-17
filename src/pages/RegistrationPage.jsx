import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SimpleSnackbar from "../components/snackbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  name: yup.string("Enter organization name").required("Name is required"),
  email: yup
    .string("Enter organization email")
    .email("Enter a valid email address")
    .required("Email is required"),
  address: yup.string("Enter company address").required("Address required"),
  password: yup
    .string("Enter password")
    .min(8, "Password must include atleast 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter password")
    .oneOf([yup.ref("password"), null], "Passwords do not match match")
    .required("Please confirm your password"),
  description: yup
    .string("Please enter a short description of the company")
    .required("Description is required"),
});

const RegistrationPage = () => {
  const [showSnack, setShowSnack] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const formData = {
        name: values.name,
        email: values.email,
        address: values.address,
        password: values.password,
        description: values.description,
      };
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        alert("Failed to create account! Please try again");
        throw new Error("Failed to submit form");
      }

      setShowSnack(true);
      navigate("/login");
      alert("Registration Successful! Please login");
    } catch (error) {
      console.error("Error creating account: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {showSnack ? (
        <SimpleSnackbar message="Registration successful. Go to Login page" />
      ) : null}
      <Typography
        component="h1"
        variant="h5"
        style={{ marginTop: 30, color: "#1976d2", textAlign: "center" }}
      >
        Welcome to Connected
      </Typography>
      <Container component="main" maxWidth="xs" style={{ marginTop: 30 }}>
        <Paper
          elevation={3}
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormControl
            style={{ width: "100%", marginTop: 10 }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  id="name"
                  label="Organization Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  id="address"
                  label="Address"
                  type="text"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <IconButton
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  id="description"
                  label="About your organization"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Sign Up"}
            </Button>
          </FormControl>
          <Typography style={{ marginTop: 10 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationPage;
