import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../src/style.css";
import Fetch from "./components/Fetch";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Fetch />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
