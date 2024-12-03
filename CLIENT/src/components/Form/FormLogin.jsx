import { Button, FormControl, TextField, Typography } from "@mui/material";
import Spinner from "../Spinner";
import {
  useLoginMutation,
  useRegisterMutation,
  useUpdateMutation,
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
  selectHelperText,
  setHelperText as setHelperTextFormLogin,
  selectNewPassword,
  setNewPassword as setNewPasswordFormLogin,
} from "../../redux/slices/formLogin.slice";
import PropTypes from "prop-types";

const FormLogin = ({ handleCloseInfo = null }) => {
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [update, { isLoading: isLoadingUpdate }] = useUpdateMutation();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const name = useSelector(selectName);
  const firstname = useSelector(selectFirstName);
  const type = useSelector(selectType);
  const setType = (value) => dispatch(setTypeFormLogin(value));
  const newPassword = useSelector(selectNewPassword);

  const setName = (value) => dispatch(setNameFormLogin(value));
  const setFirstname = (value) => dispatch(setFirstNameFormLogin(value));
  const setEmail = (value) => dispatch(setEmailFormLogin(value));
  const setPassword = (value) => dispatch(setPasswordFormLogin(value));
  const setNewPassword = (value) => dispatch(setNewPasswordFormLogin(value));
  const handleClose = () => dispatch(handleCloseFormLogin());

  const { openSnackbar } = useSnackbar();

  const helperText = useSelector(selectHelperText);
  const setHelperText = (value) => dispatch(setHelperTextFormLogin(value));

  const renderBtnText = () => {
    if (type === "login") {
      return "Connexion";
    }
    if (type === "info") {
      return "Mettre à jour";
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
      case "info":
        return (
          !checkEmail() ||
          !checkPassword() ||
          !checkName() ||
          !checkFirstname() ||
          !checkNewPassword()
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
    const regex = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
    return regex.test(name) && name.length > 2;
  };

  const checkFirstname = () => {
    // authoriser les espace au milieu
    const regex = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
    return regex.test(firstname) && firstname.length > 2;
  };

  const checkPassword = () => {
    // verifie si le mot de passe contient au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return password.length > 8 && regex.test(password);
  };

  const checkNewPassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return (
      (newPassword.length > 8 &&
        regex.test(newPassword) &&
        newPassword !== password) ||
      newPassword === ""
    );
  };

  const handleValidation = async (field, value) => {
    let errors = [];

    switch (field) {
      case "name":
        if (!/^[a-zA-Z]+$/.test(value)) {
          errors.push("Votre nom doit contenir que des lettres.");
        }
        if (value.length <= 2) {
          errors.push("Votre nom doit contenir au moins 3 caractères.");
        }
        break;
      case "firstname":
        if (!/^[a-zA-Z]+$/.test(value)) {
          errors.push("Votre prénom doit contenir que des lettres.");
        }
        if (value.length <= 2) {
          errors.push("Votre prénom doit contenir au moins 3 caractères.");
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
          errors.push("Email invalide.");
        }
        break;
      case "password":
        if (value.length < 8) {
          errors.push("Mot de passe trop court.");
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errors.push(
            "Le mot de passe doit contenir une majuscule, une minuscule et un chiffre."
          );
        }
        break;
      case "newPassword":
        if (value.length < 8 && value.length > 0) {
          errors.push("Mot de passe trop court.");
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) && value.length > 0) {
          errors.push(
            "Le mot de passe doit contenir une majuscule, une minuscule et un chiffre."
          );
        }
        if (value === password && value.length > 0) {
          errors.push(
            "Le nouveau mot de passe doit être différent de l'ancien."
          );
        }
        break;
      default:
        break;
    }

    setHelperText({
      ...helperText,
      [field]: errors,
    });
  };

  const verifyErrors = async (violations) => {
    setHelperText({
      email: [],
      password: [],
      name: [],
      firstname: [],
      newPassword: [],
    });

    const violationsGrouped = violations.reduce(
      (acc, violation) => {
        const { propertyPath, title } = violation;

        if (propertyPath === "email") acc.email.push(title);
        if (propertyPath === "password") acc.password.push(title);
        if (propertyPath === "nom") acc.name.push(title);
        if (propertyPath === "prenom") acc.firstname.push(title);
        if (propertyPath === "newPassword") acc.newPassword.push(title);

        return acc;
      },
      { email: [], password: [], name: [], firstname: [], newPassword: [] }
    );
    console.log("violationsGrouped", violationsGrouped);

    setHelperText({
      email: violationsGrouped?.email,
      password: violationsGrouped?.password,
      name: violationsGrouped?.name,
      firstname: violationsGrouped?.firstname,
      newPassword: violationsGrouped?.newPassword,
    });
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
          openSnackbar("Connexion réussie", "info");
          dispatch(setToken(res.data.token));
          dispatch(setAuthenticated(true));
          handleClose();
        }
      }
      if (type === "register") {
        // REGISTER
        const trimInfo = {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
          firstname: firstname.trim(),
        };
        const res = await register(trimInfo);
        if (res?.error?.data) {
          if (res.error?.status === 404) {
            setHelperText({
              email: ["Email déjà utilisé"],
            });
          } else {
            const violations = res.error.data.violations;
            verifyErrors(violations).then(() => {
              console.log("violations", violations);
            });
          }
        }
        if (res?.data?.message) {
          console.log("res", res);
          openSnackbar(res.data.message, res.data.serverity);
          setType("login");
        }
      }
      if (type === "info") {
        // INFO
        const trimInfo = {
          email: email.trim(),
          password: password.trim(),
          name: name.trim(),
          firstname: firstname.trim(),
          newPassword: newPassword.trim(),
        };
        const res = await update(trimInfo);
        if (res?.error?.data) {
          const violations = res.error.data.violations;
          verifyErrors(violations).then(() => {
            console.log("violations", violations);
          });
        }
        if (res?.data?.message) {
          console.log("res", res);
          openSnackbar(res.data.message, res.data.serverity);
          // fermer le modal info
          handleCloseInfo();
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
      newPassword: "",
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
        {(type === "register" || type === "info") && (
          <>
            <TextField
              label="Nom"
              value={name}
              variant="outlined"
              type="text"
              required
              margin="normal"
              onChange={async (e) => {
                setName(e.target.value);
                await handleValidation("name", e.target.value);
              }}
              onBlur={() => handleValidation("name", name)}
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
                handleValidation("firstname", e.target.value);
              }}
              onBlur={() => handleValidation("firstname", firstname)}
              error={helperText.firstname?.length > 0}
              helperText={
                helperText.firstname?.length > 0 &&
                helperText.firstname.join(", ")
              }
            />
          </>
        )}
        <TextField
          label="Adresse mail"
          value={email}
          variant="outlined"
          type="email"
          required
          margin="normal"
          onChange={(e) => {
            setEmail(e.target.value);
            handleValidation("email", e.target.value);
          }}
          onBlur={() => handleValidation("email", email)}
          error={helperText.email?.length > 0}
          helperText={
            helperText.email?.length > 0 && helperText.email.join(", ")
          }
        />
        <TextField
          label="Mot de passe"
          value={password}
          variant="outlined"
          type="password"
          required
          margin="normal"
          onChange={(e) => {
            setPassword(e.target.value);
            handleValidation("password", e.target.value);
          }}
          onBlur={() => handleValidation("password", password)}
          error={helperText.password?.length > 0}
          helperText={
            (helperText.password?.length > 0 &&
              helperText.password.join(", ")) ||
            (type === "info" &&
              "La saisie de votre mot de passe est obligatoire pour effectuer des modifications")
          }
        />
        {type === "info" && (
          <TextField
            label="Nouveau mot de passe"
            value={newPassword}
            variant="outlined"
            type="password"
            margin="normal"
            onChange={(e) => {
              setNewPassword(e.target.value);
              handleValidation("newPassword", e.target.value);
            }}
            onBlur={() => handleValidation("newPassword", newPassword)}
            error={helperText.newPassword?.length > 0}
            helperText={
              (helperText.newPassword?.length > 0 &&
                helperText.newPassword.join(", ")) ||
              "Laissez vide si inchangé"
            }
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={disabledBtn()}
          sx={{ mt: 4 }}
        >
          <Spinner
            isLoading={isLoading || isLoadingLogin || isLoadingUpdate}
            content={`${renderBtnText()}`}
          />
        </Button>
        {type !== "info" && (
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
        )}
      </FormControl>
    </form>
  );
};

FormLogin.propTypes = {
  handleCloseInfo: PropTypes.func,
};

export default FormLogin;
