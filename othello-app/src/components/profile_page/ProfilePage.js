import React from 'react';
import CircularProgressBar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './profilePage.scss';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";

export const ProfilePage = (props) => {
  const { profile } = props;
  const { userName, emailId, winPercentage } = profile;
  return (<div className='profile-page-container'>
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <Paper>
          <h4>User Name: {userName}</h4>
          <h4>Email Id: { emailId }</h4>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <CircularProgressBar
            percentage={winPercentage}
            text={ winPercentage + '%' }/>
        </Paper>
      </Grid>
    </Grid>
  </div>);
};

export const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfilePage);

