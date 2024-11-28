/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
} from "@mui/material";
import Select, { components } from "react-select";
import HelpIcon from "@mui/icons-material/HelpOutline";
import { RiAddCircleLine } from "react-icons/ri";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useDispatch, useSelector } from "react-redux";
import { getBankDetails, getUser } from "../../store/slices/userSlice";
import { bankMapping } from "../../constants/banks";
import { RxCross2 } from "react-icons/rx";
import {
  getBankById,
  getBanks,
  getBranchDetailsOfBank,
} from "../../store/slices/bankSlice";
import "../../styles/bankDetails.css";
import { debounce } from "lodash"; // Importing debounce from lodash

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #ced4da",
    borderRadius: "4px",
    marginTop: "25px",
    minHeight: "50px", // Mimicking MUI's small size
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 200, // Set your desired max height for the dropdown
    overflowY: "auto",
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px", // Add space for the icon
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#ffca61" // Highlight selected item with color
      : state.isFocused
      ? "#fafafa" // Hover effect
      : "white",
    color: "black",
    "&:active": {
      backgroundColor: "rgba(25, 118, 210, 0.08)",
    },
  }),
};
export const bufferToBase64 = (buffer) => {
  // Convert buffer to base64 string
  const binary = new Uint8Array(buffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return window.btoa(binary);
};
const BankAccountDetails = () => {
  const dispatch = useDispatch();
  const bankDetails = useSelector((state) => state.user?.bankDetails);
  const user = useSelector((state) => state.user?.user);
  const banks = useSelector((state) => state.bank?.banks);
  const bankById = useSelector((state) => state.bank?.bankById);
  const branchesofBank = useSelector((state) => state.bank?.branchesofBank);
  const loading = useSelector((state) => state.common?.loading);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isAdd, setisAdd] = useState(false);
  const [newBank, setNewBank] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const bankOptions = banks?.map((b) => ({ label: b.bankName, value: b._id }));

  // Debounced function to fetch branch options based on input
  const fetchBranchOptions = useCallback(
    debounce((input) => {
      if (newBank && input.length >= 1) {
        dispatch(getBranchDetailsOfBank({ id: newBank.value, query: input }));
      }
    }, 100), // Delay of 500ms
    [dispatch, newBank]
  );
  useEffect(() => {
    dispatch(getBankDetails());
    dispatch(getUser());
    dispatch(getBanks());
  }, [dispatch]);

  useEffect(() => {
    // Load branch options when branches are available
    if (branchesofBank) {
      const options = branchesofBank.map((b) => ({
        label: `${b.city} - ${b.branchName} (${b.ifsc})`,
        value: b._id,
      }));
      setBranchOptions(options);
    }
  }, [branchesofBank]);

  useEffect(() => {
    if (newBank) {
      fetchBranchOptions(inputValue);
    }
  }, [newBank, inputValue, fetchBranchOptions]);
  useEffect(() => {
    if (newBank) {
      dispatch(getBankById({ id: newBank?.value }));
    }
  }, [newBank, dispatch]);

  useEffect(() => {
    if (bankById?.logo) {
      // If the logo exists as a buffer, convert it to base64
      const base64Flag = `data:image/jpeg;base64,`; // You can adjust the MIME type as needed (e.g., image/png)
      const imageStr = bufferToBase64(bankById?.logo.data);
      setPreviewLogo(base64Flag + imageStr);
    }
  }, [bankById]);

  const handleBankChange = (selectedOption) => {
    setNewBank(selectedOption);
    setBranchOptions([]); // Reset branch options when bank changes
  };

  const handleInputChange = (input) => {
    setInputValue(input);
    if (input.length >= 1) {
      fetchBranchOptions(input);
    }
  };
  const ValueContainer = ({ children, ...props }) => {
    return (
      <components.ValueContainer {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {previewLogo ? (
            <img
              src={previewLogo}
              alt="logo"
              width={30}
              height={30}
              style={{ marginRight: "10px" }}
            />
          ) : (
            <AccountBalanceIcon sx={{ marginRight: "10px" }} />
          )}
          {/* Ensure the input is rendered after the adornment */}
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </components.ValueContainer>
    );
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading Bank data...</p>
      </div>
    );
  }

  return (
    <Box className="bank-detail-container">
      <Typography
        sx={{ fontSize: "25px", fontWeight: 600, marginBottom: "25px" }}
      >
        Bank Account Details
      </Typography>
      <Grid container spacing={4}>
        {/* Left Side - Bank Account List */}
        <Grid item xs={12} md={6}>
          <Box className="bank-right">
            <Box className="bank-name">
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  alt="ICICI Bank"
                  src={bankMapping[bankDetails?.bankName]?.logo} // Replace with actual bank logo URL
                  width={30}
                  height={30}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {bankMapping[bankDetails?.bankName]?.title}
                  </Typography>
                  <Typography variant="body2">
                    {bankDetails?.accountNum.slice(0, -4).replace(/\d/g, "X") +
                      bankDetails?.accountNum.slice(-4)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              padding={1.5}
              marginLeft={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              {/* Add another bank */}
              <RiAddCircleLine fill="#008059d4" />
              <Typography
                sx={{ fontWeight: 600, color: "#008059d4", cursor: "pointer" }}
                onClick={() => {
                  setisAdd(true);
                  setNewBank(false);
                }}
              >
                Add another bank
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Bank Account Details */}
        <Grid item xs={12} md={6}>
          {!isAdd && (
            <Card sx={{ padding: 2 }}>
              <Box display="flex" gap={3} alignItems="center" mb={2}>
                <img
                  alt="ICICI Bank"
                  src={bankMapping[bankDetails?.bankName]?.logo}
                  width={50}
                  height={50}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {bankMapping[bankDetails?.bankName]?.title}
                  </Typography>
                  <Typography color="grey" fontWeight="bold">
                    Primary bank
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Box display="flex" alignItems="center" gap={15}>
                  <Typography width={80}>Status</Typography>
                  <Typography color="textSecondary">Verified</Typography>
                </Box>
                <Box mt={2} display="flex" alignItems="center" gap={15}>
                  <Typography width={80}>Account</Typography>
                  <Typography color="textSecondary">
                    {bankDetails?.accountNum.slice(0, -4).replace(/\d/g, "X") +
                      bankDetails?.accountNum.slice(-4)}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" alignItems="center" gap={15}>
                  <Typography width={80}>IFSC Code</Typography>
                  <Typography color="textSecondary">
                    {bankDetails?.ifsc}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" alignItems="center" gap={15}>
                  <Typography width={90}>Branch Name</Typography>
                  <Typography color="textSecondary" marginLeft={-1}>
                    INDIA
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <Box textAlign="center" mt={2}>
                <Button variant="contained" color="success">
                  SETUP AUTOPAY
                </Button>
              </Box>
              <Box
                elevation={1}
                sx={{ padding: 2, mt: 3, backgroundColor: "#e6f7e6" }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body2">
                  Have questions about Bank & Autopay?
                </Typography>
                <Button startIcon={<HelpIcon />} size="small">
                  Get help
                </Button>
              </Box>
            </Card>
          )}
          {isAdd && (
            <Card className="add-bank-card" sx={{ height: "350px" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                  Choose bank for {user?.name}
                </Typography>
                <Box sx={{ cursor: "pointer" }} onClick={() => setisAdd(false)}>
                  <RxCross2 />
                </Box>
              </Box>
              <Typography
                sx={{ fontWeight: 600, fontSize: "17px", color: "grey" }}
              >
                Bank is compulsory for opening an investment account
              </Typography>
              {!newBank && (
                <Select
                  styles={customStyles}
                  // className="basic-single"
                  isClearable
                  isSearchable
                  placeholder="Search bank"
                  options={bankOptions}
                  menuIsOpen={true}
                  defaultMenuIsOpen
                  onChange={handleBankChange}
                  components={{
                    DropdownIndicator: () => null, // Remove the default dropdown arrow
                    IndicatorSeparator: () => null, // Remove the separator line next to the arrow
                  }}
                />
              )}
              {newBank && (
                <>
                  <Select
                    styles={customStyles}
                    // className="basic-single"
                    isClearable
                    isSearchable
                    menuIsOpen={true}
                    defaultMenuIsOpen
                    placeholder="IFSC Code"
                    options={branchOptions}
                    onInputChange={handleInputChange}
                    noOptionsMessage={() => "Search your branch/IFSC/City"}
                    components={{
                      DropdownIndicator: () => null, // Remove the default dropdown arrow
                      IndicatorSeparator: () => null, // Remove the separator line next to the arrow
                      // ValueContainer, // Custom ValueContainer to show the adornment
                    }}
                  />
                </>
              )}
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BankAccountDetails;
