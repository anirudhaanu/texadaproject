import React from "react";
import { makeStyles } from "@material-ui/core";
import EnhancedTable from "../modules/DataTable/table";
import ProductCheckout from "../modules/ProductCheckout";
import Data from "../data/dummyData.json";
import Snackbar from "@material-ui/core/Snackbar";

function insertIDs(data) {
  let temp = [];
  data.map((item, index) => {
    temp = [...temp, { ...item, id: index }];
  });
  //console.log(data);
  return temp;
}

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
}));
export default function HomePage() {
  const classes = useStyles();
  const [rows, setRows] = React.useState(initDataFromLocalStorage(Data));
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showNotification, setNotificationOpen] = React.useState(false);

  const callBackForTable = (data) => {
    setSelectedProduct(data);
  };

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
