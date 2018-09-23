import React, { Component } from "react";
import PropTypes from "prop-types";

class Resource extends Component {
  constructor(props){
    super(props);
    this.state = props;
  }
  render() {
    const resources = this.props.resource;
    return(
      resources.map(function (resource) {
        return (
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{resource.title}</li>
                                <li className="list-group-item"><a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a></li>
                                <li className="list-group-item">{resource.concluded ? ('Sim') : ('Não')}</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
      })
    )
  }
}

Resource.propTypes = {
  resource: PropTypes.object.isRequired
};

export default Resource;
