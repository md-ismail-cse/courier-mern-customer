import { Button } from "@mui/material";
import Title from "../../components/title/Title";
import ContactTable from "./ContactTable";

const Contact = () => {
  return (
    <div>
      <div className="contact">
        <Title title="Contact" />
        <div className="content">
          <Button
            href="/add-contact"
            className="addNewButton"
            variant="contained"
            size="small"
          >
            Add contact
          </Button>
          <ContactTable />
        </div>
      </div>
    </div>
  );
};

export default Contact;
