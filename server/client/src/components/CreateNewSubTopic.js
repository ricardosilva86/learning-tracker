import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select';

class CreateNewSubTopic extends Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputTitle = React.createRef();
		this.inputPercentage = React.createRef();
		this.state = { 
			mainTopicSelected: null,
			topicSelected: null,
			allMainTopics: [],
			allTopics: [],
			matter: []
		}
	}
	static defaultProps = {
		title: "SubTopic title",
		percentage_concluded: "0"
	};

	async componentDidMount() {
		const res = await axios.get('/api/all/maintopics');
		this.setState({ allMainTopics: res.data });

		const resTopic = await axios.get('/api/all/topics');
		this.setState({ allTopics: resTopic.data });
		
	  }

	async reloadTopics(maintopicId) {
		const res = await axios.get('/api/all/topics/'+maintopicId);
		this.setState({ allTopics: res.data });

	}

	handleMainTopicChange = mainTopicSelected => {
		
		this.setState({ mainTopicSelected });
		this.reloadTopics(mainTopicSelected.value);
	};

	handleTopicChange = topicSelected => {
		this.setState({ topicSelected });
	};

	onSubmit(e){
		e.preventDefault();
		axios.post("http://localhost:8080/api/subtopic",
			{
				title: this.inputTitle.current.value,
				percentage_concluded: this.inputPercentage.current.value,
				topic_id: this.state.topicSelected.value
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
		const { allMainTopics, allTopics, mainTopicSelected, topicSelected } = this.state;
		let optionsMainTopics = [];
		allMainTopics.forEach(element => {
			optionsMainTopics.push({value: element._id, label: element.title})		
		});
		let optionsTopics = [];
		allTopics.forEach(element => {
			optionsTopics.push({value: element._id, label: element.title})		
		});
		return(
			<div className="card mb-3">
				<div className="card-header">Add a New Sub Topic</div>
				<div className="card-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control " name="title" placeholder="Title" defaultValue={title} ref={this.inputTitle}/>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<div className="card">
								<div className="card-body">
									<h5 className="card-title">Select Main Topic</h5>
									<Select isLoading="true" options={optionsMainTopics} value={mainTopicSelected} onChange={this.handleMainTopicChange} />
								</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="card">
								<div className="card-body">
									<h5 className="card-title">Select Topic</h5>
									<Select isLoading="true" options={optionsTopics} value={topicSelected} onChange={this.handleTopicChange} />
								</div>
								</div>
							</div>
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

export default CreateNewSubTopic;