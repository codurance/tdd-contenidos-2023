import {render, screen} from "@testing-library/react";
import {PasswordForm} from "./PasswordForm";
import userEvent from "@testing-library/user-event";

describe('Password Form', () => {
    it('Should render an input to fill in the passwords', () => {
        render(<PasswordForm />);

        screen.getByRole('textbox');
    });

    it('Should render an input to validate the passwords', () => {
        render(<PasswordForm />);

        screen.getByRole('button');
    });

    it('Should render expected text inside the button', () => {
        render(<PasswordForm />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('Validar');
    });

    it.each([
        ['short'],
        ['corta'],
        ['abcdefg']
    ])('Should show a message of invalid password when password has less than 8 characters', async (password) => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        await userEvent.type(passwordInput, password);
        const validateButton = screen.getByRole('button');
        await userEvent.click(validateButton);

        screen.getByText('La contraseña debe tener al menos una longitud de 8 caracteres');
    });

    it.each([
        ['passwordWithoutNumbers'],
        ['pass'],
        ['notContainsNumber']
    ])('Should show message of invalid password when password does not contain numbers', async (password) => {
        render(<PasswordForm />);

        const passwordInput = screen.getByRole('textbox');
        await userEvent.type(passwordInput, password);
        const validateButton = screen.getByRole('button');
        await userEvent.click(validateButton);

        screen.getByText('La contraseña debe contener al menos un número');
    });
})
