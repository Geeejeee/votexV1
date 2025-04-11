import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  idNumber: Yup.string().required("ID Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  college: Yup.string().required("College is required"),
  department: Yup.string().required("Department is required"),
  yearLevel: Yup.string().required("Year level is required"),
  section: Yup.string().required("Section is required"),
});
