import React from 'react';
import Home from './Home';
import configureMockStore from 'redux-mock-store';
import { fireEvent,render } from '@testing-library/react';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test for Home component', () => {
    let component;
    const storeInitialState = mockStore({
      incomeReducer: {
        income: 20000
        }
    });
    beforeEach(async() => {
            component = render(<Provider store={storeInitialState}><Home></Home></Provider>);
        })
    test('should load component Home ', () => {
        expect(component).toMatchSnapshot();
    });
    test('should call history ', () => {
        const input = component.container.querySelector("input")
        fireEvent.input(input, {
            target: {
                value: '20',
            },
        });
        const error = component.container.querySelector(".error.show")
        expect(error).toBeTruthy();
        fireEvent.input(input, {
            target: {
                value: '20000',
            },
        });
        const button = component.container.querySelector("button").click()
        expect(mockHistoryPush).toBeCalled();
    });
})