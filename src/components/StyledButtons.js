import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(LoadingButton)({
  textTransform: "none",
  fontSize: 24,
  fontWeight: "normal",
  fontWeight: 400,
  cursor: "pointer",
  padding: "10px 0",
  backgroundColor: "#4A21EF",
  alignSelf: "stretch",
  borderRadius: "8px",
  boxSizing: "border-box",
  height: "64px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
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

const MaxButtonStyle = styled(LoadingButton)({
  textTransform: "none",
  fontSize: 16,
  fontWeight: "normal",
  color: "black",
  border: "1px solid var(--color-dimgray-300)",
  padding: "var(--padding-mini) var(--padding-2xs)",
  backgroundColor: "transparent",
  borderRadius: "var(--br-5xs)",
  boxSizing: "border-box",
  height: "54px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export function MaxButton({ text, loading, handleClick }) {
  return (
    <MaxButtonStyle
      loading={loading}
      onClick={handleClick}
      variant="contained"
      disableRipple
      disableElevation
    >
      {text}
    </MaxButtonStyle>
  );
}

const WhatchButtonStyle = styled(LoadingButton)({
  textTransform: "none",
  fontSize: 16,
  fontWeight: "normal",
  color: "black",
  cursor: "pointer",
  border: 0,
  padding: 0,
  backgroundColor: "var(--color-whitesmoke-200)",
  position: "relative",
  borderRadius: "var(--br-21xl)",
  width: "90.7px",
  height: "40px",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export function WatchButton({ text, loading, handleClick }) {
  return (
    <WhatchButtonStyle
      loading={loading}
      onClick={handleClick}
      variant="contained"
      disableRipple
      disableElevation
    >
      {text}
    </WhatchButtonStyle>
  );
}
