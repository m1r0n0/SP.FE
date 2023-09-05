import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { isLogon } from "../../../Services/user";
import "./TopMenu.css";
import { proceedLogOut } from "../../../Services";

export function TopMenu() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const userEmail = useAppSelector((state) => state.user.user.userEmail);
  const isProvider = useAppSelector((state) => state.user.isProvider);

  return (
    <nav className="navbar">
      <div className="nav-items">
        <div>
          <Link to="/" className="navbar-brand">
            Service Provider
          </Link>
        </div>
        <div className="">
          <ul className="nav-items-block">
            <li className="">
              {isLogon(String(userId)) ? (
                <Link to="/Profile">
                  <p className="username"> {userEmail} </p>
                </Link>
              ) : (
                <Link to="/Login" className="nav-item-link">
                  Login
                </Link>
              )}
            </li>
            <li className="">
              {isLogon(String(userId)) ? (
                <Link to="/">
                  <input
                    className=""
                    type="submit"
                    value="Logout"
                    onClick={() => dispatch(proceedLogOut())}
                  />
                </Link>
              ) : (
                <Link to="/Register" className="nav-item-link">
                  Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
