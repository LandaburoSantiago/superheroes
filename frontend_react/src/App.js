import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home";
import MarvelPage from "./pages/MarvelPage/MarvelPage";
import DcPage from "./pages/DcPage/DcPage";
import Navbar from "./components/Navbar";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fab,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { useState } from "react";
import FormCharacter from "./components/FormCharacter";
import axios from "axios";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [open, setOpen] = useState();
  const handleClose = () => setOpen(false);
  const [openSuccessCreateCharacter, setOpenSuccessCreateCharacter] =
    useState(false);
  const [openErrorCreateCharacter, setOpenErrorCreateCharacter] =
    useState(false);
  const [messageErrorCreateCharacter, setMessageErrorCreateCharacter] =
    useState();

  const createCharacter = async (values) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/createCharacter",
        data: { ...values },
      });
      if (response.data === "ok") {
        setOpenSuccessCreateCharacter(true);
        setOpen(false);
      } else {
        setMessageErrorCreateCharacter(response.data);
        setOpenErrorCreateCharacter(true);
      }
    } catch (error) {
      setMessageErrorCreateCharacter(undefined);
      setOpenErrorCreateCharacter(true);
    }
  };

  const handleCloseSuccessCreateCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessCreateCharacter(false);
  };

  const handleCloseErrorCreateCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorCreateCharacter(false);
  };

  return (
    <div className="app">
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Fab
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          color="primary"
          aria-label="add"
          onClick={() => setOpen(true)}
        >
          +
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FormCharacter
                onFinish={(values) => {
                  createCharacter(values);
                }}
              />
            </Box>
          </Fade>
        </Modal>
        <Snackbar
          open={openSuccessCreateCharacter}
          autoHideDuration={6000}
          onClose={handleCloseSuccessCreateCharacter}
        >
          <Alert
            onClose={handleCloseSuccessCreateCharacter}
            severity="success"
            sx={{ width: "100%" }}
          >
            Personaje creado exitosamente
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorCreateCharacter}
          autoHideDuration={6000}
          onClose={handleCloseErrorCreateCharacter}
        >
          <Alert
            onClose={handleCloseErrorCreateCharacter}
            severity="error"
            sx={{ width: "100%" }}
          >
            {messageErrorCreateCharacter ||
              "Ocurrió un error al crear el personaje"}
          </Alert>
        </Snackbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="*" element={<Link to="/" />} />
          <Route path="/character" element={<CharacterPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
