import React from "react";

const contextReducer = (state, action) => {
  let newTransactions;

  switch (action.type) {
    case "DELETE_TRANSACTION":
      newTransactions = state.filter(
        (transaction) => transaction.id !== action.payload
      );
      return newTransactions;

    case "ADD_TRANSACTION":
      newTransactions = [action.payload, ...state];
      return newTransactions;

    default:
      return state;
  }
};

export default contextReducer;
