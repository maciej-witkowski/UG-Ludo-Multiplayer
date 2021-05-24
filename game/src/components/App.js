import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../css/App.css';
import Home from "./Home";
import WaitingRoom from "./WaitingRoom";
import NavBar from "./NavBar";
import Session from "./Session";

function App() {
  return (
    <div className="App">
        <NavBar />
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/games" component={WaitingRoom} />
                <Route exact path="/game/:id" component={Session} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
