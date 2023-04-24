import {useState} from "react";

function lengthOfPasswordIsLowerThan8(password) {
    return password.length < 8;
}

function doesPasswordContainNumber(password) {
    return password.split('')
        .some(character => !isNaN(Number(character)));
}

export function PasswordForm() {
    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordNotContainsNumber, setPasswordNotContainsNumber] = useState(false);

    function validatePassword(event) {
        event.preventDefault();

        if (lengthOfPasswordIsLowerThan8(password)) {
            setIsPasswordShort(true);
        }

        if (!doesPasswordContainNumber(password)) {
            setPasswordNotContainsNumber(true);
        }

    }

    return (
        <>
            <form className='password-form' onSubmit={validatePassword}>
                <input type='text' className='password-form__input' value={password} onChange={(event) => setPassword(event.target.value)}/>
                <button className='password-form__button' type='submit'>Validar</button>
            </form>
            {isPasswordShort ? <span>La contraseña tiene menos de 8 caracteres</span> : null}
            {passwordNotContainsNumber ? <span>La contraseña no tiene números</span> : null}
        </>);
}
