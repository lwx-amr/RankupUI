import React, { Component } from 'react'
import {Link, withRouter} from "react-router-dom";

import JobsStates from "./smallComponents/JobsStates";
import HRJobsTable from "./smallComponents/HRJobsTable";

class Overview extends Component {
  state = {
    hrID: this.props.hrID,
    wsID: this.props.wsID
  }
  render() {
    return (
      <div className="component-wrapper">
        {<JobsStates wsID ={this.state.wsID}/>}
        <div className="addnewjob">
          <Link to={this.props.match.url+"/new-job"}><span className="rp-plus-square"/> New Job</Link>
        </div>
        {<HRJobsTable hrID={this.state.hrID}/>}
      </div>
    )
  }
}

export default withRouter(Overview);