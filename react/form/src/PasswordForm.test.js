import {render, screen} from "@testing-library/react";
import {PasswordForm} from "./PasswordForm";

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
})
