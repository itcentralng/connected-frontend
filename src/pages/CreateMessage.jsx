import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import SimpleSnackbar from "../components/snackbar";
import { useSelector } from "react-redux";

export default function CreateMessage() {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState([]);
  const [shortcode, setShortCode] = React.useState({ short_code: "" });
  const [shortcodes, setShortCodes] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [showSnack, setShowSnack] = React.useState();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.name) {
      fetch(`${import.meta.env.VITE_APP_API_URL}/${user.name}/shortcodes`)
        .then((res) => res.json())
        .then((data) => setShortCodes(data?.short_codes));
      fetch(`${import.meta.env.VITE_APP_API_URL}/areas`)
        .then((res) => res.json())
        .then((data) => setAreas(data));
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (shortcode.short_code && message && location.length) {
      fetch(`${import.meta.env.VITE_APP_API_URL}/${user.name}/message/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          shortcode: shortcode.short_code,
          areas: location,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setShowSnack(data.msg ? true : false);
        });
    }
    // setLocation([]);
    // setShortCode("");
    // setMessage("");
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocation(typeof value === "string" ? value.split(",") : value);
  };

  const handleShortCodeChange = async (e) => {
    const shortcode = shortcodes.find(
      (code) => code.short_code === e.target.value
    );
    setShortCode(shortcode);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {showSnack ? <SimpleSnackbar message="Message sent" /> : null}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <FormLabel>Choose shortcode</FormLabel>
            <Select
              value={shortcode.short_code}
              onChange={handleShortCodeChange}
              fullWidth
              required
            >
              {shortcodes?.map((code, i) => (
                <MenuItem key={i} value={code.short_code}>
                  {code.short_code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>Message</FormLabel>
            <TextField
              placeholder="message"
              name="message"
              multiline
              minRows={3}
              required
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Area</FormLabel>
            <Select
              value={location}
              multiple
              onChange={handleChange}
              fullWidth
              required
            >
              {areas.map((area) => (
                <MenuItem key={area.name} value={area.name}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
