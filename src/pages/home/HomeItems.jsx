import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`
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
        process.env.REACT_APP_SERVER + "/api/admin/parcels"
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
        process.env.REACT_APP_SERVER + "/api/admin/contacts"
      );
      const newContacts = data.filter((curData) => {
        return curData.customerID === id;
      });
      setContacts(newContacts);
    };
    fatchContacts();
  }, [contacts, id]);

  return (
    <>
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
