import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SimpleSnackbar from "../components/snackbar";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api.js";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    description: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSnack, setShowSnack] = useState("");
  const registerOrganization = useMutation(api.organization.createOrganization);

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData?.password === confirmPassword) {
      if (formData?.password !== "") {
        try {
          await registerOrganization({
            name: formData.name.toLowerCase(),
            email: formData.email.toLowerCase(),
            password: formData.password,
            address: formData.address,
            description: formData.description,
          }).then(() => {
            setShowSnack(true);
          });
        } catch (error) {
          alert("Organization with this email or name already exists");
        }
      } else {
        alert("All fields are required");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  // const handleSignUp = () => {
  //   console.log(formData);
  //   if (formData?.password === confirmPassword) {
  //     if (formData?.password !== "") {
  //       createOrganization(formData)
  //         .then((res) => res.json())
  //         .then((organizationData) => {
  //           setShowSnack(true);
  //         })
  //         .catch((error) => {
  //           console.error("Failed to create organization", error);
  //           throw error;
  //         });
  //     } else {
  //       alert("All fields are required");
  //     }
  //   } else {
  //     alert("Passwords do not match");
  //   }
  // };
  // useStoreUserEffect();

  return (
    <>
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
          <form style={{ width: "100%", marginTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Organisation Name"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="About your organization"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </form>
          <Typography style={{ marginTop: 10 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default RegistrationPage;
