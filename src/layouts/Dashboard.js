import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Home from "./Home";  
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { Grid } from "semantic-ui-react";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import CandidateList from '../pages/CandidateList';
import CandidateCvList from '../pages/CandidateCvList';
import JobAdvertAdd from '../pages/JobAdvertAdd';
import JobAdvertisementConfirm from '../pages/JobAdvertisementConfirmation';
import Login from '../pages/Login';
import EmployerUpdate from '../pages/EmployerUpdate';
import EmployerUpdateConfirm from '../pages/EmployerUpdateConfirm';
import CandidateProfile from '../pages/CandidateProfile';


export default function Dashboard() {
    return (
        <div>
        <ToastContainer position="bottom-right"/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              
            </Grid.Column>
            <Grid.Column width={13}>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/cprofile" component={CandidateProfile}/>
              <Route exact path="/employerupdate" component={EmployerUpdate}/>
              <Route exact path="/employerupdateconfirm" component={EmployerUpdateConfirm}/>
              <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
              <Route exact path="/candidates" component={CandidateList} />
              <Route exact path="/candidateCvs" component={CandidateCvList} />
              <Route exact path="/jobAdvertisementPost" component={JobAdvertAdd} />
              <Route exact path="/jobAdvertisementConfirm" component={JobAdvertisementConfirm} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
}
