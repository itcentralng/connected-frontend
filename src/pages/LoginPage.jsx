/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useDispatch } from "react-redux";
import { login } from "../store/user.slice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const loginOrganization = useMutation(api.organization.getOrganizations);
  const dispatch = useDispatch();

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const organization = await loginOrganization({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      JSON.stringify(organization);

      if (
        organization &&
        organization.password === formData.password &&
        organization.email === formData.email.toLowerCase()
      ) {
        dispatch(login());
        navigate("/addfile");
      } else {
        console.log(`organization info: ${organization.password}`);
        alert("Invalid email or password");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <>
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
          <form style={{ width: "100%", marginTop: 10 }}>
            <Grid container spacing={2}>
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
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
          <Typography style={{ marginTop: 10 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
