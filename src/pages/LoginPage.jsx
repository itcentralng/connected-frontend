/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user.slice";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/organization`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        alert("Failed to Log in! Please try again.");
        throw new Error("Failed to submit form");
      }
      const user = await response.json();
      delete user.password;
      // console.log("Form submitted successfully");
      dispatch(userActions.login(user));
      navigate("/addfile");
    } catch (error) {
      console.error("Error logging user in: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        component="h1"
        variant="h5"
        style={{ marginTop: 50, color: "#1976d2", textAlign: "center" }}
      >
        Welcome back to Connected
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
            Login
          </Typography>
          <Box sx={{ width: "100%", marginTop: 10 }}>
            <FormControl
              component="form"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CCCCCC",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "& .MuiInputBase-input": {
                  height: "9.3%",
                },
                marginTop: "14.3px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={formik.handleSubmit}
            >
              <TextField
                fullWidth
                id="email"
                name="email"
                value={formik.values.email}
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ fontWeight: 500, fontSize: "16px" }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ height: "77px", mt: "10px" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={22} /> : "Log in"}
              </Button>
            </FormControl>
          </Box>
          <Typography style={{ marginTop: 10 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
