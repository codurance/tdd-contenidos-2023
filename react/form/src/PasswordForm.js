import {useState} from "react";

function lengthOfPasswordIsLowerThan8(password) {
    return password.length < 8;
}

function doesPasswordContainNumber(password) {
    return password.split('')
        .some(character => !isNaN(Number(character)));
}

function validate(password) {
    const validations = [];

    if (lengthOfPasswordIsLowerThan8(password)) {
        validations.push('La contraseña tiene menos de 8 caracteres');
    }

    if (!doesPasswordContainNumber(password)) {
        validations.push('La contraseña no tiene números');
    }
    return validations;
}

export function PasswordForm() {
    const [password, setPassword] = useState('');
    const [validationMessages, setValidationMessages] = useState([]);

    function validatePassword(event) {
        event.preventDefault();
        setValidationMessages(validate(password));
    }

    return (
        <>
            <form className='password-form' onSubmit={validatePassword}>
                <input type='text' className='password-form__input' value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
                <button className='password-form__button' type='submit'>Validar</button>
            </form>
            <ul>
                {validationMessages.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}
            </ul>
        </>);
}
