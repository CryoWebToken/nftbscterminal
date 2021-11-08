import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import DataProvider from "../context/DataContext";
import Header from "./main/Header";
import Home from "./pages/Home";
import List from "./pages/List";
import Rich from "./pages/Rich";
import Collection from "./pages/Collection";
import Item from "./pages/Item";

function App() {
    return (
        <DataProvider>
            <Router>
                <Header />
                <main>
                    <Switch>
                        <Route
                            path="/"
                            component={Home}
                            label="Home"
                            exact
                        />
                        <Route
                            path="/list"
                            component={List}
                            label="List"
                            exact
                        />
                        <Route
                            path="/rich"
                            component={Rich}
                            label="Rich List"
                            exact
                        />
                        <Route
                            path="/collection/:address"
                            component={Collection}
                            label="Collection"
                            exact
                        />
                        <Route
                            path="/item/:address/:token"
                            component={Item}
                            label="Item"
                            exact
                        />
                    </Switch>
                </main>
            </Router>
        </DataProvider>
    );
}

export default App;
