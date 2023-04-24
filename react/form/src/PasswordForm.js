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
    const [validPasswords, setValidPasswords] = useState([]);

    function validatePassword(event) {
        event.preventDefault();
        const validationErrors = validate(password);
        setValidationMessages(validationErrors);

        if (validationErrors.length === 0) {
            setValidPasswords([...validPasswords, password]);
        }
    }

    return (
        <>
            <form className='password-form' onSubmit={validatePassword}>
                <input type='text' className='password-form__input' value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
                <button className='password-form__button' type='submit'>Validar</button>
            </form>
            <ul className='validation-messages-list'>
                {validationMessages.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}
            </ul>
            <ul className='validated-password-list__list'>
                {validPasswords.map((password, index) => <li key={`${password}-${index}`} className='validated-password-list__list-element'>{password}</li>)}
            </ul>
        </>);
}
