import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../../../../hooks";
import EditCustomer from "../../../Profile/Customer/EditCustomer/EditCustomer";
import EditProvider from "../../../Profile/Provider/EditProvider/EditProvider";
import { Link } from "react-router-dom";
import "./EditProfile.css";

export default function EditProfile() {
  const isProvider = useAppSelector((s) => s.user.isProvider);

  return (
    <div className="app-body-component">
      <h1>Edit</h1>
      {isProvider ? <EditProvider /> : <EditCustomer />}
    </div>
  );
}
