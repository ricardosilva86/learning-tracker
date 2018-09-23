import React, { Component } from "react";

class NoResource extends Component {
    render() {
        return (
            <div className="alert alert-primary" role="alert">
                Sem recursos de aprendizado disponíveis.
            </div>
        );
    }
}

export default NoResource;
