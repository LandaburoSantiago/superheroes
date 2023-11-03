import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} style={{ height: "100%" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={
          Array.isArray(character.images_url)
            ? typeof character.images_url[0] === "string"
              ? character.images_url[0]
              : character.house === 1
              ? "./marvel.png"
              : "dc.png"
            : character.images_url
        }
        title={character.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {character.character_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.biography}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            localStorage.setItem("character", JSON.stringify(character));
            navigate("/character");
          }}
          size="small"
        >
          Ver mas
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
