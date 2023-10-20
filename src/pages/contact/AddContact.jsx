import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const AddContact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Get customer details
  const customerID = localStorage.getItem("cID");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${customerID}`
      );
      setCustomer(data);
      setLoading(true);
    };
    fatchCustomer();
  }, [customer, customerID]);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      customerID,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      subject,
      message,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/contacts", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Message sent.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/contacts"));
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
          text: "Something wrong!",
        });
      });
  };

  return (
    <>
      <div className="addContact">
        <Title title="Add Contact" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <form className="form" onSubmit={submitHandler}>
                <TextField
                  required
                  fullWidth
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <input type="submit" className="btnPrimary" />
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContact;
