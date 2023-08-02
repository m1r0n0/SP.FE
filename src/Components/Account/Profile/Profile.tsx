import { Link, Navigate, Route, Routes } from "react-router-dom";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ProviderProfile from "../../Provider/Profile/ProviderProfile/ProviderProfile";
import DeleteAccount from "./DeleteAccount";
import { useAppSelector } from "../../../hooks";
import { isLogon } from "../../../Services/user";
import CustomerProfile from "../../Customer/Profile/CustomerProfile";

export const Profile = () => {
  const userId = useAppSelector((s) => s.user.user.userId);
  const isProvider = useAppSelector((s) => s.user.isProvider);

  return isLogon(userId) ? (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {isProvider ? <ProviderProfile /> : <CustomerProfile />}
        <div>
          <Link to="/Profile/ChangeEmail">Change Email</Link>
        </div>
        <div>
          <Link to="/Profile/ChangePassword">Change Password</Link>
        </div>
        <div>
          <Link to="/Profile/Delete">Delete account</Link>
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
