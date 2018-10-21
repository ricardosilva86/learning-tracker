import React, {Component} from "react";
import axios from 'axios';

class CreateNewMainTopic extends Component{
	state = {
		title: '',
		percentage_concluded: ''
	};
	onSubmit = e => {
		e.preventDefault();
		axios.post("http://localhost:8080/api/maintopic", {
			title:this.state.title,
			percentage_concluded:this.state.percentage_concluded
		});
	};
	onChange = e => {this.setState({ [e.target.name]: e.target.value })}
	render() {
		const {title, percentage_concluded} = this.state;
		return(
			<div className="card mb-3">
                <div className="card-header">Add a New Main Topic</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
						<div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control " name="title" placeholder="Title" value={title} onChange={this.onChange}/>
						</div>
                        <div className="form-group">
                            <label htmlFor="percentage_concluded">Percentage Concluded</label>
                            <input type="number" className="form-control " name="percentage_concluded" placeholder="Percentage Concluded" value={percentage_concluded} onChange={this.onChange}/>
                        </div>
                        <input type="submit" className="btn btn-light"/>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateNewMainTopic;