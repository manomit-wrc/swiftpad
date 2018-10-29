import React, { Component } from 'react';
import Navbar from '../partials/Navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <Navbar />
                    {this.props.children}
                </div>
            </div>
        )
    }
}



export default Dashboard;