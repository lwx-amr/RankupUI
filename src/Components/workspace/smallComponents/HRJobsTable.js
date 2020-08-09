import React, { Component } from 'react'
import {Link, withRouter} from "react-router-dom";

import {getHrJobs} from "./../../../Utils/jobsCalls";


class HRJobsTable extends Component {
  state = {
    hrID: this.props.hrID,
    jobs: []
  }
  componentDidMount () {
    getHrJobs(this.state.hrID)
      .then(jobs => this.setState({jobs}));
  }
  render() {
    const jobsList = (this.state.jobs.length > 1)? this.state.jobs.map(job => {
      let date = new Date(Date.parse(job.created_date));
      return (
        <tr key={job._id}>
          <th scope="row">
            <div className="title">
            <Link to={this.props.match.url+"/job/" + job._id}><h6>{job.title}</h6></Link>
            </div>
          </th>
          <td>
            <div className="date">
              <h6>{date.toDateString()}</h6>
              <span>{date.getHours() + ':' + date.getMinutes()}</span>
            </div>
          </td>
          <td>{job.numOfApplicants}</td>
          <td>
            <div className="state">
              <span className={job.stat}>{job.stat}</span>
            </div>
          </td>
        </tr>
      )
    }) : (<tr> 
            <th scope="row"></th>
            <td><h3>No Jobs yet!</h3></td>
            <td></td>
            <td></td>
          </tr>);
    
    return (
      <div className="jobs-display">
        <div className="head">
          <h5>Your jobs</h5>
          <Link to={this.props.match.url+"/all-jobs"}>See all</Link>
        </div>
        <div className="jobs-table">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Job details</th>
                <th scope="col">Date</th>
                <th scope="col">Applicants</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              {jobsList}
            </tbody>
          </table>
        </div>
      </div>
    
    )
  }
}

export default withRouter(HRJobsTable);