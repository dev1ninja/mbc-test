import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import PersonalDemographics from './PersonalDemographics';

// const newHistory = createBrowserHistory();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({ push: jest.fn() })
}));
describe('PersonalDemographics component', () => {
    const formValues = {
        firstName: 'test',
        lastName: 'incard',
        dob: '09/11/1994',
        Postcode: '+44'
    };

    const componentShallow = shallow(<PersonalDemographics history={ReactRouterPropTypes} {...formValues} />);
    const textField = componentShallow.find(TextField).first();

    describe('Component Snapshot', () => {
        it('should match stored snapshot', () => {
            expect(componentShallow).toMatchSnapshot();
        });
        it('renders email input, password input and button type submit', () => {
            expect(componentShallow.find('input[name="firstName"]')).toBeTruthy();
            expect(componentShallow.find('input[name="lastName"]')).toBeTruthy();
            expect(componentShallow.find('input[name="dob"]')).toBeTruthy();
            expect(componentShallow.find('button[type="submit"]')).toBeTruthy();
        });
        it('PersonalDemographics check with right data', () => {
            textField.props().onChange({
                target: { name: 'firstName', value: formValues.firstName }
            });
            textField.props().onChange({
                target: { name: 'lastName', value: formValues.lastName }
            });
            textField.props().onChange({
                target: { name: 'dob', value: formValues.dob }
            });
        });
    });
});
