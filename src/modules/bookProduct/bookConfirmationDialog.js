import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import calculateBookingCost from "../../utils/calculateBook";

export default function BookConfirmationDialog({
  open,
  handleClose,
  product,
  timeRange,
  buttonType,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {buttonType === "book"
          ? "Do you want to book ?"
          : "Do you want to return ?"}
      </DialogTitle>
      {product && (
        <DialogContent>
          {!product.startDate && (
            <DialogContentText id="alert-dialog-description">
              Your total price is{" "}
              {calculateBookingCost(
                product.price,
                product.discount,
                product.minimum_rental_period,
                timeRange.duration
              )}
            </DialogContentText>
          )}
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => handleClose("cancel")} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            handleClose("success");
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
