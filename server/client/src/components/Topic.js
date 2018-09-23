import React, { Component } from 'react';

import SubTopic from './SubTopic';

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
              <div className="card-body">
                  <h4 className="card-title">{topic.title}</h4>
                  <SubTopic subtopic={topic.subtopics} />
              </div>
          )
        }
        )
    )
  }
}

export default Topic;