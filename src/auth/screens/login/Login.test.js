import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from '@material-ui/core';
import Login from './Login';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({ push: jest.fn() })
}));
describe('Login component', () => {
    const formValues = {
        email: 'test@test.com',
        password: 'Admin123'
    };

    const componentShallow = shallow(<Login {...formValues} />);
    const textField = componentShallow.find(TextField);
    // const button = componentShallow.find(Button);
    // const mockLogout = jest.fn();

    describe('Component Snapshot', () => {
        it('should match stored snapshot', () => {
            expect(componentShallow).toMatchSnapshot();
        });
        it('renders email input, password input and button type submit', () => {
            expect(componentShallow.find('input[name="email"]')).toBeTruthy();
            expect(componentShallow.find('input[name="password"]')).toBeTruthy();
            expect(componentShallow.find('button[type="submit"]')).toBeTruthy();
        });
        it('login check with right data', () => {
            textField.props().onChange({
                target: { name: 'email', value: formValues.email }
            });
            textField.props().onChange({
                target: { name: 'password', value: formValues.password }
            });
            // button.props().onClick(mockLogout);
        });
    });
});
