import { useState } from "react";
import useInput from "../hooks/useInput";
import { validateEmail } from "../hooks/validateEmail";
import { Input, Button } from "../components";
import Wrapper from "../style/styled/Login.styled";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInput("Please enter a valid email", setError, validateEmail);

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useInput("Please enter your password", setError);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || validateEmail(email) || !password) {
      setIsLoading(false);
      setError(true);
      handleEmailBlur();
      handlePasswordBlur();
      return;
    } else {
      setError(false);
      localStorage.setItem("userData", JSON.stringify({ email, password }));

      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div>
          <Wrapper>
            <div className="container">
              <div className="login-container">
                <form onSubmit={onSubmit} className="form">
                  <Input
                    handleInput={handleEmailChange}
                    name="Email"
                    type="Email"
                    label="Email"
                    message={emailError.message}
                    error={emailError.isError}
                  ></Input>

                  <Input
                    handleInput={handlePasswordChange}
                    name="Password"
                    type="Password"
                    label="Password"
                    message={passwordError.message}
                    error={passwordError.isError}
                  ></Input>
                  <Button
                    type="submit"
                    className="login-button"
                    label="Log In"
                    isLoading={isLoading}
                    error={error}
                  ></Button>
                </form>
              </div>
            </div>
          </Wrapper>
        </div>
      </header>
    </div>
  );
};

export default Login;
