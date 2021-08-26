const CHANGE_INCOME = 'INCOME WAS CHANGED[income]';


const changeIncome = income => ({
  type: CHANGE_INCOME,
  payload: { income}
});

export {
  CHANGE_INCOME,
  changeIncome
}