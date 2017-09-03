import React from 'react';
import axios from 'axios';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import ApiErrorHandler from '../../services/apiErrorHandler';

class JobListComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { jobs: [], errorMessage: "" };
    }
     componentDidMount() {
        this._fetchJobs();
    }
    _fetchJobs() {
        let authConfig = this.props.getAuthorizationApiConfig();
        axios.get('/api/jobs', authConfig)
           .then(response => {
               this.setState({ jobs: response.data, errorMessage: "" });
            })
            .catch(error => {
                this.setState({ errorMessage: ApiErrorHandler.GetGenericErrorMessage(error) });
                console.log(error);
            });
    }
    render() {
        return (
            <div className="jombotron row">
                <h1>Jobs</h1>
                <div className="col-md-7">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="blue-grey lighten-4">
                        <tr>
                        <th>id</th>
                        <th>project</th>
                        <th>service</th>
                        <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.jobs.map((job, index) => 
                        <tr scope="row" key={index} className="">
                            <td className="">{job.id}</td>
                            <td className="">{job.project}</td>
                            <td className="">{job.service}</td>
                            <td className="">{job.status}</td>
                        </tr>)
                     }
                    </tbody>
                </table>
                    <AutoCloseAlertComponent message={this.state.errorMessage} type="danger" />
                </div>
            </div>
        );
    }
}

export default JobListComponent;