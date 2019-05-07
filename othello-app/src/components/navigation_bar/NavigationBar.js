import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import {withRouter} from 'react-router';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {connect} from "react-redux";

export const NavigationBar = (props) => {
  const {history, location, profile} = props;
  const tabs = profile ? props.navBar.loggedInTabs : props.navBar.loggedOffTabs;
  return (
    <div>
      <AppBar position='relative'>
        <Toolbar>
          <Tabs value={(tabs.find(tab => tab.tabUrl === location.pathname) || {}).tabName} onChange={(event, value) => {
            history.push(tabs.find(tab => tab.tabName === value).tabUrl);
          }}>
            {
              tabs.map((tab) => (<Tab value={tab.tabName} label={tab.tabName}/>))
            }
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>);
};

export const mapStateToProps = (state) => ({
  navBar: state.navigationBar,
  profile: state.profile,
});

export default withRouter(connect(mapStateToProps, null)(NavigationBar));