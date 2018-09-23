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
          return (
              <div className="card mb-3">
                  <div className="card-header">
                      <h4 className="card-title" ><a className="btn btn-info" data-toggle="collapse" href={"#collapse-"+dado._id} role="button" aria-expanded="false" aria-controls={"collapse-"+dado._id}>{dado.title}</a></h4>
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
