import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CharacterCard from "../../components/CharacterCard";

const MarvelPage = () => {
  const [characters, setCharacters] = useState([]);
  const [charactersFiltered, setCharactersFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCharacters = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/getMarvelCharacters`
      );
      setCharacters(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <>
      {loading ? (
        <>
          {" "}
          <Box display={"flex"} justifyContent={"center"} padding={"24px"}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <Box padding={"24px"} display={"flex"} flexDirection={"column"}>
            <TextField
              onChange={(e) => {
                if (e.target.value) {
                  setCharactersFiltered(
                    characters.filter((ele) =>
                      ele.character_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                } else {
                  setCharactersFiltered([]);
                }
              }}
              label="Buscar"
              style={{ marginBottom: "16px" }}
            />
            {characters.length ? (
              <>
                {charactersFiltered.length ? (
                  <>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {charactersFiltered.map((character, index) => (
                        <>
                          <Grid
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            item
                            xs={2}
                            sm={4}
                            md={4}
                            key={index}
                          >
                            <CharacterCard character={character} />
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {characters.map((character, index) => (
                        <>
                          <Grid
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            item
                            xs={2}
                            sm={4}
                            md={4}
                            key={index}
                          >
                            <CharacterCard character={character} />
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </>
                )}
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
                  <Typography color={"white"}>No hay datos</Typography>
                </Box>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MarvelPage;
