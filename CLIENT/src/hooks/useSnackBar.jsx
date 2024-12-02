//hooks use snackbar
import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar.context";

const useSnackBar = () => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  return { openSnackbar, closeSnackbar };
};

export default useSnackBar;
