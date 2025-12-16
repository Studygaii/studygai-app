import * as yup from "yup";
import tlds from "tlds";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test("valid-tld", "Invalid email format", (value) => {
      if (!value) return true;
      const parts = value.split("@");
      const domainParts = parts[1].split(".");
      const tld = domainParts[domainParts.length - 1];
      return tlds.includes(tld);
    }),
  password: yup.string().required("Password is required"),
});

export default loginSchema;
