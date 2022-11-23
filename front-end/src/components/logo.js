import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material/";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#000" : "#fff";

  return (
    <Typography color={color} fontSize="2rem" fontWeight="700">
      CEFET MG
    </Typography>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
