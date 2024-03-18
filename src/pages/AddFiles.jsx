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
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
// import weaviate, { ApiKey } from "weaviate-ts-client";

export default function AddFiles() {
  const [file, setFile] = React.useState(null);
  const [shortcode, setShortCode] = React.useState("");
  const [addedFile, setAddedFile] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const addFile = useMutation(api.files.uploadFiles);

  // const client = weaviate.client({
  //   scheme: "https",
  //   host: import.meta.env.VITE_WEAVIATE_CLUSTER_URL, // Replace with your endpoint
  //   apiKey: new ApiKey(import.meta.env.VITE_WEAVIATE_API_KEY), // Replace w/ your Weaviate instance API key
  //   headers: { "X-OpenAI-Api-Key": import.meta.env.VITE_OPENAI_API_KEY }, // Replace with your inference API key
  // });
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
    if (!file) return;
    if (file && shortcode) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("shortcode", shortcode);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = async () => {
          const fileContent = fileReader.result.split(",")[1];
          await addFile({
            file: fileContent,
            shortcode: shortcode,
            organizationName: user.name,
            organizationId: user._id,
          });
          fetch(
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
        };
        console.log("File uploaded successfully");
        setAddedFile(true);
      } catch (error) {
        console.error("Failed to add file", error);
      }
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
            // loading variant="outlined"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleFormSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
