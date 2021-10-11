import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MenuBar from "./Components/MenuBar";
import AuthRoute from "./util/AuthRoute";
import DarkMode from "./Components/DarkMode/DarkMode";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <DarkMode />
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
