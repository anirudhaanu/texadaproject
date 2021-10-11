import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import BookConfirmationDialog from "./bookConfirmationDialog";
import BookCheckoutDialog from "./bookCheckoutDialog";
import DifferenceInDay from "../../utils/differenceInDays";
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

export default function ButtonsSection({ dataList, selectedRow, updateTable }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(null);
  const [timeRange, setTimeRange] = React.useState({ ...initTimeRange });
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [buttonType, setButtonType] = React.useState(null);
  const [mileAgeAdded, setMileAgeAdded] = React.useState(null);

  React.useEffect(() => {
    setProduct(selectedRow);
    setTimeRange({ ...initTimeRange });
  }, [selectedRow]);

  const handleCloseConfirmation = (e) => {
    setConfirmationOpen(false);
    if (buttonType === "book") postBooking({ ...product }, { ...timeRange });
    else postReturn({ ...product }, mileAgeAdded);

    if (e === "success") {
      updateTable();
      setOpen(false);
    }
  };

  const handleChange = (event) => {
    const index = dataList.findIndex(
      (item) => selectedRow && item.id === event.target.value
    );
    setProduct(dataList[index]);
  };
  const handleCloseBook = () => {
    setOpen(false);
  };

  const handleOpenBook = (buttonType) => {
    setButtonType(buttonType);
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenBook("book")}
        disabled={!selectedRow || !selectedRow.availability}
      >
        Book
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleOpenBook("return")}
        disabled={!selectedRow || selectedRow.availability}
      >
        Return
      </Button>

      {product && (
        <BookCheckoutDialog
          open={open}
          handleCloseBook={handleCloseBook}
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

      <BookConfirmationDialog
        open={confirmationOpen}
        handleClose={handleCloseConfirmation}
        product={product}
        timeRange={timeRange}
        buttonType={buttonType}
      />
    </div>
  );
}