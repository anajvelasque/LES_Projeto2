import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { axiosClient } from "../utils/axiosClient";

async function postAddressesAsync(address) {
  const { cep, logradouro, bairro, cidade, estado } = address;

  const body = {
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  };

  try {
    const result = await axiosClient.post("/cep/", body);
    return result;
  } catch (error) {
    console.error(error);
  }
}

const Page = () => {
  const formik = useFormik({
    initialValues: {
      cep: "00000-000",
      logradouro: "rua xpto",
      bairro: "xpto",
      cidade: "xpto",
      estado: "Minas Gerais",
    },
    validationSchema: Yup.object({
      cep: Yup.string().max(9).required("CEP é necessário"),
      logradouro: Yup.string().max(255).required("Logradouro é necessário"),
      bairro: Yup.string().max(255).required("bairro é necessário"),
      cidade: Yup.string().max(255).required("cidade é necessário"),
      estado: Yup.string().max(255).required("estado é necessário"),
    }),
    onSubmit: async (data) => {
      return await postAddressesAsync(data);
    },
  });

  return (
    <>
      <Head>
        <title>Cadastrar Endereços</title>
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
        <Container maxWidth="sm">
          <NextLink href="/adresses" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Voltar para o sistema
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Cadastrar Endereços
              </Typography>
            </Box>

            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
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
                Cadastrar Endereço
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
