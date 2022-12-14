import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { AppointmentsListToolbar } from "../components/appointments/appointments-list-toolbar";

const Page = () => (
  <>
    <Head>
      <title>Consultas</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <AppointmentsListToolbar />
        <Box sx={{ mt: 3 }}>{/* <CustomerListResults customers={customers} /> */}</Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
