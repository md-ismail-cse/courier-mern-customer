import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";

const AddParcel = () => {
  const [sendLocation, setSendLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [recName, setRecName] = useState("");
  const [recPhone, setRecPhone] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recAddress, setRecAddress] = useState("");
  const [payment, setPayment] = useState("");

  // GET BRANCHES
  const [branches, setBranches] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchBranches = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/branches"
      );
      setBranches(data);
    };
    fatchBranches();
  }, [branches]);

  // GET PRICES
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    const fatchPrices = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/prices"
      );
      setPrices(data);
    };
    fatchPrices();
  }, [prices]);

  const [parcelPrice, setParcelPrice] = useState(0);
  useEffect(() => {
    const newPrice = prices.filter((curData) => {
      return (
        (curData.sendLocation === sendLocation &&
          curData.endLocation === endLocation) ||
        (curData.sendLocation === endLocation &&
          curData.endLocation === sendLocation)
      );
    });
    setParcelPrice(newPrice[0]);
  }, [sendLocation && endLocation]);

  useEffect(() => {
    if (parcelPrice === 0) {
      setTotalPrice(0);
    } else if (parcelPrice !== undefined) {
      setTotalPrice(parcelPrice.price * weight + 100);
    }
  }, [parcelPrice, sendLocation, endLocation, weight]);

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

  // Categories
  const categories = [
    {
      value: "Solid",
      label: "Solid",
    },
    {
      value: "Glass",
      label: "Glass",
    },
    {
      value: "Liquid",
      label: "Liquid",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      customerID: id,
      customerName: customer.name,
      type,
      weight,
      deliveryCost: 100,
      totalPrice,
      recName,
      recPhone,
      recEmail,
      recAddress,
      sendLocation,
      endLocation,
      payment,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/parcels", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Parcel add successful.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/parcels"));
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
    <div>
      <div className="addParcel">
        <Title title="Add parcel" />
        <div className="content">
          <div className="form-box">
            {laoding ? (
              <form className="form" onSubmit={submitHandler}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Send location"
                  value={sendLocation}
                  onChange={(e) => setSendLocation(e.target.value)}
                >
                  {branches.map((item) => (
                    <MenuItem key={item._id} value={item.branch}>
                      {item.branch}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  label="End location"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                >
                  {branches.map((item) => (
                    <MenuItem key={item._id} value={item.branch}>
                      {item.branch}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  select
                  label="Category"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Parcel price"
                  helperText="Per kilogram..."
                  value={parcelPrice !== undefined ? parcelPrice.price : 0}
                  InputProps={
                    ({
                      readOnly: true,
                    },
                    {
                      startAdornment: (
                        <InputAdornment position="start">৳</InputAdornment>
                      ),
                    })
                  }
                />
                <TextField
                  required
                  fullWidth
                  label="Delivery cost"
                  helperText="Automatic calculate..."
                  value="100"
                  InputProps={
                    ({
                      readOnly: true,
                    },
                    {
                      startAdornment: (
                        <InputAdornment position="start">৳</InputAdornment>
                      ),
                    })
                  }
                />
                <TextField
                  required
                  fullWidth
                  label="Total cost"
                  helperText="Automatic calculate..."
                  value={totalPrice}
                  InputProps={
                    ({
                      readOnly: true,
                    },
                    {
                      startAdornment: (
                        <InputAdornment position="start">৳</InputAdornment>
                      ),
                    })
                  }
                />
                <TextField
                  required
                  fullWidth
                  label="Receiver Name"
                  value={recName}
                  onChange={(e) => setRecName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Receiver Phone"
                  value={recPhone}
                  onChange={(e) => setRecPhone(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Receiver Email"
                  type="email"
                  value={recEmail}
                  onChange={(e) => setRecEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Receiver Address"
                  value={recAddress}
                  onChange={(e) => setRecAddress(e.target.value)}
                />
                <FormControl
                  required
                  fullWidth
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <FormLabel id="payment">Payment</FormLabel>
                  <RadioGroup
                    aria-labelledby="payment"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Paypal"
                      control={<Radio />}
                      label="Paypal"
                    />
                    <FormControlLabel
                      value="Bank Transfer"
                      control={<Radio />}
                      label="Bank Transfer"
                    />
                    <FormControlLabel
                      value="Payoneer"
                      control={<Radio />}
                      label="Payoneer"
                    />
                    <FormControlLabel
                      value="Debit Card"
                      control={<Radio />}
                      label="Debit Card"
                    />
                  </RadioGroup>
                </FormControl>
                <input type="submit" className="btnPrimary" />
              </form>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddParcel;
