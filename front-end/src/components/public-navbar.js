import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { useRouter } from "next/router";
import { Logo } from "./logo";
import NextLink from "next/link";

const PublicNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const PublicNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);

  const router = useRouter();

  const handleGoToLoginPage = () => {
    router.push("/login");
  };

  const handleGoToGallery = () => {
    router.push("/gallery");
  };

  const handleGoToHome = () => {
    router.push("/");
  };

  const handleGoToCreateAppointment = () => {
    router.push("/create-appointment");
  };

  return (
    <>
      <PublicNavbarRoot>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <NextLink href="/" passHref>
            <Logo variant="light" />
          </NextLink>
          <Button color="secondary" onClick={handleGoToHome} style={{ marginLeft: "1rem" }}>
            Home
          </Button>
          <Button color="secondary" onClick={handleGoToGallery} style={{ marginLeft: "1rem" }}>
            Galeria
          </Button>
          <Button color="secondary" onClick={handleGoToCreateAppointment} style={{ marginLeft: "1rem" }}>
            Agendamento
          </Button>
          <Button color="secondary">Novo Endereço</Button>
          <Box sx={{ flexGrow: 1 }} />

          <Button color="primary" onClick={handleGoToLoginPage}>
            Área Interna
          </Button>
        </Toolbar>
      </PublicNavbarRoot>
    </>
  );
};

PublicNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
