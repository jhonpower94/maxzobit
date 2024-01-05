import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const AntTabs = styled((props) => <Tabs centered {...props} />)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "large",
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

export default function CustomizedTabs({ value, handleChange }) {
  const userInfos = useSelector((state) => state.useInfos);
  const { id } = userInfos;

  return (
    <Box sx={{ width: "100%" }}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Crypto" value="/" />
        <AntTab label="NFTs" value="/nfts" />
        <AntTab label="Activity" value={`/activities/${id}`} />
      </AntTabs>
    </Box>
  );
}
