import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const PatientListToolbar = (props) => {
  const router = useRouter();
  const handleGoToEmployeeRegister = () => {
    router.push("/register-patients");
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Pacientes
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleGoToEmployeeRegister}>
            Novo Paciente
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
