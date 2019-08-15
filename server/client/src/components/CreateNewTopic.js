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
		this.inputMainTopic = React.createRef();
		this.state = { 
			mainTopicSelected: null,
			allMainTopics: [], 
			matter: [] 
		};
	}
	static defaultProps = {
		title: "Topic title",
		percentage_concluded: "0"
	};

	async componentDidMount() {
		const res = await axios.get('/api/all/maintopics');
		this.setState({ allMainTopics: res.data });
	  }

	handleChange = mainTopicSelected => {
		this.setState({ mainTopicSelected });
		console.log(`Option selected:`, mainTopicSelected);
	};

	onSubmit(e){
		e.preventDefault();
		axios.post("http://localhost:8080/api/topic",
		{
			title: this.inputTitle.current.value,
			percentage_concluded: this.inputPercentage.current.value,
			maintopic_id: this.state.mainTopicSelected.value
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
			const { title, percentage_concluded } = this.props;
			const { allMainTopics, mainTopicSelected } = this.state;
			let options = [];
			allMainTopics.forEach(element => {
				options.push({value: element._id, label: element.title})		
			});
			
			
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
							<Select isLoading="true" options={options} value={mainTopicSelected} onChange={this.handleChange} ref={this.inputMainTopic} />
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