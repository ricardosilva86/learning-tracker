import React, { Component } from "react";
import Topic from "./Topic";
import $ from "jquery";
import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faEye);

class MainTopic extends Component {
	constructor() {
		super();
		this.onDelete = this.onDelete.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.state = { matter: [] };
	}
	componentDidMount(){
		$.ajax({
			url: "/api/all",
			dataType: "json",
			success: function (dados) {
				this.setState({matter:dados});
			}.bind(this)
		});
	}
	onDelete(dado){
		axios.delete(`/api/maintopic/${dado._id}`)
			.then(
				axios.get("/api/all").then((dados) => this.setState({matter: dados}))
			);
	}

	onEdit(){
		//console.log(dado._id);
	}
	render() {
		const dados = this.state.matter;
		if (dados.length > 0) {
			return (
				dados.map(dado => {
					let progressBarValues = {
						width: dado.percentage_concluded
					};
					return (
						<div key={dado._id} className="card mb-3">
							<div className="card-header">
								<span className="btn btn-light float-lg-right"
									onClick={() => this.onDelete(dado)}><FontAwesomeIcon icon="trash"/></span><span
									className="btn btn-light float-lg-right"
									onClick={() => this.onEdit(dado)}><FontAwesomeIcon icon="eye"/></span>
								<h4 className="card-title"><a className="btn btn-dark" data-toggle="collapse"
									href={"#collapse-" + dado._id} role="button"
									aria-expanded="false"
									aria-controls={"collapse-" + dado._id}>{dado.title}</a>
								</h4>
								<div className="progress">
									<div className="progress-bar" role="progressbar" style={progressBarValues}
										aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
							</div>
							<div className="card-body collapse" id={"collapse-" + dado._id}>
								<Topic topic={dado.topics}/>
							</div>
						</div>
					);
				})
			);
		}else{
			return (
				<div className="card mb-3">
					<div className="card-header">
						<h4 className="card-title">No Topic found</h4>
					</div>
				</div>
			);
		}
	}

}

export default MainTopic;
