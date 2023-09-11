import { Link, Navigate, Route, Routes } from "react-router-dom";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ProviderProfile from "../../Profile/Provider/ProviderProfile/ProviderProfile";
import DeleteAccount from "./DeleteAccount";
import { useAppSelector } from "../../../hooks";
import { isLogon } from "../../../Services/user";
import CustomerProfile from "../../Profile/Customer/CustomerProfile";
import "../Profile.css";

export const Profile = () => {
  const userId = useAppSelector((s) => s.user.user.userId);
  const isProvider = useAppSelector((s) => s.user.isProvider);

  return isLogon(userId) ? (
    <>
      <div>
        {isProvider ? <ProviderProfile /> : <CustomerProfile />}
        <div>
          <Link className="nav-item-link" to="/Profile/Edit">
            Edit
          </Link>
          <Link className="nav-item-link" to="/Profile/ChangeEmail">
            Change Email
          </Link>
          <Link className="nav-item-link" to="/Profile/ChangePassword">
            Change Password
          </Link>
          <Link className="nav-item-link" to="/Profile/Delete">
            Delete account
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/ChangeEmail" element={<ChangeEmail />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/Delete" element={<DeleteAccount />} />
      </Routes>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};
