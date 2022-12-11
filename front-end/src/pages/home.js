import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
const Page = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
    <div style={{fontSize: 60, fontColor: 'darkBlue', fontWeight: 700, textAlign: 'center'}}>
    Bem-Vindo à Clínica ALP
    <img src="../images/logo-clinica.png" resizeMode="contain"/>
    </div>
    <div style={{fontSize: 20, fontColor: 'darkBlue', fontWeight: 400, marginBlock: 40, textAlign: 'justify'}}>A Clínica ALP é a especialidade da Medicina focada no diagnóstico e tratamento clínico das patologias em adultos, ou seja, sem cirurgia. O médico desta especialidade é responsável por avaliar o paciente de maneira completa e está apto a resolver a maioria das enfermidades, além de gerenciar o cuidado do paciente indicando o especialista adequado, caso haja necessidade.</div>
    <div style={{fontSize: 20, fontColor: 'darkBlue', fontWeight: 300, marginBlock: 10, textAlign: 'justify'}}>Nossa missão é oferecer aos pacientes e familiares a gestão de saúde e bem estar com excelência, humanidade e sustentabilidade, acompanhando os avanços científicos e contribuindo para a melhoria da qualidade de vida.</div>
    <div style={{fontSize:20, fontColor: 'darkBlue', fontWeight: 600, marginBlock: 20, textAlign: 'justify'}}>Nossos Valores:</div>
    <div style={{fontSize:17, fontColor: 'darkBlue', fontWeight: 400, textAlign: 'justify'}}>Humanização: atendimento individualizado e com respeito ao bem- estar de pacientes, familiares e corpo clínico.</div>
    <div style={{fontSize:17, fontColor: 'darkBlue', fontWeight: 400, textAlign: 'justify'}}>Inovação: estudo de soluções que proporcionem melhores alternativas para o atendimento em Oncologia e Hematologia.</div>
    <div style={{fontSize:17, fontColor: 'darkBlue', fontWeight: 400, textAlign: 'justify'}}>Excelência: busca contínua de recursos disponíveis para atender aos pacientes e familiares.</div>
    </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
