import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { AddressesListToolbar } from "../components/addresses/addresses-list-toolbar";

const Page = () => (
  <>
    <Head>
      <title>Endereços</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <AddressesListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
