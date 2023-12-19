import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(LoadingButton)({
  textTransform: "none",
  fontSize: 24,
  fontWeight: "normal",
  fontWeight: 400,
  cursor: "pointer",
  padding: "10px 0",
  backgroundColor: "#0052ff",
  alignSelf: "stretch",
  borderRadius: "8px",
  boxSizing: "border-box",
  height: "64px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

export default function CustomizedButtons({ text, loading }) {
  return (
    <BootstrapButton
      loading={loading}
      variant="contained"
      type="submit"
      disableRipple
      disableElevation
    >
      {text}
    </BootstrapButton>
  );
}
