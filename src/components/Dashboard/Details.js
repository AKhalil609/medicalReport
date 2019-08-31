import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import _ from "lodash";
import store from "../../store";
import renderHTML from "react-render-html";
import moment from "moment";

const styles = theme => ({
  paper: {
    margin: "auto",
    overflow: "hidden",
    maxWidth: "60%"
  },
  inline: {
    display: "inline"
  },
  listTitle: {
    display: "flex",
    marginTop: "10px"
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  alignLeft: {
    textAlign: "left"
  },
  stats: {
    maxWidth: "30%",
    float: "left"
  }
});

function Details(props) {
  const { classes } = props;

  if (!store.getState().loading) {
    let markers = store.getState().results.data.markers; // get markers from store
    let marker = _.find(markers, o => o.id === props.match.params.id); // match marker using the id provied in the url
    let measurement = marker.measurements[store.getState().results.historyPage]; // used to know which date the user is  viewing


    return (
      <div>
        <h1 className={classes.alignLeft}>{marker.name}</h1>
        <Paper className={classes.stats}>
          <Container>
            <Typography
              component="h6"
              variant="h6"
              className={classes.inline}
              color="textPrimary"
            >
              Your Lab Results
            </Typography>
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Type"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        style={{textTransform: "capitalize"}}
                      >
                        {marker.type}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Measured"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {measurement.measured ? measurement.measured.value: "N/A"}
                      </Typography>
                      {` — ${measurement.measured ? measurement.measured.unit: "N/A"}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Score"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {measurement.score ? Math.round(measurement.score): "N/A"}
                      </Typography>
                      {` — ${moment(measurement.date).format("MMMM YYYY")}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Container>
        </Paper>

        <Paper className={classes.paper}>
          <Container>{renderHTML(marker.info)}</Container>
        </Paper>
      </div>
    );
  }
  return <h1>loading...</h1>;
}

Details.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Details);
