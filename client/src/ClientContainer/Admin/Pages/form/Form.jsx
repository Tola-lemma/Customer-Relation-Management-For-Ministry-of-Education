import { Box, Button, TextField, Select, MenuItem} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components/Header";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import axios from "axios";
import { useContext } from "react";
import { ErrorMessage } from "../../ToastErrorPage/ErrorMessage";
export const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { showError,showSuccess } = useContext(ErrorContext);
  const handleFormSubmit = async (values,{resetForm}) => {
    try {
    const {data : {msg}} = await axios.post("/admin/register", { ...values}
    , {
      headers: {
      'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
      showSuccess("Successfully "+ msg + "!");
      resetForm(initialValues)
    } catch (error) {
        showError(error?.response?.data?.msg || "An error occurred. Please try again.");
  };
  }
  return (
    <Box m="20px">
      <Header
        title="CREATE STAFF MEMBER"
        subtitle="Create a New Staff member's Profile"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                name="role"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                error={!!touched.role && !!errors.role}
                renderValue={(selected) => selected || "Role"}
                displayEmpty
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value=""><em>Select a Role</em></MenuItem>
                <MenuItem value="transferCoordinator">
                  Transfer Coordinator
                </MenuItem>
                <MenuItem value="studyAbroadCoordinator">
                  Study Abroad Coordinator
                </MenuItem>
                <MenuItem value="scholarshipCoordinator">
                  Scholarship Coordinator
                </MenuItem>
                <MenuItem value="complaintsCoordinator">
                  Complaints Coordinator
                </MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New staff member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ErrorMessage />
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  role: yup.string().required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
  password: "",
  confirmPassword: "",
};
