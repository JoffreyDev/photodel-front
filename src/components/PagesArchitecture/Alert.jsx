import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { openSuccessAlert, openErrorAlert } from "../../redux/actions/userData";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { successAlertMessage, errorAlertMessage } = useSelector(
    ({ userData }) => userData
  );
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (successAlertMessage) setOpenSuccess(true);
    if (errorAlertMessage) setOpenError(true);
  }, [successAlertMessage, errorAlertMessage]);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setTimeout(() => {
      dispatch(openSuccessAlert(false));
      dispatch(openErrorAlert(false));
    }, 1000);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setTimeout(() => {
      dispatch(openSuccessAlert(false));
      dispatch(openErrorAlert(false));
    }, 1000);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successAlertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorAlertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
