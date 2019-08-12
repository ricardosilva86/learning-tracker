import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";

class CreateNewResource extends Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputTitle = React.createRef();
		this.inputPercentage = React.createRef();
	}
	static defaultProps = {
		title: "MainTopic title",
		percentage_concluded: "0"
	};

	onSubmit(e){
		e.preventDefault();
		axios.post("http://localhost:8080/api/maintopic",
			{
				title: this.inputTitle.current.value,
                percentage_concluded: this.inputPercentage.current.value
			})
			.then(
				$.ajax({
					url: "/api/all",
					dataType: "json",
					success: function (dados) {
						this.setState({matter: dados})
					}.bind(this)
				})
			);
	};

	render() {
		const {title, percentage_concluded} = this.props;
		return(
			<div className="card mb-3">
				<div className="card-header">Add a New Resource</div>
				<div className="card-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control " name="title" placeholder="Title" defaultValue={title} ref={this.inputTitle}/>
						</div>
						<div class="row">
							<div class="col-sm-4">
								<div class="card">
								<div class="card-body">
									<h5 class="card-title">Select Main Topic</h5>
									<select class="custom-select custom-select-md" size="5">
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>
								</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="card">
								<div class="card-body">
									<h5 class="card-title">Select Topic</h5>
									<select class="custom-select custom-select-md" size="5">
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>
								</div>
								</div>
							</div>
                            <div class="col-sm-4">
								<div class="card">
								<div class="card-body">
									<h5 class="card-title">Select Sub Topic</h5>
									<select class="custom-select custom-select-md" size="5">
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>
								</div>
								</div>
							</div>
							</div>
						<div className="form-group">
							<label htmlFor="percentage_concluded">Link</label>
							<input type="text" className="form-control " name="percentage_concluded" placeholder="URL of resource" ref={this.inputPercentage}/>
						</div>
						<div className="form-group">
							<label htmlFor="percentage_concluded">Percentage Concluded</label>
							<input type="number" className="form-control " name="percentage_concluded" placeholder="Percentage Concluded" defaultValue={percentage_concluded} ref={this.inputPercentage}/>
						</div>
						<input type="submit" className="btn btn-light"/>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateNewResource;