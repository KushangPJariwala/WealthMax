/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Grid,
} from "@mui/material";
import { symbolMapping } from "../../constants/symbolMaping";
import { useParams } from "react-router-dom";
import "../../styles/stockDetails.css";

export default function BuySellCard() {
  const { symbol } = useParams();
  const [tabValue, setTabValue] = useState("buy");
  const [toggleValue, setToggleValue] = useState("delivery");
  const [qty, setQty] = useState("");
  const [priceLimit, setPriceLimit] = useState(150.85);

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleToggleChange = (event, newValue) =>
    setToggleValue(newValue || toggleValue);

  return (
    <Box className="buy-sell-container">
      <Box className="buy-sell-box">
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "grey" }}>
            {symbolMapping[symbol].title}
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              mt: 1,
              mb: 2,
              "& .MuiTab-root": {
                color: "grey", // Default text color
                textTransform: "none", // Remove the uppercase transformation
                fontWeight: 600,
              },
              "& .Mui-selected": {
                color:
                  tabValue === "buy"
                    ? "green !important"
                    : tabValue === "sell"
                    ? "red"
                    : "black !important",
              }, // Selected tab text color
              "& .MuiTabs-indicator": {
                backgroundColor:
                  tabValue === "buy"
                    ? "green"
                    : tabValue === "sell"
                    ? "red"
                    : "black !important",
                height: "2px",
              }, // Indicator color
            }}
          >
            <Tab label="BUY" value="buy" />
            <Tab label="SELL" value="sell" />
          </Tabs>

          <ToggleButtonGroup
            value={toggleValue}
            exclusive
            onChange={handleToggleChange}
            sx={{ mb: 2 }}
            fullWidth
          >
            <ToggleButton value="delivery" sx={{ height: "30px" }}>
              Delivery
            </ToggleButton>
            <ToggleButton value="intraday" sx={{ height: "30px" }}>
              Intraday
            </ToggleButton>
            <ToggleButton value="mtf" sx={{ height: "30px" }}>
              MTF
            </ToggleButton>
          </ToggleButtonGroup>

          <Box className="input-container-bs">
            <Box
              container
              spacing={2}
              alignItems="center"
              className="input-section-buysell"
            >
              <Typography>Quantity</Typography>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={priceLimit}
                  InputProps={{
                    sx: {
                      padding: "0", // Remove default padding
                      height: "30px", // Set the height you prefer
                    },
                  }}
                />
              </Grid>
            </Box>
            <Box
              container
              spacing={2}
              alignItems="center"
              className="input-section-buysell"
            >
              <Typography>Price Limit</Typography>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={priceLimit}
                  InputProps={{
                    sx: {
                      padding: "0", // Remove default padding
                      height: "30px", // Set the height you prefer
                    },
                  }}
                />
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Order will be executed at best price in market
          </Typography>

          <Divider />

          <Grid container justifyContent="space-between" sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2">Balance : ₹0</Typography>
            <Typography variant="body2">Approx req. : ₹0</Typography>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            color={tabValue === "buy" ? "success" : "error"}
            sx={{
              fontWeight: "bold",
              borderRadius: "8px",
              bottom: 0,
              // position: "absolute",
            }}
          >
            {tabValue === "buy" ? "BUY" : "SELL"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
