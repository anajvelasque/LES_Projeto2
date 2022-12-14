import Head from "next/head";
import { Box, Container } from "@mui/material";
<<<<<<< HEAD
import { PatientListToolbar } from "../components/patient/patient-list-toolbar";
=======
>>>>>>> 5bed6b04a73a111679d07877991249123460b139
import { PatientListResults } from "../components/patient/patient-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { axiosClient } from "../utils/axiosClient";

async function getPatientsAsync() {
  const result = await axiosClient.get("/patient/");
  return result.data?.result || [];
}

const Page = ({ patients }) => (
  <>
    <Head>
      <title>Patients</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
<<<<<<< HEAD
        <PatientListToolbar />
=======
>>>>>>> 5bed6b04a73a111679d07877991249123460b139
        <Box sx={{ mt: 3 }}>
          <PatientListResults patients={patients} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps(context) {
  try {
    const patients = await getPatientsAsync();
    return { props: { patients } };
  } catch (error) {
    return { props: { patients: [] } };
  }
}
