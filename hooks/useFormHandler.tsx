import {useState, useCallback} from "react";

interface InputErrors {
  [key: string]: string;
}

interface FormHandler {
  values: {[key: string]: string};
  errors: InputErrors;
  handleChange: (key: string, value: string) => void;
  setValues: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  setErrors: React.Dispatch<React.SetStateAction<InputErrors>>;
}

export const useFormHandler = (initialValues: {
  [key: string]: string;
}): FormHandler => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<InputErrors>({});

  const handleChange = useCallback(
    (key: string, value: string) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: value,
      }));

      setErrors((prevErrors) => {
        const newErrors = {...prevErrors};

        if (key === "email") {
          newErrors.email =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
              ? ""
              : "Invalid email address.";
        }

        if (key === "password") {
          newErrors.password =
            value.length >= 8 ? "" : "Password must be at least 8 characters.";
        }

        if (key === "confirmPassword") {
          newErrors.confirmPassword =
            value !== values.password ? "Passwords don't match." : "";
        }

        return newErrors;
      });
    },
    [values]
  );

  return {values, errors, handleChange, setValues, setErrors};
};
