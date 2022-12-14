import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { axiosClient } from "../utils/axiosClient";
import { DashboardLayout } from "../components/dashboard-layout";

async function postPatientAsync(patient) {
  const { name, email, phone, cep, logradouro, bairro, cidade, estado, weigth, heigth, bloodType } =
    patient;

  const body = {
    name,
    email,
    phone,
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
    weigth,
    heigth,
    bloodType,
  };

  const bodyCep = {
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  };

  try {
    const result = await axiosClient.post("/patient/", body);
    const resultCep = await axiosClient.post("/cep/", bodyCep);
    return { result, resultCep };
  } catch (error) {
    console.error(error);
  }
}

function getCep(cepNumber, setFieldValue) {
  const sanitizeCep = cepNumber.replace("-", "");

  axiosClient
    .get(`cep/${sanitizeCep}`)
    .then((v) => {
      const { bairro, cidade, estado, logradouro } = v.data.result;

      setFieldValue("bairro", bairro);
      setFieldValue("cidade", cidade);
      setFieldValue("estado", estado);
      setFieldValue("logradouro", logradouro);
    })
    .catch((e) => {
      console.error(e);
    });
}

const Page = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",

      weigth: "",
      heigth: "",
      bloodType: "",

      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Nome é necessário"),
      email: Yup.string().max(255).required("Email é necessário"),
      phone: Yup.string().max(15).required("Telefone é necessário"),
      weigth: Yup.number().max(255).required("Peso é necessário"),
      heigth: Yup.number().max(255).required("Altura é necessário"),
      bloodType: Yup.string().max(2).required("Tipo Sanguíneo é necessário"),

      cep: Yup.string().max(9).required("CEP é necessário"),
      logradouro: Yup.string().max(255).required("Logradouro é necessário"),
      bairro: Yup.string().max(255).required("bairro é necessário"),
      cidade: Yup.string().max(255).required("cidade é necessário"),
      estado: Yup.string().max(255).required("estado é necessário"),
    }),
    onSubmit: async (data) => {
      return await postPatientAsync(data);
    },
  });

  return (
    <>
      <Head>
        <title>Cadastrar Paciente</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container>
          <NextLink href="/patients" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Voltar para o sistema
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Cadastrar Paciente
              </Typography>
            </Box>

            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nome"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Telefone"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phone}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.weigth && formik.errors.weigth)}
              fullWidth
              helperText={formik.touched.weigth && formik.errors.weigth}
              label="Peso"
              margin="normal"
              name="weigth"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.weigth}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.heigth && formik.errors.heigth)}
              fullWidth
              helperText={formik.touched.heigth && formik.errors.heigth}
              label="Altura"
              margin="normal"
              name="heigth"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.heigth}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.bloodType && formik.errors.bloodType)}
              fullWidth
              helperText={formik.touched.bloodType && formik.errors.bloodType}
              label="Tipo Sanguíneo"
              margin="normal"
              name="bloodType"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.bloodType}
              variant="outlined"
            />

            <Divider style={{ marginTop: "1rem" }}>Endereço</Divider>

            <Box display="flex" gap="1rem" alignItems="center">
              <TextField
                error={Boolean(formik.touched.cep && formik.errors.cep)}
                fullWidth
                helperText={formik.touched.cep && formik.errors.cep}
                label="CEP"
                margin="normal"
                name="cep"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.cep}
                variant="outlined"
              />
              <Button
                color="primary"
                size="sm"
                type="submit"
                variant="outlined"
                style={{ width: "150px", height: "fit-content" }}
                onClick={() => getCep(formik.values.cep, formik.setFieldValue)}
              >
                Buscar CEP
              </Button>
            </Box>

            <TextField
              error={Boolean(formik.touched.logradouro && formik.errors.logradouro)}
              fullWidth
              helperText={formik.touched.logradouro && formik.errors.logradouro}
              label="Logradouro"
              margin="normal"
              name="logradouro"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.logradouro}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.bairro && formik.errors.bairro)}
              fullWidth
              helperText={formik.touched.bairro && formik.errors.bairro}
              label="Bairro"
              margin="normal"
              name="bairro"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.bairro}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.cidade && formik.errors.cidade)}
              fullWidth
              helperText={formik.touched.cidade && formik.errors.cidade}
              label="Cidade"
              margin="normal"
              name="cidade"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.cidade}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.estado && formik.errors.estado)}
              fullWidth
              helperText={formik.touched.estado && formik.errors.estado}
              label="Estado"
              margin="normal"
              name="estado"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.estado}
              variant="outlined"
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Cadastrar Pacientes
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
