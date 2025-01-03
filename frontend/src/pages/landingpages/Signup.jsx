import signupStyle from "./cssModules/signup.module.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authUser";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { signup } = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (password !== confirmPassword) {
      return; // Prevent form submission if passwords do not match
    }

    signup({ username, email, password });
  };

  return (
    <>
    <Link to= "/">
      <div className={signupStyle.backbutton}>
         <img src="/arrow_back.png" alt="Back" />
      </div>
      </Link>

      <div className={signupStyle.formcontainer}>
        <img src="/triangle2.png" alt="Decorative" />
        <img src="/ellipse1.png" alt="Decorative" />
        <img src="/ellipse2.png" alt="Decorative" />
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter a username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter an email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="******"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              style={{
                color:
                  isSubmitted && password !== confirmPassword ? "red" : "inherit",
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="******"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                borderColor:
                  isSubmitted && password !== confirmPassword
                    ? "red"
                    : "#FFFFFF80",
                boxShadow:
                  isSubmitted && password !== confirmPassword
                    ? "0 0 5px red"
                    : "0px 4px 10px 0px #00000040",
              }}
            />
            {isSubmitted && password !== confirmPassword && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                Enter the same password in both fields.
              </p>
            )}
          </div>

          <button type="submit">Signup</button>
          <div className={signupStyle.para}>
            <p>Already have an account?</p>
            <Link to="/login">
              <a>Login</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
