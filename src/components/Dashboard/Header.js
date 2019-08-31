import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {setPage} from "../../actions/resultsActions"
import moment from "moment";


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes } = props;
  
  let changePage = async(e)=>{
    await props.setPage(e);
    
  }
  return (
    <React.Fragment>
      
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Welcome to the Dashboard
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        {/* {create the date tabs} */}
        <Tabs value={props.data.results.historyPage} textColor="inherit">
          {props.data.results.history.map((history, index)=>{
            return (<Tab key={index} textColor="inherit" label={moment(history.date).format("MMMM YYYY")} onClick={()=>changePage(index)}/>)
          })}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  data: state
});

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {setPage})(withStyles(styles)(Header));
