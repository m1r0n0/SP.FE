import {useAppSelector} from "../../../../hooks";
import EditCustomer from "../../../Profile/Customer/EditCustomer/EditCustomer";
import EditProvider from "../../../Profile/Provider/EditProvider/EditProvider";

export default function EditProfile() {
    const isProvider = useAppSelector((s) => s.user.isProvider);

    return isProvider ? <EditProvider/> : <EditCustomer/>
}