import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PatientListResults } from "../components/patient/patient-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { patients } from "../__mocks__/patients";
import { MyAppointmentsListToolbar } from "../components/my-appointments/my-appointments-list-toolbar";

const Page = () => (
  <>
    <Head>
      <title>Minhas Consultas</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <MyAppointmentsListToolbar />
        <Box sx={{ mt: 3 }}>
          <PatientListResults patients={patients} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
