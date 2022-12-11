import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PublicLayout } from "../components/public-layout";

const Page = () => (
  <>
    <Head>
      <title>Gallery</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
    <Container maxWidth={false}>
    <div style={{fontSize: 50, fontColor: 'darkBlue', fontWeight: 700}}>
    Galeria:
    </div>
    <div><img src="/static/images/logo.png" style={{height: 130, width: 130}}/></div>
    </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <PublicLayout>{page}</PublicLayout>;

export default Page;
