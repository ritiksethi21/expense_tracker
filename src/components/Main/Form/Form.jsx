import React, { useContext, useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../../context/context";

import { v4 as uuidv4 } from "uuid";
import { useSpeechContext } from "@speechly/react-client";

import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";

import formatDate from "../../../utils/formatDate";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);

  const { segment } = useSpeechContext();
  const { addTransaction } = useContext(ExpenseTrackerContext);

  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };
    // console.log(transaction);
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        setFormData(initialState);
      }
      console.log(segment);
      console.log(segment.intent);
      console.log(segment.intent.intent);
      segment.entities.forEach((entity) => {
        const category = `${entity.value.charAt(0)}${entity.value
          .slice(1)
          .toLowerCase()}`;
        switch (entity.type) {
          case "amount":
            setFormData({ ...formData, amount: entity.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category: category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category: category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: entity.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.date &&
        formData.type
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;
  // console.log(selectedCategories);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body2" color="initial" aligb="center" gutterBottom>
          {segment && <>{segment.words.map((w) => w.value).join(" ")}</>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((cate) => (
              <MenuItem key={cate.type} value={cate.type}>
                {cate.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
