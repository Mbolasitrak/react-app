import React, {Component} from 'react';
import {Link} from "react-router-dom";

class HitItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className ={this.props.details===false?"col-md-4 mt-2": "m-2"} key={this.props.hit.id}>
                <div className = "card">
                    <div className = "card-header">
                        {this.props.details===false?this.props.hit.tags:'Details'} | {this.props.hit.webformatWidth} x {this.props.hit.webformatHeight}
                    </div>
                    <div className="card-body">
                        {
                            (this.props.details===false)?
                                <img className="card-img" height={200} src={this.props.hit.webformatURL} alt="hit image"/>
                                :
                                <img className="card-img" src={this.props.hit.largeImageURL} alt="hit image"/>

                        }
                    </div>
                    <div className="m-2">
                        <Link to={"/hitDetails/"+this.props.hit.id} className="btn btn-success">Hit Details</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HitItem;