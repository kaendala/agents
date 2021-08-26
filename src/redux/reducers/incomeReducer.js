import {CHANGE_INCOME } from '../actions/income.action'

const initialState = {
  income: 0
}

function incomeReducer(state, action) {
  const actState = state ? state : initialState;
  switch (action.type) {
    case CHANGE_INCOME: {
      return {
            income: action.payload.income
      }
    }
    default:
      return actState;
  }
}

export default incomeReducer;