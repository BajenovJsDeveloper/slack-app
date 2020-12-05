import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MessagesTable from "./components/MessagesTable/MessagesTable";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const ZERO = 0;
const NEGATIVE = -1;
const POZITIVE = 1;

const useStyles = makeStyles({
  app: {
    margin: "10% auto",
    boxShadow: "0 0 20px 5px #bbbbbb",
    padding: 20,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    color: "#a5a5a5",
  },
});

function sortFields(messages, arrows) {
  const newMessagesList = [...messages];
  const field = arrows.active;
  const dir = arrows[field] === "desc" ? POZITIVE : NEGATIVE;
  newMessagesList.sort((a, b) => {
    if (a[field] > b[field]) return POZITIVE * dir;
    if (a[field] < b[field]) return NEGATIVE * dir;
    return ZERO;
  });
  return newMessagesList;
}

function App() {
  const classes = useStyles();
  const [userMessages, setMessages] = useState([]);
  const [sortArrows, setArrows] = useState({
    user: "desc",
    date: "desc",
    channel: "desc",
    active: "user",
  });
  const [load, setLoad] = useState(false);
  const [sorting, setSorting] = useState(false);

  const sortClick = (fieldName) => {
    const sortDir = sortArrows[fieldName] === "desc" ? "asc" : "desc";
    const arrows = { ...sortArrows, [fieldName]: sortDir, active: fieldName };
    setArrows((prev) => arrows);
    setMessages(sortFields(userMessages, arrows));
    setSorting(true);
  };

  useEffect(() => {
    const url = "https://my-test-server3.vercel.app/hello/info";
    if (!sorting) {
      axios
        .get(url)
        .then((data) => {
          const newMessagesList = sortFields(data.data.data, sortArrows);
          setMessages(newMessagesList);
        })
        .catch((err) => {
          console.log("Sorry! Somethig was wrong then getting data...");
        });
    } else {
      setSorting(false);
    }
  }, [load]);

  useEffect(() => {
    setTimeout(() => {
      setLoad((prev) => !prev);
    }, 3000);
  }, [load]);

  return (
    <Container maxWidth="md" className={classes.app}>
      <Box className={classes.header}>
        <h1>Table of messages</h1>
      </Box>
      <MessagesTable
        sortClick={sortClick}
        sortArrows={sortArrows}
        userMessages={userMessages}
      />
    </Container>
  );
}

export default App;
