import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Select from 'react-select';

class CreateNewResource extends Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.inputTitle = React.createRef();
		this.inputPercentage = React.createRef();
		this.inputLink = React.createRef();
		this.inputConcluded = React.createRef();
		this.state = {
			mainTopicSelected: null,
			topicSelected: null,
			subTopicSelected: null,
			allMainTopics: [],
			allTopics: [],
			allSubTopics: [],
			matter: []
		}
	}
	static defaultProps = {
		title: "Resource title",
		percentage_concluded: "0"
	};

	async componentDidMount() {
		const res = await axios.get('/api/all/maintopics');
		this.setState({ allMainTopics: res.data });

		const resTopic = await axios.get('/api/all/topics');
		this.setState({ allTopics: resTopic.data });

		const resSubTopic = await axios.get('/api/all/subtopics');
		this.setState({ allSubTopics: resSubTopic.data });
		
	  }

	async reloadTopics(maintopicId) {
		const res = await axios.get('/api/all/topics/'+maintopicId);
		this.setState({ allTopics: res.data });

	}

	async reloadSubTopics(topicId) {
		const res = await axios.get('/api/all/subtopics/'+topicId);
		this.setState({ allSubTopics: res.data });

	}

	handleMainTopicChange = mainTopicSelected => {
		
		this.setState({ mainTopicSelected });
		this.reloadTopics(mainTopicSelected.value);
	};

	handleTopicChange = topicSelected => {
		this.setState({ topicSelected });
		this.reloadSubTopics(topicSelected.value)
	};

	handleSubTopicChange = subTopicSelected => {
		this.setState({ subTopicSelected });
	};

	onSubmit(e){
		e.preventDefault();
		axios.post("http://localhost:8080/api/resource",
			{
				title: this.inputTitle.current.value,
				link: this.inputLink.current.value,
				concluded: this.inputConcluded.current.value,
				subtopic_id: this.state.subTopicSelected.value,
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
		const { allMainTopics, allTopics, allSubTopics, mainTopicSelected, topicSelected, subTopicSelected } = this.state;
		let optionsMainTopics = [];
		let optionsTopics = [];
		let optionsSubTopics = [];
		allMainTopics.forEach(element => {
			optionsMainTopics.push({value: element._id, label: element.title})		
		});
		allTopics.forEach(element => {
			optionsTopics.push({value: element._id, label: element.title})		
		});
		allSubTopics.forEach(element => {
			optionsSubTopics.push({value: element._id, label: element.title})		
		});
		return(
			<div className="card mb-3">
				<div className="card-header">Add a New Resource</div>
				<div className="card-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" className="form-control " name="title" placeholder="Title" defaultValue={title} ref={this.inputTitle}/>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<div className="card">
								<div className="card-body">
									<h5 className="card-title">Select Main Topic</h5>
									<Select isLoading="true" options={optionsMainTopics} value={mainTopicSelected} onChange={this.handleMainTopicChange} />
								</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="card">
								<div className="card-body">
									<h5 className="card-title">Select Topic</h5>
									<Select isLoading="true" options={optionsTopics} value={topicSelected} onChange={this.handleTopicChange} />
								</div>
								</div>
							</div>
                            <div className="col-sm-4">
								<div className="card">
								<div className="card-body">
									<h5 className="card-title">Select Sub Topic</h5>
									<Select isLoading="true" options={optionsSubTopics} value={subTopicSelected} onChange={this.handleSubTopicChange} />
								</div>
								</div>
							</div>
							</div>
						<div className="form-group">
							<label htmlFor="link">Link</label>
							<input type="text" className="form-control " name="link" placeholder="URL of resource" ref={this.inputLink}/>
						</div>
						<div className="form-group">
							<label htmlFor="percentage_concluded">Percentage Concluded</label>
							<input type="number" className="form-control " name="percentage_concluded" placeholder="Percentage Concluded" defaultValue={percentage_concluded} ref={this.inputPercentage}/>
						</div>
						<div className="form-group">
							<label htmlFor="concluded">Concluded</label>
							<input type="checkbox" className="form-control " name="concluded" placeholder="Concluded" defaultValue={percentage_concluded} ref={this.inputConcluded}/>
						</div>
						<input type="submit" className="btn btn-light"/>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateNewResource;