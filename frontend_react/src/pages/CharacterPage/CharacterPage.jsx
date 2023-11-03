import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  ImageList,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormCharacter from "../../components/FormCharacter";
import axios from "axios";

const CharacterPage = () => {
  const [character, setCharacter] = useState();
  const [open, setOpen] = useState(false);
  const [openSuccessUpdateCharacter, setOpenSuccessUpdateCharacter] =
    useState(false);
  const [openErrorUpdateCharacter, setOpenErrorUpdateCharacter] =
    useState(false);
  const [messageErrorUpdateCharacter, setMessageErrorUpdateCharacter] =
    useState();
  const [openSuccessDeleteCharacter, setOpenSuccessDeleteCharacter] =
    useState(false);
  const [openErrorDeleteCharacter, setOpenErrorDeleteCharacter] =
    useState(false);
  const [messageErrorDeleteCharacter, setMessageErrorDeleteCharacter] =
    useState();
  const handleClose = () => setOpen(false);
  const updateCharacter = async (values) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/updateCharacter",
        data: { id: character._id.$oid, ...values, _id: undefined },
      });
      if (response.data === "ok") {
        setOpenSuccessUpdateCharacter(true);
        setOpen(false);
      } else {
        setMessageErrorUpdateCharacter(response.data);
        setOpenErrorUpdateCharacter(true);
      }
    } catch (error) {
      setMessageErrorUpdateCharacter(undefined);
      setOpenErrorUpdateCharacter(true);
    }
  };
  const deleteCharacter = async (id) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/deleteCharacter",
        data: { id },
      });
      if (response.data === "ok") {
        setOpenSuccessDeleteCharacter(true);
      } else {
        setMessageErrorDeleteCharacter(response.data);
        setOpenErrorDeleteCharacter(true);
      }
    } catch (error) {
      setMessageErrorDeleteCharacter(undefined);
      setOpenErrorDeleteCharacter(true);
    }
  };

  const handleCloseSuccessUpdateCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessUpdateCharacter(false);
  };

  const handleCloseErrorUpdateCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorUpdateCharacter(false);
  };
  const handleCloseSuccessDeleteCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessDeleteCharacter(false);
  };

  const handleCloseErrorDeleteCharacter = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorDeleteCharacter(false);
  };
  useEffect(() => {
    const storagedCharacter = localStorage.getItem("character");
    if (storagedCharacter) setCharacter(JSON.parse(storagedCharacter));

    return () => {
      localStorage.removeItem("character");
    };
  }, []);

  return (
    <div>
      {character ? (
        <>
          <Box display={"flex"}>
            <Box width={"50%"}>
              <img
                src={
                  Array.isArray(character.images_url)
                    ? typeof character.images_url[0] === "string"
                      ? character.images_url[0]
                      : character.house === 1
                      ? "./marvel.png"
                      : "dc.png"
                    : character.images_url
                }
                style={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Box>
            <Box width={"50%"} display={"flex"} flexDirection={"column"}>
              <Typography color="white">
                <h4>{character.character_name}</h4>
                <p style={{ fontWeight: "200", fontStyle: "italic" }}>
                  {character.name}
                </p>
                <p>
                  Año de aparición: <b>{character.appearance_year}</b>
                </p>
                <p>{character.biography}</p>
                <p>
                  Casa: <b>{character.house === 1 ? "Marvel" : "DC"}</b>
                </p>
                <p>
                  Equipamiento: <b>{character.equipment}</b>
                </p>
              </Typography>
              <Box display={"flex"} gap="8px">
                <Button
                  onClick={() => setOpen(true)}
                  color="primary"
                  variant="contained"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => deleteCharacter(character._id.$oid)}
                  color="error"
                  variant="contained"
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          </Box>
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
                    updateCharacter(values);
                  }}
                  updateInitialValues={{
                    ...character,
                  }}
                />
              </Box>
            </Fade>
          </Modal>
          <Snackbar
            open={openSuccessUpdateCharacter}
            autoHideDuration={6000}
            onClose={handleCloseSuccessUpdateCharacter}
          >
            <Alert
              onClose={handleCloseSuccessUpdateCharacter}
              severity="success"
              sx={{ width: "100%" }}
            >
              Personaje actualizado exitosamente
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorUpdateCharacter}
            autoHideDuration={6000}
            onClose={handleCloseErrorUpdateCharacter}
          >
            <Alert
              onClose={handleCloseErrorUpdateCharacter}
              severity="error"
              sx={{ width: "100%" }}
            >
              {messageErrorUpdateCharacter ||
                "Ocurrió un error al actualizar el personaje"}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccessDeleteCharacter}
            autoHideDuration={6000}
            onClose={handleCloseSuccessDeleteCharacter}
          >
            <Alert
              onClose={handleCloseSuccessDeleteCharacter}
              severity="success"
              sx={{ width: "100%" }}
            >
              Personaje eliminado exitosamente
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorDeleteCharacter}
            autoHideDuration={6000}
            onClose={handleCloseErrorDeleteCharacter}
          >
            <Alert
              onClose={handleCloseErrorDeleteCharacter}
              severity="error"
              sx={{ width: "100%" }}
            >
              {messageErrorDeleteCharacter ||
                "Ocurrió un error al eliminar el personaje"}
            </Alert>
          </Snackbar>
        </>
      ) : (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            width={"100%"}
            padding={"32px 0"}
          >
            <Typography color={"white"}>
              No hay datos de ningun personaje
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
};

export default CharacterPage;
