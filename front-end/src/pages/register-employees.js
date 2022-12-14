import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DashboardLayout } from "../components/dashboard-layout";

import { axiosClient } from "../utils/axiosClient";

async function postEmployeeAsync(employee) {
  const {
    name,
    email,
    phoneNumber,
    startDate,
    salary,
    role,
    specialty,
    crm,
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  } = employee;

  const body = {
    name,
    email,
    phoneNumber,
    startDate,
    salary,
    role,
    specialty,
    crm,
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  };

  const bodyCep = {
    cep,
    logradouro,
    bairro,
    cidade,
    estado,
  };

  try {
    const result = await axiosClient.post("/employee/", body);
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

const employeeRoles = {
  general: "general",
  doctor: "doctor",
};

const Page = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      startDate: "",
      salary: "",
      isDoctor: false,
      role: employeeRoles.general,
      specialty: "",
      crm: "",
      cep: "00000-000",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome ?? necess??rio"),
      email: Yup.string().required("Email ?? necess??rio"),
      phoneNumber: Yup.string().required("Telefone ?? necess??rio"),
      startDate: Yup.string().required("Data de inicio ?? necess??rio"),
      salary: Yup.string().required("salario ?? necess??rio"),
      role: Yup.string().required("Fun????o ?? necess??rio"),
      logradouro: Yup.string().required("Logradouro ?? necess??rio"),
      bairro: Yup.string().required("bairro ?? necess??rio"),
      cidade: Yup.string().required("cidade ?? necess??rio"),
      estado: Yup.string().required("estado ?? necess??rio"),
    }),
    onSubmit: async (data) => {
      return await postEmployeeAsync(data);
    },
  });

  return (
    <>
      <Head>
        <title>Cadastrar Funcion??rio</title>
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
          <NextLink href="/employees" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Voltar
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Cadastrar Fucionarios
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
              error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              fullWidth
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              label="Telefone"
              margin="normal"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phoneNumber}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.startDate && formik.errors.startDate)}
              fullWidth
              helperText={formik.touched.startDate && formik.errors.startDate}
              label="Data de in??cio"
              margin="normal"
              name="startDate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.startDate}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.salary && formik.errors.salary)}
              fullWidth
              helperText={formik.touched.salary && formik.errors.salary}
              label="Sal??rio (R$)"
              margin="normal"
              name="salary"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.salary}
              variant="outlined"
            />

            <FormControlLabel
              label="M??dico"
              control={
                <Checkbox
                  error={Boolean(formik.touched.isDoctor && formik.errors.isDoctor)}
                  fullWidth
                  helperText={formik.touched.isDoctor && formik.errors.isDoctor}
                  margin="normal"
                  name="isDoctor"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    if (e.target.value) {
                      formik.setFieldValue("role", employeeRoles.doctor);
                    } else {
                      formik.setFieldValue("role", employeeRoles.general);
                    }
                    formik.handleChange(e);
                  }}
                  type="checkbox"
                  value={formik.values.isDoctor}
                  variant="standard"
                />
              }
            />

            {formik.values.isDoctor ? (
              <>
                <TextField
                  error={Boolean(formik.touched.specialty && formik.errors.specialty)}
                  fullWidth
                  helperText={formik.touched.specialty && formik.errors.specialty}
                  label="Especialidade"
                  margin="normal"
                  name="specialty"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.specialty}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(formik.touched.crm && formik.errors.crm)}
                  fullWidth
                  helperText={formik.touched.crm && formik.errors.crm}
                  label="CRM"
                  margin="normal"
                  name="crm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.crm}
                  variant="outlined"
                />
              </>
            ) : null}

            <Divider style={{ marginTop: "1rem" }}>Endere??o</Divider>

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
                Cadastrar Funcion??rio
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
