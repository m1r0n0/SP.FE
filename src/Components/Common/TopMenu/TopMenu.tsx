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
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container-fluid d-sm-inline-flex flex-nowrap justify-content-between navitems">
          <div className="d-sm-inline-flex justify-content-between">
            <Link to="/" className="navbar-brand">
              Service Provider
            </Link>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1"></ul>
            </div>
            <div>
              {isLogon(String(userId)) ? (
                <div>
                  <Link className={"navi-link"} to="/Services">
                    {isProvider ? "My services" : "Services"}
                  </Link>
                  {isProvider ? (
                    <Link className={"navi-link"} to="/Service/Create">
                      Create Service
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1 align-items-end">
              <li className="nav-item">
                {isLogon(String(userId)) ? (
                  <Link to="/Profile">
                    <p className="username"> {userEmail} </p>
                  </Link>
                ) : (
                  <Link to="/Login" className={"navi-link"}>
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {isLogon(String(userId)) ? (
                  <Link to="/">
                    <input
                      className="btn-primary"
                      type="submit"
                      value="Logout"
                      onClick={() => dispatch(proceedLogOut())}
                    />
                  </Link>
                ) : (
                  <Link to="/Register" className="navi-link">
                    Register
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
