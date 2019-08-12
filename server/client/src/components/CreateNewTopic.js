import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select';

class CreateNewTopic extends Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputTitle = React.createRef();
		this.inputPercentage = React.createRef();
		this.allMainTopics = [];
		this.options = {};
	}
	static defaultProps = {
		title: "MainTopic title",
		percentage_concluded: "0"
	};

	async componentDidMount() {
		try {
			let allMainTopics = await axios.get('/api/all/maintopics')
				.then(res => res.data);
		
			allMainTopics = allMainTopics;
		
			//Update state with new data and re-render our component.
			const names = allMainTopics;
			this.allMainTopics = names;
			this.options = [
				{ value: this.allMainTopics._id, label: this.allMainTopics.title }
			];
			
		} catch (e) { }
	  }

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
				<div className="card-header">Add a New Topic</div>
				<div className="card-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control " name="title" placeholder="Title" defaultValue={title} ref={this.inputTitle}/>
						</div>
						<div className="form-group">
							<label htmlFor="maintopic_select">Main Topic for this Topic</label>
							<Select isLoading="true" options={this.options} />
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

export default CreateNewTopic;