import {useEffect, useState} from "react";

function PasswordWithoutNumbersMessage({passwordWithoutNumbers}) {
    if (!passwordWithoutNumbers) {
        return null;
    }

    return <li>The password should contain numbers</li>;
}

function PasswordWithoutRequiredLength({invalidPasswordLength}) {
    if (!invalidPasswordLength) {
        return null;
    }

    return <li>The password should have length of 8</li>;
}

function ValidationMessages({passwordWithoutNumbers, invalidPasswordLength}) {
    return <ul>
        <PasswordWithoutNumbersMessage passwordWithoutNumbers={passwordWithoutNumbers}/>
        <PasswordWithoutRequiredLength invalidPasswordLength={invalidPasswordLength}/>
    </ul>;
}

function ValidPasswordsSection({validPasswords}) {
    return <section>
        <h3>Valid Password saved:</h3>
        <ul>
            {
                validPasswords.map(validPassword => <li key={validPassword}>{validPassword}</li>)
            }
        </ul>
    </section>;
}

async function doStuff(validPassword) {
    const response = await fetch('http://localhost:9999/secrets', {
        body: {
            'password': validPassword
        },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.status;
}

export function PasswordForm() {
    const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
    const [passwordWithoutNumbers, setPasswordWithoutNumbers] = useState(false);
    const [validPasswords, setValidPasswords] = useState([]);
    const [password, setPassword] = useState('');

    return (
        <>
            <input type='text' value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <input type='submit' onClick={validatePassword}></input>
            <ValidationMessages passwordWithoutNumbers={passwordWithoutNumbers}
                                invalidPasswordLength={invalidPasswordLength}/>
            <ValidPasswordsSection validPasswords={validPasswords} />
        </>
    );

    async function validatePassword() {
        let validPassword = true;
        if (password.length < 8) {
            setInvalidPasswordLength(true);
            validPassword = false;
        }

        if (!/.*\d.*/.test(password)) {
            setPasswordWithoutNumbers(true)
            validPassword = false;
        }

        if (validPassword) {
            setPasswordWithoutNumbers(false);
            setInvalidPasswordLength(false);
            setValidPasswords([...validPasswords, password]);
        }
    }
}
