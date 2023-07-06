import React from "react";
import "./App.css";
import { CircularProgress } from "@mui/material";
import Routers from "./Components/Utilities/Routers";
import { useAppDispatch, useAppSelector } from "./hooks";
import { prepareAppToLoad } from "./Services/user";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);

  dispatch(prepareAppToLoad(user));
  return (
    <div>
      {isAppLoaded ? (
        <div className="App">
          <Routers />
        </div>
      ) : (
        <div className="container d-flex justify-content-center">
          <CircularProgress size={300} />
        </div>
      )}
    </div>
  );
}

export default App;
