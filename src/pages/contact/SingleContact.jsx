import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const SingleContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const [laoding, setLoading] = useState(false);
  // Get contact details
  useEffect(() => {
    const fatchContact = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/contacts/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("cToken"),
          },
        }
      );
      setContact(data);
      setLoading(true);
    };
    fatchContact();
  }, []);

  // Contact delete
  const deleteHandler = (e) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_SERVER + `/api/admin/contacts/${id}`, {
            headers: {
              Authorization: localStorage.getItem("cToken"),
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Message deleted!",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/contacts"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Contact delete field!",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="singleContact">
        <Title title="View Contact" />
        <div className="content">
          {laoding ? (
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>Subject:</th>
                    <td>{contact.subject}</td>
                  </tr>
                  <tr>
                    <th>Message:</th>
                    <td>{contact.message}</td>
                  </tr>
                  <tr>
                    <th>Date:</th>
                    <td>{new Date(contact.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteHandler(id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
