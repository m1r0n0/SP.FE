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
  const providerName = useAppSelector(
    (state) => state.provider.provider.firstName
  );
  const customerName = useAppSelector(
    (state) => state.customer.customer.firstName
  );

  return (
    <nav className="navbar">
      <div className="nav-items">
        <div className="nav-items-block">
          <Link to="/" className="navbar-brand">
            Service Provider
          </Link>
          {isLogon(String(userId)) ? (
          <ul className="nav-items-block">
            <li>
              <Link className="nav-item-link" to="/Services">
                {isProvider ? "My services" : "Services"}
              </Link>
            </li>
            {isProvider ? (
              <li>
                <Link className="nav-item-link" to="/Service/Create">
                  Create Service
                </Link>
              </li>
            ) : null}
            <li>
              <Link className="nav-item-link" to="/History">
                {isProvider ? "Calendar" : "History"}
              </Link>
            </li>
          </ul>
          ) : null}
        </div>
        <div className="nav-items-block">
          <ul className="nav-items-block">
            <li className="username">
              {isLogon(String(userId)) ? (
                <Link to="/Profile" className="nav-item username">
                  {isProvider ? <>{providerName}</> : <>{customerName}</>}
                </Link>
              ) : (
                <Link to="/Login" className="nav-item-link">
                  Login
                </Link>
              )}
            </li>
            <li>
              {isLogon(String(userId)) ? (
                <Link to="/">
                  <input
                    className="btn nav-item"
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
