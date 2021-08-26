import {changeIncome} from '../actions/income.action';
import incomeReducer from './incomeReducer';

let action = {};

describe('test incomeReducer file', () => {
  beforeEach(() => {
    action = changeIncome();
  });

  test('test with paramters empty, should return tag recommended an releases empty', () => {
    const state = incomeReducer(undefined, {});
    expect(state.income).toStrictEqual(0);
  });
    test('Test with call incomeReducer.action with info', () => {
    action = changeIncome(20000);
    const state = incomeReducer(undefined, action);

    expect(state.income).toBe(20000);
  });
});
