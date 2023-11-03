import {
  Button,
  Container,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const validationSchema = Yup.object({
  character_name: Yup.string().required("El nombre del personaje es requerido"),
  name: Yup.string().required("El nombre es requerido"),
  appearance_year: Yup.number()
    .required("El año de aparición es requerido")
    .positive("El año debe ser un número positivo")
    .integer("El año debe ser un número entero"),
  house: Yup.number().required("La casa es requerida"),
  biography: Yup.string().required("La biografía es requerida"),
  equipment: Yup.string().required("El equipamiento es requerido"),
});

const initialValues = {
  character_name: "",
  name: "",
  appearance_year: "",
  house: "",
  biography: "",
  equipment: "",
  images_url: [],
};

const FormCharacter = ({ onFinish, updateInitialValues }) => {
  const formik = useFormik({
    initialValues: updateInitialValues ? updateInitialValues : initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar el envío de los datos del formulario
      if (onFinish) onFinish(values);
    },
  });
  return (
    <Container
      maxWidth="sm"
      style={{ backgroundColor: "#121212", padding: "16px", zIndex: 1 }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" color={"white"} gutterBottom>
          {updateInitialValues ? "Actualizar personaje" : "Crear personaje"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="character_name"
              name="character_name"
              label="Nombre del personaje"
              value={formik.values.character_name}
              onChange={formik.handleChange}
              error={
                formik.touched.character_name &&
                Boolean(formik.errors.character_name)
              }
              helperText={
                formik.touched.character_name && formik.errors.character_name
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="appearance_year"
              name="appearance_year"
              label="Año de aparición"
              value={formik.values.appearance_year}
              onChange={formik.handleChange}
              error={
                formik.touched.appearance_year &&
                Boolean(formik.errors.appearance_year)
              }
              helperText={
                formik.touched.appearance_year && formik.errors.appearance_year
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="house-label">Casa</InputLabel>
            <Select
              fullWidth
              labelId="house-label"
              id="house"
              name="house"
              onChange={formik.handleChange}
              error={formik.touched.house && Boolean(formik.errors.house)}
            >
              <MenuItem value={2}>DC</MenuItem>
              <MenuItem value={1}>Marvel</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="biography"
              name="biography"
              label="Biografía"
              value={formik.values.biography}
              onChange={formik.handleChange}
              error={
                formik.touched.biography && Boolean(formik.errors.biography)
              }
              helperText={formik.touched.biography && formik.errors.biography}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="equipment"
              name="equipment"
              label="Equipamiento"
              value={formik.values.equipment}
              onChange={formik.handleChange}
              error={
                formik.touched.equipment && Boolean(formik.errors.equipment)
              }
              helperText={formik.touched.equipment && formik.errors.equipment}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              id="images_url"
              name="images_url"
              label="URL de las imágenes"
              onChange={(event) => {
                formik.setFieldValue(
                  "images_url",
                  Array.from(event.target.files)
                );
              }}
              error={
                formik.touched.images_url && Boolean(formik.errors.images_url)
              }
              helperText={formik.touched.images_url && formik.errors.images_url}
              type="file"
              inputProps={{ accept: "image/*", multiple: true }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
};

export default FormCharacter;
