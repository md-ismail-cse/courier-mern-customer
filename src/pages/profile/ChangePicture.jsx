// import "./profile.css";
import { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import { Avatar, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const ChangePicture = () => {
  const [currentThumb, setThumb] = useState("");
  const [loading, setLoading] = useState(false);

  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`
      );
      setThumb(data.thumb);
      setLoading(true);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/api/admin/customers/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/profile"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className="changePicture">
        <Title title="Change Profile Picture" />
        <div className="content">
          <div className="form-box">
            {loading ? (
              <form className="form" onSubmit={submitHandler}>
                {file ? (
                  <Avatar alt="" src={file} />
                ) : (
                  <Avatar
                    src={
                      process.env.REACT_APP_SERVER +
                      "/customers/" +
                      currentThumb
                    }
                    alt=""
                  />
                )}
                <TextField
                  required
                  fullWidth
                  type="file"
                  id="thumb"
                  onChange={handleThumbChange}
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

export default ChangePicture;
