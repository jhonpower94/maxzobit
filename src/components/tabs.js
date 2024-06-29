import { Box } from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { useSelector } from "react-redux";

export default function CustomizedTabs({ value, handleChange }) {
  const userInfos = useSelector((state) => state.useInfos);
  const { id } = userInfos;

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        aria-label="Basic tabs"
        value={value}
        onChange={handleChange}
      >
        <TabList sx={{ justifyContent: "center" }}>
          <Tab
            color="primary"
            disableIndicator
            sx={{
              borderRadius: "10px 10px 0 0",
            }}
            value="/"
          >
            Assets
          </Tab>

          <Tab
            color="primary"
            disableIndicator
            value="/nfts"
            sx={{
              borderRadius: "10px 10px 0 0",
            }}
          >
            NFTs
          </Tab>

          <Tab
            color="primary"
            disableIndicator
            value={`/activities/${id}`}
            sx={{
              borderRadius: "10px 10px 0 0",
            }}
          >
            Activity
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
