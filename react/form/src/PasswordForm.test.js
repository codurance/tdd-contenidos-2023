/* eslint-disable testing-library/no-unnecessary-act */
import {act, render, screen} from "@testing-library/react";
import {PasswordForm} from "./PasswordForm";
import userEvent from "@testing-library/user-event";

describe('Password Form', () => {
    it('Should render password input', () => {
        render(<PasswordForm/>);

        screen.getByRole('textbox');
    });

    it('Should render a button', () => {
        render(<PasswordForm/>);

        screen.getByRole('button');
    });

    it('Should have expected text in the button', () => {
        render(<PasswordForm />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('Validar');
    });

    it.each([
        ['short1'],
        ['1'],
        ['1234567'],
        ['abcdef1']
    ])('Should render invalid password when password length is lower than 8 characters', (password) => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, password);
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        screen.getByText('La contraseña tiene menos de 8 caracteres');
    });

    it.each([
        ['longPassword'],
        ['longPasswordLonger'],
        ['longPasswordLongest'],
        ['longPasswordRealLong']
    ])('Should render invalid password when password does not contain any number', (password) => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, password);
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        screen.getByText('La contraseña no tiene números');
    });

    it('Should show invalid password due to length lower than 8 and does not contain number', () => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, 'short');
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        screen.getByText('La contraseña tiene menos de 8 caracteres');
        screen.getByText('La contraseña no tiene números');
    });

    it('Should show valid password when a valid password has been submit', () => {
        render(<PasswordForm />);

        act(() => {
            const passwordInput = screen.getByRole('textbox');
            userEvent.type(passwordInput, 'validPassword1');
            const validateButton = screen.getByRole('button');
            userEvent.click(validateButton);
        });

        screen.getByText('validPassword1');
    });

    it('Should show all validated password filled in by the user', () => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        const validateButton = screen.getByRole('button');

        act(() => {
            userEvent.type(passwordInput, 'validPassword1');
            userEvent.click(validateButton);
            userEvent.clear(passwordInput);
        });
        act(() => {
            userEvent.type(passwordInput, 'validPassword2');
            userEvent.click(validateButton);
        });

        screen.getByText('validPassword1');
        screen.getByText('validPassword2');
    });
})
