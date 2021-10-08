import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
const Main = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="">
            <MoreVertIcon />
          </IconButton>
        }
        title="Expense Tracker"
        subheader="powered by Speechly"
      />
      <CardContent>
        <Typography variant="subtitle2" color="initial" align="center">
          Total balance $100
        </Typography>
        <Typography
          variant="subtitle2"
          color="initial"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          {/* infocard */}
          try saying : add income for $100 doller in monday
        </Typography>
        <Divider />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
