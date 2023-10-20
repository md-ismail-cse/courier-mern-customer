import { Avatar, Button } from "@mui/material";
import Title from "../../components/title/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Profile = () => {
  // Get current logged customer
  const id = localStorage.getItem("cID");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      <div className="profile">
        <Title title="Profile" />
        <div className="content">
          <div className="profileBox">
            {loading ? (
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>
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
                        <Avatar
                          alt={customer.name}
                          src="/img/placeholder.png"
                        />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>{customer.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{customer.email}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{customer.phone}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>{customer.address}</td>
                  </tr>
                  <tr>
                    <th>Joinging Date:</th>
                    <td>{new Date(customer.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Button
                        href="/profile/edit-details"
                        variant="contained"
                        size="small"
                      >
                        Edit Details
                      </Button>
                      <Button
                        href="/profile/change-picture"
                        variant="contained"
                        size="small"
                      >
                        Change Picture
                      </Button>
                      <Button
                        href="/profile/change-password"
                        variant="contained"
                        size="small"
                      >
                        Change Password
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
