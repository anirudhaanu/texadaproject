import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import SearchBar from "material-ui-search-bar";

import Data from "../../data/dummyData.json";
import ButtonsSection from "../ProductCheckout/bookButton";
import { withStyles } from "@material-ui/styles";

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

const dummyRows = initDataFromLocalStorage(Data);

const CustomTableCell = withStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}))(TableCell);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: true, disablePadding: false, label: "id" },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  { id: "code", numeric: true, disablePadding: false, label: "Code" },
  {
    id: "availability",
    numeric: true,
    disablePadding: false,
    label: "Availability",
  },
  {
    id: "needing_repair",
    numeric: true,
    disablePadding: false,
    label: "Needs Repair",
  },
  {
    id: "durability",
    numeric: true,
    disablePadding: false,
    label: "Durability",
  },
  { id: "mileage", numeric: true, disablePadding: false, label: "Mileage" },
];

const useTableHeadStyle = makeStyles((theme) => ({
  tableCell: {
    background: theme.palette.grey["100"],

    fontSize: 20,
    fontWeight: 300,
  },
}));

function EnhancedTableHead(props) {
  const classes = useTableHeadStyle();
  const { onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <CustomTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableCell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 40,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    paddingTop: 20,
  },
  table: {
    minWidth: 750,
  },
  container: {
    height: window.innerHeight * 0.5,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  tableCell: {
    background: "yellow",
  },
  tableRow: {
    cursor: "pointer",
  },
  avialabiltyCell: {},
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    background: theme.palette.grey["300"],
    "& h2": {
      display: "flex",
      margin: 0,
      marginLeft: 20,
      fontWeight: 300,
      alignItems: "center",
    },
  },

  searchBar: {
    margin: 20,
    width: 300,
  },
}));

export default function EnhancedTable({
  dataList,
  selectedProduct,
  callBackForTable,
}) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState(selectedProduct);
  const [searched, setSearched] = React.useState("");

  React.useEffect(() => {
    setRows(dataList);
  }, [dataList]);

  const requestSearch = (searchedVal) => {
    const filteredRows = dataList.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleClick = (event, name) => {
    // console.log(name);
    if (selectedRow && selectedRow.id === name.id) {
      callBackForTable(null);
      setSelectedRow(null);
    } else {
      callBackForTable(name);
      setSelectedRow(name);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.searchContainer}>
          <h2>Product Table</h2>

          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            className={classes.searchBar}
          />
        </div>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader={true}
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="sticky table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className={classes.tableBody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  //const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row)}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      selected={selectedRow && selectedRow.id === row.id}
                      className={classes.tableRow}
                    >
                      <CustomTableCell align="left">{row.id}</CustomTableCell>
                      <CustomTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.name}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.code}
                      </CustomTableCell>
                      <CustomTableCell
                        align="right"
                        className={classes.avialabiltyCell}
                        style={{
                          color: row.availability ? "#3f51b5" : "#f50057",
                        }}
                      >
                        {row.availability.toString()}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.needing_repair.toString()}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.durability} / {row.max_durability}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        {row.mileage === null ? "NA" : row.mileage}
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
