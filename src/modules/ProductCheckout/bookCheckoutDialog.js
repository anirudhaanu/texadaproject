import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import DateRangePicker from "../../components/dateRangePicker";
import DisabledDateRangePicker from "../../components/disabledDateRangePicker";
import ProductInfo from "../../components/productInfo";
import DialogFooterSection from "../../components/dialogFooterSection";
import MileageInputForReturn from "../../components/mileageInputForReturn";
import DifferenceInDay from "../../utils/differenceInDays";
import IntegerValidation from "../../utils/integerValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  dialogContents: {
    minWidth: 400,
  },
  formControl: {
    // margin: theme.spacing(1),
    width: "100%",
    marginBottom: "2rem",
  },
  dialog: {
    width: 400,
  },
  header: {
    background: theme.palette.grey["300"],
    padding: 15,
    fontWeight: 300,
    fontSize: 20,
  },
}));

export default function BookCheckoutDialog({
  open,
  handleCloseBook,
  dataList,
  product,
  handleChange,
  setTimeRange,
  timeRange,
  setConfirmationOpen,
  buttonType,
  mileAgeAdded,
  setMileAgeAdded,
}) {
  const classes = useStyles();
  const checkButtonDisability = () => {
    if (buttonType === "book")
      return (
        timeRange.duration < 0 ||
        timeRange.duration < product.minimum_rent_period ||
        product.discount
      );
    else if (buttonType === "return")
      return product.type === "meter" && !IntegerValidation(mileAgeAdded);
  };
  return (
    <Dialog
      onClose={handleCloseBook}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={"md"}
    >
      {" "}
      <DialogTitle id="simple-dialog-title">
        {buttonType === "book" ? "Book a product" : "Return a product"}
      </DialogTitle>
      <DialogContent className={classes.dialogContents}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Product</InputLabel>
          {
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={product.id}
              onChange={handleChange}
            >
              <h1 className={classes.header}>
                {buttonType === "book" ? "Book a product" : "Return a product"}
              </h1>
              {product &&
                dataList.map((item) => {
                  return (
                    <MenuItem
                      value={item.id}
                      disabled={
                        buttonType === "return"
                          ? item.availability
                          : !item.availability
                      }
                      key={item.id}
                    >
                      {item.name + "/" + item.code}
                    </MenuItem>
                  );
                })}
            </Select>
          }
        </FormControl>

        <ProductInfo product={product} />

        {buttonType === "return" && product.type === "meter" && (
          <MileageInputForReturn
            mileAgeAdded={mileAgeAdded}
            setMileAgeAdded={setMileAgeAdded}
          />
        )}

        {buttonType === "book" && (
          <DateRangePicker callBack={(e) => setTimeRange(e)} />
        )}

        {buttonType === "return" && product.startDate && product.endDate && (
          <DisabledDateRangePicker
            startDate={product.startDate}
            endDate={product.endDate}
          />
        )}

        {(buttonType === "book" ||
          (buttonType === "return" && product.startDate)) && (
          <DialogFooterSection
            duration={
              buttonType === "return" && product.startDate
                ? DifferenceInDay(product.startDate, product.endDate)
                : timeRange.duration
            }
            product={product}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseBook}>
          Cancel
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => setConfirmationOpen(true)}
          disabled={checkButtonDisability()}
        >
          {buttonType === "return" ? "Return" : "Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
