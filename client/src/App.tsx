import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import UpdateSchool from "./pages/UpdateSchool/UpdateSchool";
import School from "./pages/School/School";
import CreateSchool from "./pages/CreateSchool/CreateSchool";
import "./App.css";
import { useEffect } from "react";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/create" component={CreateSchool} />
        <Route exact path="/school/:id" component={School} />
        <Route exact path="/update/:id" component={UpdateSchool} />
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
