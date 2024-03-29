import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CourseList from "./CourseList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Courses() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Development" {...a11yProps(0)} />
          <Tab label="Business" {...a11yProps(1)} />
          <Tab label="Design" {...a11yProps(2)} />
          <Tab label="Marketing" {...a11yProps(3)} />
          <Tab label="Health & Fitness" {...a11yProps(4)} />
          <Tab label="IT & Software" {...a11yProps(5)} />
          <Tab label="Photography" {...a11yProps(6)} />
          <Tab label="Music" {...a11yProps(7)} />
          <Tab label="Finance & Accounting" {...a11yProps(8)} />
          <Tab label="Lifestyle" {...a11yProps(9)} />
          <Tab label="Others" {...a11yProps(10)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CourseList />
        <CourseList />
        <CourseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CourseList />
        <CourseList />
        <CourseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        five
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <CourseList />
        <CourseList />
        <CourseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        seven
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <CourseList />
        <CourseList />
        <CourseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        eight
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
        <CourseList />
        <CourseList />
        <CourseList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={10}>
        10
      </CustomTabPanel>
    </Box>
  );
}
