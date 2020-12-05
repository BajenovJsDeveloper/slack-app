import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    tableLayout: "fixed",
  },
  head: {
    backgroundColor: "black",
  },
  headCell: {
    color: "#b0dbf9",
    cursor: "default",
  },
  headMsg: {
    color: "#b0dbf9",
    width: "40%",
  },
  bodyCell: {
    maxHeight: 50,
    overflow: "hidden",
  },
  bodyCellDate: {
    maxHeight: 50,
    overflow: "hidden",
    color: "#bdbdbd",
    fontSize: "0.7rem",
  },
  bodyCellMsg: {
    color: "#ffa565",
  },
  bodyCellChannel: {},
  box: {
    display: "flex",
    fontWeight: 'bold',
  },
  iconActive: {
    color: "#da0421",
  },
});

export default function MessagesTable({ userMessages, sortArrows, sortClick }) {
  const [activeField, setActiveField] = useState({
    user: false,
    date: false,
    channel: false,
  });

  const handleClick = (fieldName) => {
    const newField = { name: false, date: false, channel: false };
    setActiveField({ ...newField, [fieldName]: true });
    sortClick(fieldName);
  };

  const getArrowDirrection = (dir, active) => {
    const style = active ? classes.iconActive : null;
    return dir === "desc" ? (
      <ExpandMoreIcon className={style} />
    ) : (
      <ExpandLessIcon className={style} />
    );
  };

  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ height: "80vh", width: "100%" }}>
      <Table className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell className={classes.headCell}>
              <Box className={classes.box} onClick={() => handleClick("user")}>
                {getArrowDirrection(sortArrows.user, activeField.user)}
                User
              </Box>
            </TableCell>
            <TableCell className={classes.headCell}>
              <Box className={classes.box} onClick={() => handleClick("date")}>
                {getArrowDirrection(sortArrows.date, activeField.date)}
                Date
              </Box>
            </TableCell>
            <TableCell className={classes.headCell}>
              <Box
                className={classes.box}
                onClick={() => handleClick("channel")}
              >
                {getArrowDirrection(sortArrows.channel, activeField.channel)}
                Channel
              </Box>
            </TableCell>
            <TableCell className={classes.headMsg}> 
            	<Box className={classes.box}> Message </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userMessages.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className={classes.bodyCell}>{row.user}</div>
              </TableCell>
              <TableCell>
                <div className={classes.bodyCellDate}>{row.date}</div>
              </TableCell>
              <TableCell>
                <div className={classes.bodyCell}>
                  <i>{row.channel}</i>
                </div>
              </TableCell>
              <TableCell className={classes.bodyCellMsg}>
                <div className={classes.bodyCell}>{row.msg}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
