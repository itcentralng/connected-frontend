import * as React from "react";
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  CircularProgress,
  Button,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import SimpleSnackbar from "../components/snackbar";
import { useSelector } from "react-redux";

export default function AddFiles() {
  const [file, setFile] = React.useState("");
  const [shortcode, setShortCode] = React.useState("");
  const [addedFile, setAddedFile] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => state.user);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleShortCodeChange = async (e) => {
    const shortcode = e.target.value;
    if (!isNaN(shortcode)) {
      setShortCode(shortcode);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (file && shortcode) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("shortcode", shortcode);
        formData.append("organization_id", user.id);
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/organization/${
            user.name
          }/uploadfile`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => setAddedFile(data));

        if (!response.ok) {
          alert("Failed to add file! Please try again");
          throw new Error("Failed to add file");
        }
      }
    } catch (error) {
      console.error("Error adding file", error.message);
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
        {addedFile ? (
          <SimpleSnackbar message="File Upload successfull" />
        ) : null}
        <Box component="form" sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <FormLabel>Create ShortCode</FormLabel>
            <Stack direction="row" spacing={1}>
              <TextField
                type="text"
                id="text"
                name="text"
                onChange={handleShortCodeChange}
                fullWidth
                required
              />
              {false && <CircularProgress />}
            </Stack>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>File</FormLabel>
            <Stack direction="row" spacing={1}>
              <TextField
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                fullWidth
                required
              />
              {false && <CircularProgress />}
            </Stack>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFormSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Add"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
