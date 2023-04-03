import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AboutMe from "../user/AboutMe";
import Remind from "./Remind";
import ShibaList from "../Shiba/ShibaList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DrawingListType {
  userId: string
  drawingPath: string
  percentage: number
  word: string
  mean: string
}

interface MypagePropsType {
  drawingList : DrawingListType[]
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}


export default function VerticalTabs({drawingList} : MypagePropsType) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={TabsStyle}
      >
        <StyledTab label="내 정보 보기" {...a11yProps(0)} />
        <StyledTab label="시바 도감" {...a11yProps(1)} />
        <StyledTab label="복습 하기" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AboutMe></AboutMe>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShibaList></ShibaList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Remind
          drawingList ={drawingList}
        />
      </TabPanel>
    </Box>
  );
}

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  fontFamily: "insungitCutelivelyjisu",
  // backgroundColor: "#FFD761",
}));

const TabsStyle = {
  borderRight: 1,
  borderColor: "divider",
  fontFamily: "insungitCutelivelyjisu",
  backgroundColor: "#FFD761",
  "& .MuiTabs-indicator": {
    backgroundColor: "#FBF8CC",
    height: 3,
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#FBF8CC",
  },
};
