import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Search as SearchIcon } from "../../icons/search";

export const AddressesListToolbar = (props) => {
  const router = useRouter();
  const handleGoToAddressRegister = () => {
    router.push("/register-addresses");
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
          Endereços
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleGoToAddressRegister}>
            Novo Endereço
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
