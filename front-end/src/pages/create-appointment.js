import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PublicLayout } from "../components/public-layout";

const Page = () => (
  <>
    <Head>
      <title>Agendamento</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
    <Container maxWidth={false}>
    <div style={{fontSize: 40, fontColor: 'darkBlue', fontWeight: 700, paddingBottom: 50}}>
    Agende sua consulta:
    </div>
    </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <PublicLayout>{page}</PublicLayout>;

export default Page;
