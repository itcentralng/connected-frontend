import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import SimpleSnackbar from "../components/snackbar";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CreateMessage() {
  const [message, setMessage] = React.useState("");
  const [location, setLocation] = React.useState([]);
  const [shortcode, setShortCode] = React.useState("");
  const [shortcodes, setShortCodes] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showSnack, setShowSnack] = React.useState(false);
  const getCodes = useMutation(api.files.getShortcodes);
  const { user } = useSelector((state) => state.user);
  const area = useQuery(api.locations.getLocations);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Await the result of the useQuery hook
        const result = await area;
        // Update the state with the fetched data
        setAreas(result);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching areas:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    // Call the fetchData function
    fetchData();
  }, [area]); // Ensure useEffect runs whenever 'area' changes
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await getCodes({ organizationId: user._id });
      setShortCodes(result);
      setLoading(false);
    };
    fetchData();
  }, [getCodes, user._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (shortcode && message && location.length) {
      const nums = areas.map((num) => num.numbers);
      try {
        const formData = {
          content: message,
          shortcode: shortcode,
          areas: nums,
        };
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/${user.name}/message/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();
        setShowSnack(data.msg ? true : false);
      } catch (error) {
        console.log(message);
        console.log(shortcode);
        console.log(nums);
        console.error("Error sending message:", error);
        // Handle error, show error message, etc.
      }
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

  const handleShortCodeChange = (event) => {
    setShortCode(event.target.value);
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
              value={shortcode}
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
              {areas?.map((area) => (
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
