import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CheckoutDialog from "./components/checkoutDialog";
import ConfirmationDialog from "./components/confirmationDialog";
import ButtonGroup from "./components/buttonGroup";
import postBooking from "../../services/postBooking";
import postReturn from "../../services/postReturn";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  dialogContents: {},
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
    marginBottom: "2rem",
  },
}));

const initTimeRange = { duration: 1, startDate: null, endDate: null };

export default function ProductCheckout({
  dataList,
  selectedRow,
  updateTable,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(null);
  const [timeRange, setTimeRange] = React.useState({ ...initTimeRange });
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [buttonType, setButtonType] = React.useState(null);
  const [mileAgeAdded, setMileAgeAdded] = React.useState(null);
  const [showNotification, setNotificationOpen] = React.useState(false);

  React.useEffect(() => {
    setProduct(selectedRow);
    setTimeRange({ ...initTimeRange });
  }, [selectedRow]);

  ///Mock post to datbase
  const handleCloseConfirmation = (e) => {
    setConfirmationOpen(false);

    // calulation for booking and post only if yes pressed on final confirmation dialog
    if (e === "success") {
      if (buttonType === "book") postBooking({ ...product }, { ...timeRange });
      else postReturn({ ...product }, mileAgeAdded);
      updateTable();
      setOpen(false);
    }
  };

  //handle change of product in the checkout dialog
  const handleChange = (event) => {
    const index = dataList.findIndex(
      (item) => selectedRow && item.id === event.target.value
    );
    setProduct(dataList[index]);
  };

  const handleCloseCheckoutDialog = () => {
    setOpen(false);
  };

  //checkoutdialog open and also what kind of button is pressed book/return
  const handleOpenCheckoutDialog = (buttonType) => {
    setButtonType(buttonType);
    if (buttonType === "book" && selectedRow.durability < 1) {
      setNotificationOpen(true);
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <ButtonGroup
        handleOpenCheckoutDialog={handleOpenCheckoutDialog}
        selectedRow={selectedRow}
      />

      {product && (
        <CheckoutDialog
          open={open}
          handleCloseBook={handleCloseCheckoutDialog}
          dataList={dataList}
          product={product}
          handleChange={handleChange}
          setTimeRange={setTimeRange}
          timeRange={timeRange}
          setConfirmationOpen={setConfirmationOpen}
          buttonType={buttonType}
          mileAgeAdded={mileAgeAdded}
          setMileAgeAdded={(value) => setMileAgeAdded(value)}
        />
      )}

      <ConfirmationDialog
        open={confirmationOpen}
        handleClose={handleCloseConfirmation}
        product={product}
        timeRange={timeRange}
        buttonType={buttonType}
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showNotification}
        onClose={() => setNotificationOpen(false)}
        message="Product is not durable to book"
        autoHideDuration={3000}
      />
    </div>
  );
}
