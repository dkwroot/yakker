import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/home";
import NavBar from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import About from "./components/about";
import Profile from "./components/profile";
import PublicProfile from "./components/public-profile";

import "./styles.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSignOutAlt,
	faUserPlus,
	faHandshake,
	faUserSecret,
	faStickyNote,
	faSearch
} from "@fortawesome/free-solid-svg-icons";
library.add(
	faSignOutAlt,
	faUserPlus,
	faHandshake,
	faUserSecret,
	faStickyNote,
	faSearch
);

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/about" component={About} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/profile/:username/" component={PublicProfile} />
			</Switch>
		</BrowserRouter>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
