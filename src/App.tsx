import "./App.css";
import { CircularProgress } from "@mui/material";
import Routers from "./Components/Utilities/Routers";
import { useAppDispatch, useAppSelector } from "./hooks";
import { prepareAppToLoad } from "./Services";

function App() {
  const dispatch = useAppDispatch();
  const isAppLoaded = useAppSelector((state) => state.user.isAppLoaded);

  dispatch(prepareAppToLoad());

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
