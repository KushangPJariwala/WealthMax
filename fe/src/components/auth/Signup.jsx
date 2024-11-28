/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import Select from "react-select";
import * as Yup from "yup";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import "../../styles/signupModal.css";
import fullLogo from "../../assets/full-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import { banks } from "../../constants/banks";
import zIndex from "@mui/material/styles/zIndex";

const steps = ["User Details", "Bank Details", "Password", "Pin"];

const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    pan: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter valid PAN ")
      .required("PAN is required"),
  }),
  Yup.object({
    bankName: Yup.string().required("Bank name is required"),
    ifsc: Yup.string().required("IFSC code is required"),
    accountNum: Yup.string().required("Account number is required"),
  }),
  Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  }),
  Yup.object({
    pin: Yup.string()
      .matches(/^\d{4}$/, "Pin must be exactly 4 digits")
      .required("Pin is required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref("pin")], "Pins must match")
      .matches(/^\d{4}$/, "Confirm pin must be exactly 4 digits")
      .required("Confirm pin is required"),
  }),
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));
const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#b6b6b6",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",

  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
    },
  ],
}));
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon sx={{ fill: "white" }} />,
    2: <AccountBalanceIcon sx={{ fill: "white" }} />,
    3: <GroupAddIcon sx={{ fill: "white" }} />,
    4: <VideoLabelIcon sx={{ fill: "white" }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const Signup = ({ openSignupModal, setopenSignupModal }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  //   const [open, setOpen] = useState(false);
  const [showPin, setShowPin] = useState(false); // Toggle for pin visibility

  const togglePinVisibility = () => setShowPin(!showPin);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => setopenSignupModal(false);

  const initialValues = {
    name: "",
    email: "",
    pan: "",
    bankName: "",
    accountNum: "",
    ifsc: "",
    password: "",
    confirmPassword: "",
    pin: ["", "", "", ""],
    confirmPin: ["", "", "", ""],
  };
  const CustomSelect = ({ field, form, options, label, ...props }) => {
    return (
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select
          {...field}
          {...props}
          label={label}
          onChange={(event) => {
            form.setFieldValue(field.name, event.target.value);
          }}
          onBlur={() => form.setFieldTouched(field.name, true)}
          value={field.value || ""}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // control menu height if needed
                zIndex: 9999, // to ensure menu is above other components
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  return (
    <Box className="signup-bg">
      <Box className="logo-login">
        <img
          src={fullLogo}
          alt="logo-main"
          loading="lazy"
          className="logo"
          height={80}
          width={280}
          onClick={() => navigate("/")}
        />
      </Box>
      <Box>
        <Typography variant="h5">
          Please Complete the following Signup steps
        </Typography>
      </Box>
      <Box className="signup-box">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: "15px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[activeStep]}
            onSubmit={async (values) => {
              if (activeStep === steps.length - 1) {
                console.log("Form submitted:", values);
                // const res = await dispatch(
                //   signUp({
                //     name: values.name,
                //     email: values.email,
                //     pan: values.pan,
                //     pin: values.pin,
                //     password: values.password,
                //     bankName: values.bankName,
                //     accountNum: values.accountNum,
                //     ifsc: values.ifsc,
                //   })
                // );
                // console.log("res", res);
                // if (res?.error?.exists) {
                //   toast.error(res?.error?.message);
                // }
                // if (res?.success) {
                //   toast.success(res?.data?.message);
                //   navigate("/login");
                // }

                handleClose();
              } else {
                handleNext();
              }
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                {activeStep === 0 && (
                  <>
                    <Field
                      name="name"
                      as={TextField}
                      label="Name"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      name="pan"
                      as={TextField}
                      label="PAN Number"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="pan"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Field
                      name="bankName"
                      component={CustomSelect} // Custom Select Component
                      label="Bank Name"
                      options={banks} // Options for the bank select
                    />
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      name="accountNum"
                      as={TextField}
                      label="Account Number"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="accountNum"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      name="ifsc"
                      as={TextField}
                      label="IFSC Code"
                      fullWidth
                      margin="normal"
                      onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                    />
                    <ErrorMessage
                      name="ifsc"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      name="confirmPassword"
                      as={TextField}
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </>
                )}

                {activeStep === 3 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginTop: "20px",
                      alignItems: "center",
                    }}
                  >
                    {/* Pin Entry */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        Set Your Pin
                      </Typography>
                      <Box>
                        {[0, 1, 2, 3].map((index) => (
                          <TextField
                            key={index}
                            name={`pin[${index}]`}
                            type={showPin ? "text" : "password"}
                            value={values.pin[index] || ""} // Access character in the pin string
                            onChange={(e) => {
                              const newPin = [...values.pin]; // Split the string into an array of characters
                              newPin[index] = e.target.value; // Update the specific character

                              handleChange({
                                target: { name: "pin", value: newPin.join("") }, // Join back into a string
                              });

                              // Move to next input field if a digit is entered
                              if (e.target.value && index < 3) {
                                const nextSibling = document.querySelector(
                                  `input[name='pin[${index + 1}]']`
                                );
                                if (nextSibling) {
                                  nextSibling.focus();
                                }
                              }
                            }}
                            inputProps={{ maxLength: 1 }}
                            sx={{ width: 40, margin: "0 5px" }}
                          />
                        ))}
                      </Box>

                      <ErrorMessage
                        name="pin"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Box>

                    {/* Confirm Pin Entry */}
                    {values.pin.length === 4 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <Typography sx={{ fontWeight: 600 }}>
                          Confirm Pin
                        </Typography>
                        <Box>
                          {[0, 1, 2, 3].map((index) => (
                            <TextField
                              key={index}
                              name={`confirmPin[${index}]`}
                              type={showPin ? "text" : "password"}
                              value={values.confirmPin[index] || ""} // Access character in the confirmPin string
                              onChange={(e) => {
                                const newConfirmPin = [...values.confirmPin]; // Split confirmPin string into an array
                                newConfirmPin[index] = e.target.value; // Update the specific character

                                handleChange({
                                  target: {
                                    name: "confirmPin",
                                    value: newConfirmPin.join(""),
                                  }, // Join back into a string
                                });

                                // Move to next input field if a digit is entered
                                if (e.target.value && index < 3) {
                                  const nextSibling = document.querySelector(
                                    `input[name='confirmPin[${index + 1}]']`
                                  );
                                  if (nextSibling) {
                                    nextSibling.focus();
                                  }
                                }
                              }}
                              inputProps={{ maxLength: 1 }}
                              sx={{ width: 40, margin: "0 5px" }}
                            />
                          ))}
                        </Box>
                        <Typography sx={{ color: "red" }}>
                          {values.confirmPin &&
                            values.pin !== values.confirmPin &&
                            "Pin must match"}
                        </Typography>
                      </Box>
                    )}
                    {/* Show/Hide Pin Toggle Button */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      <Button onClick={togglePinVisibility}>
                        {showPin ? "Hide Pin" : "Show Pin"}
                      </Button>
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit" variant="contained">
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
