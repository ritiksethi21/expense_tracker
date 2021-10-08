import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

import { Doughnut } from "react-chartjs-2";

import useStyles from "./styles";
import useTransactions from "../../useTransactions";

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title);

  return (
    <div>
      <Card className={title === "Income" ? classes.income : classes.expense}>
        <CardHeader
          action={
            <IconButton aria-label="">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader=""
        />
        <CardContent>
          <Typography variant="h4" color="initial">
            ${total}
          </Typography>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
