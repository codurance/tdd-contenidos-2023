import {PasswordForm} from "./PasswordForm";
import {rest} from "msw";
import {setupServer} from "msw/node";

const { render, screen, act } = require("@testing-library/react");
const { default: userEvent } = require("@testing-library/user-event");
const { useState } = require("react");

const passwordWithoutNumbers = 'notvalidpassword';
const validPassword = 'validPassword1';

const shortPassword = 'notv';
const passwordWithoutNumbersMessage = 'The password should contain numbers';
const passwordWithLengthLowerThanRequiredMessage = 'The password should have length of 8';

function secretsEndpointFake() {
    return rest.post('http://localhost:9999/secrets', async (req, res, context) => {
        context.status(200);
        return res(context);
    });
}

describe('Password validator form', () => {

    beforeEach(() => {
        setupServer(secretsEndpointFake()).listen()
    })

    it('Should render password input', () => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');

        expect(passwordInput).toBeInTheDocument();
    });

    it('Should render button to save', () => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('button');

        expect(passwordInput).toBeInTheDocument();
    });

    it('Should not show validation message when save button is not hit', () => {
        render(<PasswordForm />);

        const errorMessage = screen.queryByText(passwordWithoutNumbersMessage);

        expect(errorMessage).not.toBeInTheDocument();
    });

    it('Should show validation error when password does not contain numbers', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, passwordWithoutNumbers);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);
        });

        screen.getByText(passwordWithoutNumbersMessage);
    });

    it('Should clear previous validation error when current password is valid', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, passwordWithoutNumbers);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);

            userEvent.clear(passwordInput);
            userEvent.type(passwordInput, validPassword);
            userEvent.click(saveButton);
        });

        expect(screen.queryByText(passwordWithoutNumbersMessage)).not.toBeInTheDocument();
    });

    it('Should show validation error when password length is lower than 8', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, shortPassword);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);
        });

        screen.getByText(passwordWithLengthLowerThanRequiredMessage);
    });

    it('Should clear previous validation error of not required length when current password is valid', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, shortPassword);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);

            userEvent.clear(passwordInput);
            userEvent.type(passwordInput, validPassword);
            userEvent.click(saveButton);
        });

        expect(screen.queryByText(passwordWithLengthLowerThanRequiredMessage)).not.toBeInTheDocument();
    });

    it('Should not show validation error when password contains numbers and length is higher than 8', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, 'validpass1');
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);
        });

        expect(screen.queryByText(passwordWithLengthLowerThanRequiredMessage)).not.toBeInTheDocument();
        expect(screen.queryByText(passwordWithoutNumbersMessage)).not.toBeInTheDocument();
    });

    it('Should show valid passwords', () => {

        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, validPassword);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);
        });

        expect(screen.getByText(validPassword)).toBeInTheDocument();
    });

    it('Should show previous valid password plus new valid password', () => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, validPassword);
            const saveButton = screen.getByRole('button');
            userEvent.click(saveButton);

            userEvent.clear(passwordInput);
            userEvent.type(passwordInput, 'anothervalidpass2');
            userEvent.click(saveButton);
        });

        expect(screen.getByText(validPassword)).toBeInTheDocument();
        expect(screen.getByText('anothervalidpass2')).toBeInTheDocument();
    });
});

