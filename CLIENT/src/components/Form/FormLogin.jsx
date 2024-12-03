import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import Spinner from "../Spinner";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../api/slices/authSlice";

const FormLogin = ({ handleClose, type }) => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const { openSnackbar } = useSnackbar();

  const [helperText, setHelperText] = React.useState({
    email: "",
    password: "",
    name: "",
    firstname: "",
  });

  const renderBtnText = () => {
    if (type === "login") {
      return "Connexion";
    }
    return "Créer un compte";
  };
  const disabledBtn = () => {
    return isLoading || isLoadingLogin || !checkEmail() || !checkPassword();
  };

  const checkEmail = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const checkName = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(name) && name.length >= 2;
  };

  const checkFirstname = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(firstname) && firstname.length >= 2;
  };

  const checkPassword = () => {
    return password.length >= 8;
  };

  const checkInput = (input) => {
    switch (input) {
      case "email":
        if (!checkEmail()) {
          setHelperText({
            ...helperText,
            email: "Email invalide",
          });
        } else {
          setHelperText({
            ...helperText,
            email: "",
          });
        }
        break;
      case "password":
        if (!checkPassword()) {
          setHelperText({
            ...helperText,
            password: "Le mot de passe doit contenir au moins 8 caractères",
          });
        } else {
          setHelperText({
            ...helperText,
            password: "",
          });
        }
        break;
      case "name":
        if (name.length < 2) {
          setHelperText({
            ...helperText,
            name: "Le nom doit contenir au moins 2 caractères",
          });
        } else {
          setHelperText({
            ...helperText,
            name: "",
          });
        }
        break;
      case "firstname":
        if (firstname.length < 2) {
          setHelperText({
            ...helperText,
            firstname: "Le prénom doit contenir au moins 2 caractères",
          });
        } else {
          setHelperText({
            ...helperText,
            firstname: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const verifyErrors = (violations) => {
    violations.forEach((violation) => {
      if (violation.propertyPath === "email") {
        setHelperText({
          ...helperText,
          email: violation.template,
        });
      }
      if (violation.propertyPath === "password") {
        setHelperText({
          ...helperText,
          password: violation.template,
        });
      }
      if (violation.propertyPath === "name") {
        setHelperText({
          ...helperText,
          name: violation.template,
        });
      }
      if (violation.propertyPath === "firstname") {
        setHelperText({
          ...helperText,
          firstname: violation.template,
        });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (type === "login") {
        const res = await login({ email, password });
        if (res?.error?.data) {
          const violations = res.error.data.violations;
          verifyErrors(violations);
        }
        if (res?.data?.message) {
          openSnackbar(res.data.message, res.data.serverity);
          handleClose();
        }
      } else {
        const res = await register({ email, password });
        if (res?.error?.data) {
          const violations = res.error.data.violations;
          verifyErrors(violations);
        }
        if (res?.data?.message) {
          openSnackbar(res.data.message, res.data.serverity);
          handleClose();
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl fullWidth>
        {type === "register" && (
          <>
            <TextField
              label="Nom"
              value={name}
              variant="outlined"
              type="text"
              required
              margin="normal"
              onChange={(e) => {
                setName(e.target.value);
                checkInput("name");
              }}
              onBlur={() => checkInput("name")}
              error={helperText.name !== ""}
              helperText={helperText.name}
            />
            <TextField
              label="Prénom"
              value={firstname}
              variant="outlined"
              type="text"
              required
              margin="normal"
              onChange={(e) => {
                setFirstname(e.target.value);
                checkInput("firstname");
              }}
              onBlur={() => checkInput("firstname")}
              error={helperText.firstname !== ""}
              helperText={helperText.firstname}
            />
          </>
        )}
        <TextField
          label="Email"
          value={email}
          variant="outlined"
          type="email"
          required
          margin="normal"
          onChange={(e) => {
            setEmail(e.target.value);
            checkInput("email");
          }}
          onBlur={() => checkInput("email")}
          error={helperText.email !== ""}
          helperText={helperText.email}
        />
        <TextField
          label="Password"
          value={password}
          variant="outlined"
          type="password"
          required
          margin="normal"
          onChange={(e) => {
            setPassword(e.target.value);
            checkInput("password");
          }}
          onBlur={() => checkInput("password")}
          error={helperText.password !== ""}
          helperText={helperText.password}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={disabledBtn()}
          sx={{ mt: 4 }}
        >
          <Spinner isLoading={isLoading} content={`${renderBtnText()}`} />
        </Button>
      </FormControl>
    </form>
  );
};

export default FormLogin;
