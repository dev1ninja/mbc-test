import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from '@material-ui/core';
import Register from './Register';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({ push: jest.fn() })
}));
describe('Register component', () => {
    const formValues = {
        email: 'test@test.com',
        password: 'Admin123',
        confirmPassword: 'Admin123'
    };

    const componentShallow = shallow(<Register {...formValues} />);
    const textField = componentShallow.find(TextField);

    describe('Component Snapshot', () => {
        it('should match stored snapshot', () => {
            expect(componentShallow).toMatchSnapshot();
        });
        it('renders email input, password input and button type submit', () => {
            expect(componentShallow.find('input[name="email"]')).toBeTruthy();
            expect(componentShallow.find('input[name="password"]')).toBeTruthy();
            expect(componentShallow.find('input[name="confirmPassword"]')).toBeTruthy();
            expect(componentShallow.find('button[type="submit"]')).toBeTruthy();
        });
        it('Register check with right data', () => {
            textField.props().onChange({
                target: { name: 'email', value: formValues.email }
            });
            textField.props().onChange({
                target: { name: 'password', value: formValues.password }
            });
            textField.props().onChange({
                target: { name: 'confirmPassword', value: formValues.confirmPassword }
            });
        });
    });
});
