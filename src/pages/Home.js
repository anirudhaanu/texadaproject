import React from "react";
import { makeStyles } from "@material-ui/core";
import EnhancedTable from "../modules/DataTable/table";
import ButtonsSection from "../modules/ProductCheckout/bookButton";
import Data from "../data/dummyData.json";

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

  const callBackForTable = (data) => {
    setSelectedProduct(data);
  };

  const updateTable = () => {
    const fetchedFromLocalStorage = JSON.parse(
      localStorage.getItem("dataList")
    );
    console.log(fetchedFromLocalStorage);
    setRows(fetchedFromLocalStorage);
    setSelectedProduct(null);
    console.log("update");
  };

  return (
    <div className={classes.root}>
      <EnhancedTable
        dataList={rows}
        selectedProduct={selectedProduct}
        callBackForTable={callBackForTable}
      />
      <ButtonsSection
        dataList={rows}
        selectedRow={selectedProduct}
        updateTable={updateTable}
      />
    </div>
  );
}
