import { Button } from "@mui/material";
import Title from "../../components/title/Title";
import ParcelTable from "./ParcelTable";

const Parcels = () => {
  return (
    <>
      <div className="parcels">
        <Title title="Parcels" />
        <div className="content">
          <Button
            href="/add-parcel"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add parcel
          </Button>
          <ParcelTable />
        </div>
      </div>
    </>
  );
};

export default Parcels;
