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
  }, [successAlertMessage]);

  React.useEffect(() => {
    if (errorAlertMessage) setOpenError(true);
  }, [errorAlertMessage]);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successAlertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseError}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorAlertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
