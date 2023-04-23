import {useState} from "react";

function containsNumberThis(word) {
    return word.split('').some(character => !isNaN(Number(character)));
}

export function PasswordForm() {

    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [passwordNotContainsNumber, setPasswordNotContainsNumber] = useState(false);

    function validateLengthOf(password) {
        if(password.length < 8) {
            setIsPasswordShort(true);
        }
    }

    function validateDoesNotContainsNumberThis(password) {

        if(containsNumberThis(password)) {
            return;
        }

        setPasswordNotContainsNumber(true);
    }

    function validatePassword(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get('password');
        validateLengthOf(password);
        validateDoesNotContainsNumberThis(password);
    }

    return (
        <>
            <form className='password-form' onSubmit={validatePassword}>
                <input type='text' className='password-form__input' name='password' defaultValue=''/>
                <button type='submit' className='password-form__button'>Validar</button>
            </form>
            {
                isPasswordShort ? <span>La contraseña debe tener al menos una longitud de 8 caracteres</span> : null
            }
            {
                passwordNotContainsNumber ? <span>La contraseña debe contener al menos un número</span> : null
            }
        </>
    );
}
