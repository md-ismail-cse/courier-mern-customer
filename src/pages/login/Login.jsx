import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/title/Title";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/customerlogin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((user) => {
        if (user.data.message === "Email doesn't exist!") {
          setMessage(user.data.message);
        } else if (user.data.message === "Password doesn't match!") {
          setMessage(user.data.message);
        } else {
          // Set token
          localStorage.setItem("cToken", user.data.token);
          localStorage.setItem("cID", user.data.id);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setMessage("Something wrong.");
      });
  };

  return (
    <>
      <div className="login">
        <div className="loginBg">
          <div className="loginInner">
            <Title title="Login" />
            <div className="content">
              <div className="form-box">
                <img src="/img/placeholder.png" alt="" />
                {message && <p className="error-message">{message}</p>}
                <form className="form" onSubmit={submitHandler}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormControl
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <i className="ri-eye-off-fill"></i>
                            ) : (
                              <i className="ri-eye-fill"></i>
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <input
                    type="submit"
                    value="LOGIN"
                    className="btnPrimary"
                    value="Login"
                  />
                </form>
                <Link to="/signup">Registration?</Link>
                <Link to="https://courier-rider.onrender.com/" target="_blank">
                  Rider?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
