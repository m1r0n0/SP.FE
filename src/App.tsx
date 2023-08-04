import "./App.css";
import {CircularProgress} from "@mui/material";
import Routers from "./Components/Utilities/Routers";
import {useAppDispatch, useAppSelector} from "./hooks";
import {prepareAppToLoad} from "./Services";
import {isProviderLS, tokenLS} from "./JS/constants";

function App() {
    const dispatch = useAppDispatch();
    const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);
    const isUserEmailRequested = useAppSelector(
        (state) => state.user.isUserEmailRequested
    );
    const user = useAppSelector((s) => s.user.user);
    const isUserRegisterFinished = useAppSelector(
        (s) => s.user.isRegisterFinished
    );
    const token: string | null = localStorage.getItem(tokenLS);
    const isProvider = /true/i.test(localStorage.getItem(isProviderLS)!);

    dispatch(
        prepareAppToLoad(
            user,
            isUserEmailRequested,
            isUserRegisterFinished,
            token,
            isProvider
        )
    );

    return (
        <div>
            {isAppLoaded ? (
                <div className="App">
                    <Routers/>
                </div>
            ) : (
                <div className="container d-flex justify-content-center">
                    <CircularProgress size={300}/>
                </div>
            )}
        </div>
    );
}

export default App;
