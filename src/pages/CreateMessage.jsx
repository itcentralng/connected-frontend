import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SimpleSnackbar from "../components/snackbar";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  shortcode: yup.string().required("Please select a shortcode"),
  message: yup.string().required("Please enter a message"),
  location: yup.array().min(1, "Please select atleast one area"),
});

function CreateMessage() {
  const [shortcodes, setShortCodes] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [showSnack, setShowSnack] = React.useState();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      shortcode: "",
      message: "",
      location: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/${user.name}/message/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: values.message,
            shortcode: values.shortcode,
            areas: values.location,
          }),
        }
      );
      if (!response.ok) {
        alert("Failed to send message! Please try again");
        throw new Error("Failed to send message");
      }
      setShowSnack(true);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <FormLabel>Choose shortcode</FormLabel>
            <Select
              value={formik.values.shortcode}
              onChange={formik.handleChange}
              fullWidth
              required
              name="shortcode"
              id="shortcode"
            >
              {shortcodes?.map((code, i) => (
                <MenuItem key={i} value={code.short_code}>
                  {code.short_code}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.shortcode && formik.errors.shortcode && (
              <div>{formik.errors.shortcode}</div>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>Message</FormLabel>
            <TextField
              placeholder="message"
              name="message"
              id="message"
              multiline
              minRows={3}
              required
              fullWidth
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
            />
            {formik.touched.message && formik.errors.message && (
              <div>{formik.errors.message}</div>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Area</FormLabel>
            <Select
              name="location"
              id="location"
              value={formik.values.location}
              multiple
              onChange={formik.handleChange}
              fullWidth
              required
              error={formik.touched.location && Boolean(formik.errors.location)}
            >
              {areas.map((area) => (
                <MenuItem key={area.name} value={area.name}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.location && formik.errors.location && (
              <div>{formik.errors.location}</div>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Send"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateMessage;
