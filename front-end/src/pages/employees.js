import Head from "next/head";
import { Box, Container } from "@mui/material";
import { EmployeeListResults } from "../components/employees/employees-list-results";
import { EmployeesListToolbar } from "../components/employees/employees-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { axiosClient } from "../utils/axiosClient";

async function getEmployeesAsync() {
  const result = await axiosClient.get("/employee/");

  return result.data?.result || [];
}

const Page = ({ employees }) => (
  <>
    <Head>
      <title>Funcionarios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <EmployeesListToolbar />
        <Box sx={{ mt: 3 }}>
          <EmployeeListResults employees={employees} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps(context) {
  try {
    const employees = await getEmployeesAsync();

    return { props: { employees } };
  } catch (error) {
    return { props: { employees: [] } };
  }
}
