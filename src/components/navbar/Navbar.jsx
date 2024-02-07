import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    };
    fatchCustomer();
  }, [customer, id]);

  // Logout
  const logout = () => {
    localStorage.removeItem("cToken");
    localStorage.removeItem("cID");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <div></div>
        <div className="icons">
          <Link to="/contacts">
            <div className="notification">
              <i className="ri-mail-line"></i>
            </div>
          </Link>
          <Link to="/profile">
            <div className="user">
              {customer.thumb ? (
                <img
                  src={
                    process.env.REACT_APP_SERVER +
                    "/customers/" +
                    customer.thumb
                  }
                  alt={customer.name}
                />
              ) : (
                <img src="/img/placeholder.png" alt={customer.name} />
              )}
              <span>{customer.name}</span>
            </div>
          </Link>
          <i className="ri-logout-circle-r-line" onClick={() => logout()}></i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
