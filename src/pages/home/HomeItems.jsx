import { Alert, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const HomeItems = () => {
  const [parcels, setParcels] = useState({});
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(false);

  // Get current logged customer
  const id = localStorage.getItem("cID");
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`,
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
  }, [customer, id]);

  // GEL PARCELS
  useEffect(() => {
    const fatchParcels = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels",
        {
          headers: {
            Authorization: localStorage.getItem("cToken"),
          },
        }
      );
      const newParcels = data.filter((curData) => {
        return curData.customerID === id;
      });
      setParcels(newParcels);
    };
    fatchParcels();
  }, [parcels, id]);

  // GEL CONTACTS
  useEffect(() => {
    const fatchContacts = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/contacts",
        {
          headers: {
            Authorization: localStorage.getItem("cToken"),
          },
        }
      );
      const newContacts = data.filter((curData) => {
        return curData.customerID === id;
      });
      setContacts(newContacts);
    };
    fatchContacts();
  }, [contacts, id]);

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
            timer: 1500,
          }).then(() => (window.location.href = "/profile/email-verification"));
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
      {customer.emailVerification === false && (
        <>
          {otpLoading ? (
            <Loader />
          ) : (
            <Alert severity="warning" className="otpLink">
              <Link to="/profile/email-verification" onClick={otpSender}>
                Please, complete your email varification. Click for OTP
              </Link>
            </Alert>
          )}
        </>
      )}

      {loading ? (
        <div className="dashboardItems">
          <Link to="/profile">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Hi, welcome!</h4>
                <span>{customer.name}</span>
              </div>
              <span className="itemIcon">
                {customer.thumb ? (
                  <Avatar
                    alt={customer.name}
                    src={
                      process.env.REACT_APP_SERVER +
                      "/customers/" +
                      customer.thumb
                    }
                  />
                ) : (
                  <Avatar alt={customer.name} src="/img/placeholder.png" />
                )}
              </span>
            </div>
          </Link>
          <Link to="/parcels">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Parcel</h4>
                <span>{parcels.length}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-truck-line"></i>
              </span>
            </div>
          </Link>
          <Link to="/contacts">
            <div className="singleItem">
              <div className="itemContent">
                <h4>Total Message</h4>
                <span>{contacts.length}+</span>
              </div>
              <span className="itemIcon">
                <i className="ri-mail-line"></i>
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeItems;
