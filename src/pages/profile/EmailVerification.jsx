import { Alert, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");

  // Get customer details
  const customerID = localStorage.getItem("cID");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${customerID}`,
        {
          headers: {
            Authorization: localStorage.getItem("cToken"),
          },
        }
      );
      setCustomer(data);
      setLoading(true);
    };
    fatchCustomer();
  }, [customer, customerID]);

  // OTP sender
  const id = localStorage.getItem("cID");

  const [otpLoading, setOtpLoading] = useState(false);
  const otpSender = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    let data = {
      id,
    };
    axios
      .put(process.env.REACT_APP_SERVER + "/api/customer-email-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("cToken"),
        },
      })
      .then((response) => {
        setOtpLoading(false);
        if (response.data.message === "OTP has been send to your email!") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    let data = {
      id,
      otp,
    };
    axios
      .put(process.env.REACT_APP_SERVER + "/api/customer-email-otp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("cToken"),
        },
      })
      .then((response) => {
        setOtpLoading(false);
        if (response.data.message === "Email verification successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  return (
    <>
      <div className="addContact">
        <Title title="Email Verification" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <>
                {customer.emailVerification === false ? (
                  <form className="form">
                    <TextField
                      required
                      fullWidth
                      label="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <input
                      type="submit"
                      className="btnPrimary"
                      onClick={otpSubmit}
                    />
                    {otpLoading ? (
                      <Loader />
                    ) : (
                      <Link className="btnPrimary" onClick={otpSender}>
                        Re-sent
                      </Link>
                    )}
                  </form>
                ) : (
                  <Alert severity="success">Email already verified</Alert>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
