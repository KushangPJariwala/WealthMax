/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Divider, Grid, LinearProgress, Typography } from "@mui/material";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
export default function Overview({ priceData }) {
  const [value, setValue] = React.useState(0);
  // console.log("priceData", priceData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="overview-container">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Overview"
            {...a11yProps(0)}
            sx={{
              color: "#014188", // Changes text color
              "&.Mui-selected": {
                color: "#014188", // Active tab text color
              },
              fontWeight: 600,
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Performance Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "20px", color: "#636e72" }}
          >
            Performance
          </Typography>
          <Typography sx={{ color: "#636e72" }}>i</Typography>
        </Box>
        {/* Today's Low/High */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={2}>
            <Typography>Today’s Low</Typography>
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              {+priceData?.low?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 4,
                backgroundColor: "#00800078",
                borderRadius: 2,
              }}
            >
              {/* Range bar */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-12px", // To adjust the marker's vertical position
                  left:
                    priceData?.high && priceData?.low
                      ? `${
                          ((priceData.currentPrice - priceData.low) /
                            (priceData.high - priceData.low)) *
                          100
                        }%`
                      : "0%",
                  transform: "translateX(-50%)", // Center the marker
                }}
              >
                {/* Triangle marker */}
                <Box
                  sx={{
                    width: 0,
                    height: 20,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: "10px solid gray",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <Typography>Today’s High</Typography>
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              {+priceData?.high?.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>

        {/* 52W Low/High */}
        {/* <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={2}>
            <Typography sx={{ color: "#636e72" }}>52W Low</Typography>
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              65.75
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <LinearProgress
              variant="determinate"
              value={80}
              sx={{ height: 4, backgroundColor: "#dfe6e9" }}
            />
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "#636e72" }}>52W High</Typography>
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              229.05
            </Typography>
          </Grid>
        </Grid> */}
        <Divider sx={{ mb: 2 }} />
        {/* Stock Details Section */}
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Typography>Open</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              {priceData?.open?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Prev. Close</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              {priceData?.prevDayClose?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Volume</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              {priceData?.volume?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Total traded value</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              {priceData?.totalTradeValue?.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={2}>
            <Typography>Upper Circuit</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              182.40
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Lower Circuit</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#636e72" }}>
              121.60
            </Typography>
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}
