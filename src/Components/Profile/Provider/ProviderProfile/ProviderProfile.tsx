import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks";

export default function ProviderProfile() {
  const provider = useAppSelector((s) => s.provider.provider);

  return (
    <div id="profile-info-component">
      <div className="profile-info">
        <div className="info-box">
          <label>First Name:</label>
          <label>{provider.firstName}</label>
        </div>
        <div className="info-box">
          <label>Last Name:</label>
          <label>{provider.lastName}</label>
        </div>
        <div className="info-box">
          <label>Enterprise:</label>
          <label>{provider.enterpriseName}</label>
        </div>
        <div className="info-box">
          <label>Work hours:</label>
          <label>
            {provider.workHoursBegin} - {provider.workHoursEnd}
          </label>
        </div>
      </div>
    </div>
  );
}
