import { useState } from "react";
import "./styles.css";

function PasswordWithoutNumbersMessage({ passwordWithoutNumbers }) {
  if (!passwordWithoutNumbers) {
    return null;
  }

  return <li>The password should contain numbers</li>;
}

function PasswordWithoutRequiredLength({ invalidPasswordLength }) {
  if (!invalidPasswordLength) {
    return null;
  }

  return <li>The password should have length of 8</li>;
}

function ValidationMessages({ passwordWithoutNumbers, invalidPasswordLength }) {
  return (
    <ul className="validation-messages-list">
      <PasswordWithoutNumbersMessage
        passwordWithoutNumbers={passwordWithoutNumbers}
      />
      <PasswordWithoutRequiredLength
        invalidPasswordLength={invalidPasswordLength}
      />
    </ul>
  );
}

function ValidPasswordsSection({ validPasswords }) {
  return (
    <section className="validated-password-list">
      <h3 className="validated-password-list__header">
        Listado de contraseñas validadas
      </h3>
      <ul className="validated-password-list__list">
        {validPasswords.map((validPassword) => (
          <li
            className="validated-password-list__list-element"
            key={validPassword}
          >
            {validPassword}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PasswordForm() {
  const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
  const [passwordWithoutNumbers, setPasswordWithoutNumbers] = useState(false);
  const [validPasswords, setValidPasswords] = useState([]);
  const [password, setPassword] = useState("");

  return (
    <main>
      <form className="password-form" onSubmit={(event) => event.preventDefault()}>
        <input
          className="password-form__input"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          className="password-form__button"
          type="submit"
          onClick={validatePassword}
        ></input>
      </form>
      <ValidationMessages
        passwordWithoutNumbers={passwordWithoutNumbers}
        invalidPasswordLength={invalidPasswordLength}
      />
      <ValidPasswordsSection validPasswords={validPasswords} />
    </main>
  );

  async function validatePassword() {
    let validPassword = true;
    if (password.length < 8) {
      setInvalidPasswordLength(true);
      validPassword = false;
    }

    if (!/.*\d.*/.test(password)) {
      setPasswordWithoutNumbers(true);
      validPassword = false;
    }

    if (validPassword) {
      setPasswordWithoutNumbers(false);
      setInvalidPasswordLength(false);
      setValidPasswords([...validPasswords, password]);
    }
  }
}
