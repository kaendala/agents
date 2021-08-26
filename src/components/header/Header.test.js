import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test for Header component', () => {
    let component;
    beforeEach(async() => {
            component = render(<Header></Header>);
        })
    test('should load component Header ', () => {
        expect(component).toMatchSnapshot();
    });
    test('should call history ', () => {
        component.container.querySelector(".logo").click()
        expect(mockHistoryPush).toBeCalled();
    });
})