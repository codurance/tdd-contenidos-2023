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
})
