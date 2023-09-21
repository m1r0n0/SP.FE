import { Link, Navigate, Route, Routes } from "react-router-dom";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ProviderProfile from "../../Profile/Provider/ProviderProfile/ProviderProfile";
import DeleteAccount from "./DeleteAccount";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isLogon } from "../../../Services/user";
import CustomerProfile from "../../Profile/Customer/CustomerProfile";
import "../Profile.css";
import { hideAllDisclaimersAction } from "../../../Store/DisclaimerReducer";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.user.user.userId);
  const isProvider = useAppSelector((s) => s.user.isProvider);
  const isRegistered = useAppSelector((s) => s.user.isRegistered);

  return isLogon(userId) ? (
    isRegistered ? (
      <>
        <div>
          {isProvider ? <ProviderProfile /> : <CustomerProfile />}
          <div>
            <Link className="nav-item-link" to="/Profile/Edit">
              Edit
            </Link>
            <Link
              className="nav-item-link"
              to="/Profile/ChangeEmail"
              onClick={() => dispatch(hideAllDisclaimersAction())}
            >
              Change Email
            </Link>
            <Link
              className="nav-item-link"
              to="/Profile/ChangePassword"
              onClick={() => dispatch(hideAllDisclaimersAction())}
            >
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
        {/* Register redirection */}
      </>
    ) : isProvider ? (
      <Navigate to={"/Register/Provider"} />
    ) : (
      <Navigate to={"/Register/Customer"} />
    )
  ) : (
    <Navigate to={"/"} />
  );
};
