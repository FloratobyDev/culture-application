import { FormEvent, useState } from "react";
import { signIn } from "aws-amplify/auth";

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

type Props = {
  setHasAuthenticated: (value: boolean) => void;
};

function Login({ setHasAuthenticated }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    value: false,
    message: "",
  });

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();
    if (!email && !password) {
      setError({
        value: true,
        message: "Please enter your email and password",
      });
      return;
    } else if (!email) {
      setError({
        value: true,
        message: "Please enter your email",
      });
      return;
    } else if (!password) {
      setError({
        value: true,
        message: "Please enter your password",
      });
      return;
    }

    signIn({
      username: email,
      password: password,
    })
      .then(() => {
        setHasAuthenticated(true);
      })
      .catch((error) => {
        console.log("Error signing in", error);
      });
  }

  function handleChange(callback: (value: string) => void) {
    return (e: FormEvent<HTMLInputElement>) => {
      callback(e.currentTarget.value);
      setError({
        value: false,
        message: "",
      });
    };
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
      <label className="flex items-center gap-2 border border-secondary rounded-4 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="outline-none bg-transparent"
          placeholder="Email"
          value={email}
          onChange={handleChange(setEmail)}
        />
      </label>
      <label className="flex items-center gap-2 border border-secondary rounded-4 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="outline-none bg-transparent"
          value={password}
          placeholder="Password"
          onChange={handleChange(setPassword)}
        />
      </label>
      {error.value && <p className="text-error">{error.message}</p>}
      <button
        type="submit"
        className="flex items-center gap-2 border border-secondary rounded-4 p-2 text-center hover:bg-secondary"
      >
        <span className="w-full">Log in</span>
      </button>
    </form>
  );
}

export default Login;
