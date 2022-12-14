import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { AddressesListToolbar } from "../components/addresses/addresses-list-toolbar";
import { AddressesListResults } from "../components/addresses/addresses-list-results";
import { axiosClient } from "../utils/axiosClient";

async function getAddressesAsync() {
  const result = await axiosClient.get("/cep/");

  return result.data?.result || [];
}

const Page = ({ addresses }) => {
  return (
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
            <AddressesListResults addresses={addresses} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps(context) {
  try {
    const addresses = await getAddressesAsync();

    return { props: { addresses } };
  } catch (error) {
    return { props: { addresses: [] } };
  }
}
