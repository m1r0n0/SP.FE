import "./App.css";
import { CircularProgress } from "@mui/material";
import Routers from "./Components/Utilities/Routers";
import { useAppDispatch, useAppSelector } from "./hooks";
import { checkAppReadiness, prepareAppToLoad } from "./Services";
import { isProviderLS, tokenLS } from "./JS/constants";
import { useEffect } from "react";

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
  const isEmailFetched = useAppSelector((s) => s.user.isEmailFetched);
  const isPersonalDataFetched = useAppSelector(
    (s) => s.user.isPersonalDataFetched
  );
  const token: string | null = localStorage.getItem(tokenLS);
  const isProvider = /true/i.test(localStorage.getItem(isProviderLS)!);

  useEffect(() => {
    dispatch(
      prepareAppToLoad(
        user,
        isUserEmailRequested,
        isUserRegisterFinished,
        token,
        isProvider,
        isEmailFetched,
        isPersonalDataFetched
      )
    );
  }, []);

  useEffect(() => {
    dispatch(checkAppReadiness(token, isEmailFetched, isPersonalDataFetched));
  }, [isEmailFetched, isPersonalDataFetched]);

  return (
    <div className="App">
      {isAppLoaded ? (
        <div>
          <Routers />
        </div>
      ) : (
        <div className="load-circle">
          <CircularProgress size={300} />
        </div>
      )}
    </div>
  );
}

export default App;
