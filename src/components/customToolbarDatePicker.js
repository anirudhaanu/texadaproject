import React, { useState } from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: 15,
  },
});

const CustomToolbar = function (props) {
  const { date, isLandscape, openView, setOpenView, title } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  const classes = useStyles();

  return (
    <PickerToolbar
      className={classes.toolbar}
      title={title}
      isLandscape={isLandscape}
    >
      <h2 style={{ color: "white", fontWeight: 300 }}>{props.label} Date</h2>
    </PickerToolbar>
  );
};

export default CustomToolbar;
