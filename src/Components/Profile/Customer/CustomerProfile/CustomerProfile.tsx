import {Link} from "react-router-dom";
import {useAppSelector} from "../../../../hooks";

export default function ProviderProfile() {
    const customer = useAppSelector((s) => s.customer.customer);

    return (
        <div>
            <p>First Name: {customer.firstName}</p>
            <p>Last Name: {customer.lastName}</p>
            <Link to="/Profile/Edit">Edit</Link>
        </div>
    );
}
