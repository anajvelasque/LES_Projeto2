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
    <div style={{fontSize: 50, fontColor: 'darkBlue', fontWeight: 700, paddingBottom: 50}}>
    Nosso Espaço:
    </div>
    <div>
    <img src="/static/images/logo.png" style={{height: 130, width: 130, marginRight: 100, marginBlock: 100}}/>
    <img src="/static/images/foto2-clinica.jpeg"/>
    <img src="/static/images/foto3-clinica.png"/>
    <img src="/static/images/foto4-clinica.jpg" style={{height: 500, width: 800}}/>
    <img src="/static/images/foto5-clinica.jpg"/>
    </div>
    </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <PublicLayout>{page}</PublicLayout>;

export default Page;
