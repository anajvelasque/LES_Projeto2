import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Lock as LockIcon } from "../icons/lock";
import { Home as HomeIcon } from "../icons/home";
import { Gallery as GalleryIcon } from "../icons/gallery";
import { Users as UsersIcon } from "../icons/users";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/patients",
    icon: <UserAddIcon fontSize="small" />,
    title: "Pacientes",
  },
  {
    href: "/employees",
    icon: <UserAddIcon fontSize="small" />,
    title: "Funcionarios",
  },
  {
    href: "/appointments",
    icon: <UsersIcon fontSize="small" />,
    title: "Consultas",
  },
  {
    href: "/my-appointments",
    icon: <LockIcon fontSize="small" />,
    title: "Minhas Consultas",
  },
  {
    href: "/adresses",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Endereços",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box
            sx={{ pt: 3 }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <NextLink href="/home" passHref>
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
