import React, { Component } from "react";
import PropTypes from "prop-types";
import SubTopic from "./SubTopic";

class Topic extends Component {
	constructor(props){
		super(props);
		this.state = props;
	}
	render() {
		const topics = this.props.topic;
		return (
			topics.map(function (topic) {
				return(
					<div key={topic._id} className="card-body">
						<h4 className="card-title">{topic.title}</h4>
						<SubTopic subtopic={topic.subtopics} />
					</div>
				);
			}
			)
		);
	}
}

Topic.propTypes = {
	topic: PropTypes.object.isRequired,
};

export default Topic;