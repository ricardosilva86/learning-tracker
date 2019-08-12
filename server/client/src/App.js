import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import Learning from "./components/Learning";
import About from "./components/pages/About";

import "./index.css";
import CreateNewMainTopic from "./components/CreateNewMainTopic";
import CreateNewTopic from "./components/CreateNewTopic";
import CreateNewSubTopic from "./components/CreateNewSubTopic";
import CreateNewResource from "./components/CreateNewResource";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header branding="Learn Tracker"/>
					<div className="container">
						<Switch>
							<Route exact path="/" component={Learning} />
							<Route exact path="/create/main" component={CreateNewMainTopic} />
							<Route exact path="/create/topic" component={CreateNewTopic} />
							<Route exact path="/create/sub" component={CreateNewSubTopic} />
							<Route exact path="/create/resource" component={CreateNewResource} />
							<Route exact path="/about" component={About} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
