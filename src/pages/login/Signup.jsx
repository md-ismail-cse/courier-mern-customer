import { useState } from "react";
import Title from "../../components/title/Title";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (localStorage.getItem("cToken")) {
    return (window.location.href = "/");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === conPassword) {
      let data = {
        name,
        email,
        password,
        phone,
        address,
      };
      axios
        .post(process.env.REACT_APP_SERVER + `/api/admin/customers`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((user) => {
          if (user.data.message === "Registration successfull.") {
            // Set token
            localStorage.setItem("cToken", user.data.token);
            localStorage.setItem("cID", user.data.id);
            Swal.fire({
              icon: "success",
              text: user.data.message,
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/"));
          } else if (user.data.message === "User already registered!") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: user.data.message,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something wrong.",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Confirm password doesn't match.",
      });
    }
  };

  return (
    <>
      <div className="login signup">
        <div className="loginBg">
          <div className="loginInner">
            <Title title="Signup" />
            <div className="content">
              <div className="form-box">
                <img src="/img/placeholder.png" alt="" />
                <form className="form" onSubmit={submitHandler}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                      id="outlined-adornment-password1"
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
                  <FormControl
                    required
                    fullWidth
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password2"
                      type={showPassword2 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                          >
                            {showPassword2 ? (
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
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input type="submit" className="btnPrimary" />
                </form>
                <Link to="/">Login?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
