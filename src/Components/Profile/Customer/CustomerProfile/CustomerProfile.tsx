import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks";

export default function ProviderProfile() {
  const customer = useAppSelector((s) => s.customer.customer);

  return (
    <div id="profile-info-component">
      <div className="profile-info">
        <div className="info-box">
          <label> First Name: </label> <label> {customer.firstName}</label>
        </div>
        <div className="info-box">
          <label> Last Name: </label> <label>{customer.lastName}</label>
        </div>
      </div>
    </div>
  );
}
