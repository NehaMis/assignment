import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import { withRouter } from "react-router";
import home from "./components/home";
import cart from "./components/productCart";
import receiptPage from "./components/receiptPage.jsx";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Route exact path={"/"} key={1} component={withRouter(home)} />
                <Route path={"/home"} key={2} component={withRouter(home)} />
                <Route path={"/cart"} key={3} component={withRouter(cart)} />
                <Route path={"/receiptPage"} key={4} component={withRouter(receiptPage)} />
            </Router>
        </div>
    );
}

export default App;
