import React, { Component } from "react";
import Topic from "./Topic";
import $ from 'jquery';

class MainTopic extends Component {
  constructor() {
    super();
    this.state = { matter: [] };
  }
  componentDidMount(){
      $.ajax({
          url: '/api/all',
          dataType: 'json',
          success: function (dados) {
              this.setState({matter:dados});
          }.bind(this)
      });
  }
  render() {
      const dados = this.state.matter;

    return (
      dados.map(function (dado) {
          let progressBarValues = {
              width: dado.percentage_concluded
          }
          return (
              <div className="card mb-3">
                  <div className="card-header">
                      <h4 className="card-title" ><a className="btn btn-dark" data-toggle="collapse" href={"#collapse-"+dado._id} role="button" aria-expanded="false" aria-controls={"collapse-"+dado._id}>{dado.title}</a></h4>
                      <div className="progress">
                          <div className="progress-bar" role="progressbar" style={progressBarValues} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                  </div>
                  <div className="card-body collapse" id={"collapse-"+dado._id}>
                      <Topic topic={dado.topics} />
                  </div>
              </div>
          )
      })
    );
  }
}

export default MainTopic;
