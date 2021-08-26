import React from 'react';
import { act,fireEvent,render } from '@testing-library/react';
import Agents from './Agents';
import configureMockStore from 'redux-mock-store';
import mockedAxios from 'axios';
import { Provider } from 'react-redux';
import agentsData from '../../../public/assets/json/AGENTS_LIST.json';

const mockStore = configureMockStore();
jest.mock('axios');
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test for Card component', () => {
    let component;
    const storeInitialState = mockStore({
      incomeReducer: {
        income: 20000
        }
    });
    beforeEach(async() => {
        mockedAxios.get.mockResolvedValue({ data: agentsData });
        await act(async () => {
            component = render(<Provider store={storeInitialState}><Agents></Agents></Provider>);
        })
    })
    test('should load component Agents ', () => {
        expect(component).toMatchSnapshot();
    });
    test('should get 6 agents ', async() => {
        let agents= component.container.querySelectorAll(".card")
        expect(agents.length).toBe(3);
        component.container.querySelectorAll(".link")[1].click()
        component.rerender(<Provider store={storeInitialState}><Agents></Agents></Provider>)
        agents= component.container.querySelectorAll(".card")
        expect(agents.length).toBe(6);
    });
    test('should get 3 agents ', async() => {
        component.container.querySelectorAll(".link")[1].click()
        component.container.querySelectorAll(".link")[0].click()
        component.rerender(<Provider store={storeInitialState}><Agents></Agents></Provider>)
        const agents = component.container.querySelectorAll(".card")
        agents[0].click()
        agents[2].click()
        expect(agents.length).toBe(3);
    });
    test('should sort ASC', async() => {
        const sort = component.container.querySelector(".select");
        sort.click();
        const select=component.container.querySelector('.react-select__dropdown-indicator')
        fireEvent.mouseDown(select, {button: 0 });
        const option = component.container.querySelector('.react-select__option')
        fireEvent.click(option);
        component.rerender(<Provider store={storeInitialState}><Agents></Agents></Provider>)
        const agents = component.container.querySelectorAll(".card")
        expect(agents.length).toBe(3);
    });
     test('should sort DESC', async() => {
        const sort = component.container.querySelector(".select");
        sort.click();
        const select=component.container.querySelector('.react-select__dropdown-indicator')
        fireEvent.mouseDown(select, {button: 0 });
        const option = component.container.querySelectorAll('.react-select__option')[1]
        fireEvent.click(option);
        component.rerender(<Provider store={storeInitialState}><Agents></Agents></Provider>)
        expect(component).toBeTruthy();
     });
     test('should call push', async() => {
        mockedAxios.get.mockResolvedValue({ data: {} });
        await act(async () => {
            component = render(<Provider store={storeInitialState}><Agents></Agents></Provider>);
        })
         component.container.querySelector(".link").click()
        expect(mockHistoryPush).toBeCalled();
     });
    
})