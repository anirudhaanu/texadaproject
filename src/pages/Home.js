import React from "react";
import { makeStyles } from "@material-ui/core";
import EnhancedTable from "../modules/DataTable";
import ProductCheckout from "../modules/ProductCheckout";
import Data from "../data/dummyData.json";
import Snackbar from "@material-ui/core/Snackbar";
import { Button } from "@material-ui/core";

//to insert IDs on given Data
function insertIDs(data) {
  let temp = [];
  data.map((item, index) => {
    temp = [...temp, { ...item, id: index }];
  });
  //console.log(data);
  return temp;
}

//fetch data from localstorage if available,else set from json data
function initDataFromLocalStorage(data) {
  if (!localStorage.getItem("dataList")) {
    localStorage.setItem("dataList", JSON.stringify(insertIDs(data)));
  }

  const fetchedData = JSON.parse(localStorage.getItem("dataList"));
  return fetchedData;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  localStorageParagraph: {
    textAlign: "left",
    fontFamily: "monospace",
    fontSize: 12,
    textDecoration: "underline",
    cursor: "pointer",
    marginLeft: 10,
  },
}));
export default function HomePage() {
  const classes = useStyles();
  const [rows, setRows] = React.useState(initDataFromLocalStorage(Data));
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showNotification, setNotificationOpen] = React.useState(false);

  const resetLocalstorage = () => {
    console.log("ok");
    if (localStorage.getItem("dataList")) localStorage.removeItem("dataList");
    setRows(initDataFromLocalStorage(Data));
  };

  const callBackForTable = (data) => {
    setSelectedProduct(data);
  };

  //callback to update product table after successfully booking or returning
  const updateTable = () => {
    const fetchedFromLocalStorage = JSON.parse(
      localStorage.getItem("dataList")
    );

    setRows(fetchedFromLocalStorage);
    setSelectedProduct(null);
    setNotificationOpen(true);
  };

  return (
    <div className={classes.root}>
      <p onClick={resetLocalstorage} className={classes.localStorageParagraph}>
        Clear localStorage
      </p>
      <EnhancedTable
        dataList={rows}
        selectedProduct={selectedProduct}
        callBackForTable={callBackForTable}
      />

      <ProductCheckout
        dataList={rows}
        selectedRow={selectedProduct}
        updateTable={updateTable}
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showNotification}
        onClose={() => setNotificationOpen(false)}
        message="Table Updated"
        autoHideDuration={3000}
      />
    </div>
  );
}
