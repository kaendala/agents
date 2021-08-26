import ReactDOM from 'react-dom';
jest.mock('react-dom');
require('./index');

describe('test ReactDOM.render', () => {
  it('should call ReactDOM.render', () => {
    expect(ReactDOM).toBeTruthy();
  });
});
