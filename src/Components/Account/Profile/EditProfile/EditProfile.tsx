import { useAppSelector } from "../../../../hooks";
import EditCustomer from "../../../Customer/Profile/EditCustomer/EditCustomer";
import EditProvider from "../../../Provider/Profile/EditProvider/EditProvider";

export default function EditProfile() {
    const isProvider = useAppSelector((s) => s.user.isProvider);

    return isProvider ? <EditProvider /> : <EditCustomer /> 
}