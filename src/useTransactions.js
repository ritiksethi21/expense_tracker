import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  //if expense is title we will get only expense with all categories
  const transactionsPerType = transactions.filter((t) => t.type === title);
  //reduce callback, initialval
  //calback acc, currvalue which is transactions ka singualar

  //total expense or income
  const total = transactionsPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );

  // categories based on type
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  console.log({ transactionsPerType, total, categories });

  transactionsPerType.forEach((t) => {
    const specificCategory = categories.find((c) => c.type === t.category);
    if (specificCategory) specificCategory.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((e) => e.color),
      },
    ],
    labels: filteredCategories.map((e) => e.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;
