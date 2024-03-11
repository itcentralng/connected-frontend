import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import CreateMessage from "./pages/CreateMessage";
import Messages from "./pages/Messages";
import AddFiles from "./pages/AddFiles";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Files from "./pages/Files";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* No Layout for Registration and Login pages */}
        <Route index element={<RegistrationPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Routes with Layout */}
        <Route
          // path="/*"
          element={<Layout />}
        >
          <Route path="/addfile" element={<AddFiles />} />
          <Route path="/createmessage" element={<CreateMessage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/files" element={<Files />} />
        </Route>

        <Route path="*" element={<h1>404, page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
