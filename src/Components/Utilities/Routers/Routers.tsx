import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../../Account/Login";
import Register from "../../Account/Register";
import NotFound from "../../Common/HtmlErrors/NotFound";
import Unauthorized from "../../Common/HtmlErrors/Unauthorized";
import HomePage from "../../Common/HomePage";
import TopMenu from "../../Common/TopMenu";
import "./Routers.css";
import RegisterProvider from "../../Profile/Provider/RegisterProvider/RegisterProvider";
import RegisterCustomer from "../../Profile/Customer/RegisterCustomer";
import Profile from "../../Profile/User";
import EditProfile from "../../Profile/User/EditProfile";

export const Routers = () => {
    return (
        <BrowserRouter>
            <TopMenu/>
            <div className="app-body">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>

                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Profile/*" element={<Profile/>}/>
                    <Route path="/Profile/Edit" element={<EditProfile/>}/>

                    <Route path="/Register/Provider" element={<RegisterProvider/>}/>
                    <Route path="/Register/Customer" element={<RegisterCustomer/>}/>

                    <Route path="/Unauthorized" element={<Unauthorized/>}/>
                    <Route path="/NotFound" element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};
