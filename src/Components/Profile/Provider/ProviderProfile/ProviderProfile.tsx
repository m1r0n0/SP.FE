import {Link} from "react-router-dom";
import {useAppSelector} from "../../../../hooks";

export default function ProviderProfile() {
    const provider = useAppSelector((s) => s.provider.provider);

    return (
        <div>
            <p>First Name: {provider.firstName}</p>
            <p>Last Name: {provider.lastName}</p>
            <p>Enterprise Name: {provider.enterpriseName}</p>
            <p>Begin of Work: {provider.workHoursBegin}</p>
            <p>End of Work: {provider.workHoursEnd}</p>
            <Link to="/Profile/Edit">Edit</Link>
        </div>
    );
}
