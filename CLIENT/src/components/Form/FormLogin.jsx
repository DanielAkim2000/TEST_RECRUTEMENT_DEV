import { Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import Spinner from "../Spinner";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../api/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useSnackbar from "../../hooks/useSnackbar";
import { setAuthenticated, setToken } from "../../redux/slices/auth.slice";
import {
  selectEmail,
  selectFirstName,
  selectName,
  selectPassword,
  selectType,
  setEmail as setEmailFormLogin,
  setFirstName as setFirstNameFormLogin,
  setName as setNameFormLogin,
  setPassword as setPasswordFormLogin,
  setType as setTypeFormLogin,
  handleClose as handleCloseFormLogin,
} from "../../redux/slices/formLogin.slice";

const FormLogin = () => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const dispatch = useDispatch();
  // const [email, setEmail] = React.useState("");
  const email = useSelector(selectEmail);
  // const [password, setPassword] = React.useState("");
  const password = useSelector(selectPassword);
  // const [name, setName] = React.useState("");
  const name = useSelector(selectName);
  // const [firstname, setFirstname] = React.useState("");
  const firstname = useSelector(selectFirstName);
  const type = useSelector(selectType);
  const setType = (value) => dispatch(setTypeFormLogin(value));

  const setName = (value) => dispatch(setNameFormLogin(value));
  const setFirstname = (value) => dispatch(setFirstNameFormLogin(value));
  const setEmail = (value) => dispatch(setEmailFormLogin(value));
  const setPassword = (value) => dispatch(setPasswordFormLogin(value));
  const handleClose = () => dispatch(handleCloseFormLogin());

  const { openSnackbar } = useSnackbar();

  const [helperText, setHelperText] = React.useState({
    email: [],
    password: [],
    name: [],
    firstname: [],
  });

  const renderBtnText = () => {
    if (type === "login") {
      return "Connexion";
    }
    return "Créer un compte";
  };
  const disabledBtn = () => {
    switch (type) {
      case "login":
        return !checkEmail() || !checkPassword();
      case "register":
        return (
          !checkEmail() || !checkPassword() || !checkName() || !checkFirstname()
        );
      default:
        return true;
    }
  };

  const checkEmail = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const checkName = () => {
    //verifier si le nom contient des chiffres
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name) && name.length > 2;
  };

  const checkFirstname = () => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(firstname) && firstname.length > 2;
  };

  const checkPassword = () => {
    // verifie si le mot de passe contient au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return password.length > 8 && regex.test(password);
  };

  const checkInput = (type) => {
    switch (type) {
      case "email":
        if (!checkEmail()) {
          setHelperText({
            ...helperText,
            email: ["Email invalide"],
          });
        } else {
          setHelperText({
            ...helperText,
            email: [],
          });
        }
        break;
      case "password":
        if (!checkPassword()) {
          setHelperText({
            ...helperText,
            password: [
              "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre",
            ],
          });
        } else {
          setHelperText({
            password: [],
          });
        }
        break;
      case "name":
        if (!checkName()) {
          setHelperText({
            ...helperText,
            name: [
              "Votre nom doit contenir que des lettres et au moins 3 caractères",
            ],
          });
        } else {
          setHelperText({
            ...helperText,
            name: [],
          });
        }
        break;
      case "firstname":
        if (!checkFirstname()) {
          setHelperText({
            ...helperText,
            firstname: [
              "Votre prénom doit contenir que des lettres et au moins 3 caractères",
            ],
          });
        } else {
          setHelperText({
            ...helperText,
            firstname: [],
          });
        }
        break;
      default:
        break;
    }
  };

  const verifyErrors = async (violations) => {
    setHelperText({
      email: [],
      password: [],
      name: [],
      firstname: [],
    });

    const violationsGrouped = violations.reduce(
      (acc, violation) => {
        const { propertyPath, title } = violation;

        if (propertyPath === "email") acc.email.push(title);
        if (propertyPath === "password") acc.password.push(title);
        if (propertyPath === "nom") acc.name.push(title);
        if (propertyPath === "prenom") acc.firstname.push(title);

        return acc;
      },
      { email: [], password: [], name: [], firstname: [] }
    );

    setHelperText((prevHelperText) => ({
      ...prevHelperText,
      ...violationsGrouped,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (type === "login") {
        // LOGIN
        const trimInfo = {
          email: email.trim(),
          password: password.trim(),
        };
        const res = await login(trimInfo);
        if (res?.error?.data) {
          const violations = res.error.data.violations;
          verifyErrors(violations).then(() => {
            console.log("violations", violations);
          });
          if (res.error?.status === 401) {
            setHelperText({
              email: ["Email ou mot de passe incorrect"],
              password: ["Email ou mot de passe incorrect"],
            });
          }
          if (res.error?.status === 400) {
            setHelperText({
              email: ["Email ou mot de passe incorrect"],
              password: ["Email ou mot de passe incorrect"],
            });
          }
          if (res.error?.status === 500) {
            openSnackbar("Une erreur est survenue", "error");
          }
        }
        if (res?.data?.token) {
          console.log("res", res);
          openSnackbar("Connexion réussie", "success");
          dispatch(setToken(res.data.token));
          dispatch(setAuthenticated(true));
          handleClose();
        }
      } else {
        // REGISTER
        const trimInfo = {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
          firstname: firstname.trim(),
        };
        const res = await register(trimInfo);
        if (res?.error?.data) {
          console.log("res", res);
          const violations = res.error.data.violations;
          verifyErrors(violations).then(() => {
            console.log("violations", violations);
          });
        }
        if (res?.data?.message) {
          console.log("res", res);
          openSnackbar(res.data.message, res.data.serverity);
          setType("login");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeType = () => {
    // Reset input
    setEmail("");
    setPassword("");
    setName("");
    setFirstname("");
    setHelperText({
      email: "",
      password: "",
      name: "",
      firstname: "",
    });
    setType(type === "login" ? "register" : "login");
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
              error={helperText.name?.length > 0}
              helperText={
                helperText.name?.length > 0 && helperText.name.join(", ")
              }
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
              error={helperText.firstname?.length > 0}
              helperText={
                helperText.firstname?.length > 0 &&
                helperText.firstname.join(", ")
              }
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
          error={helperText.email?.length > 0}
          helperText={
            helperText.email?.length > 0 && helperText.email.join(", ")
          }
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
          error={helperText.password?.length > 0}
          helperText={
            helperText.password?.length > 0 && helperText.password.join(", ")
          }
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={disabledBtn()}
          sx={{ mt: 4 }}
        >
          <Spinner
            isLoading={isLoading || isLoadingLogin}
            content={`${renderBtnText()}`}
          />
        </Button>
        <div style={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {type === "login"
              ? "Vous n'avez pas de compte ?"
              : "Vous avez déjà un compte ?"}
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                handleChangeType();
              }}
            >
              {type === "login" ? "Inscrivez-vous" : "Connectez-vous"}
            </Button>
          </Typography>
        </div>
      </FormControl>
    </form>
  );
};

export default FormLogin;
