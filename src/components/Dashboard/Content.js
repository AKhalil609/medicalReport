import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import { connect } from "react-redux";
import store from "../../store";

const styles = theme => ({
  paper: {
    maxWidth: 520,
    margin: "auto",
    overflow: "hidden"
  },
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  rightEnd: {
    display: "contents"
  },
  test: {
    color: "#FF6D59"
  },
  progress: {
    // margin: theme.spacing(0),
    position: "absolute",
    top: "4px",
    left: " 12px"
  },
  listTitle:{
    display: "flex",
    marginTop: "10px"
  }
});

function Content(props) {
  const { classes } = props;
  

  let handel = () => {
    console.log("Hello");
  };

  if (!store.getState().loading) {
    const assessment = assess => {
      let catName = assess.split("-");
      catName = _.find(
        store.getState().results.config,
        conf => conf.from == catName[0]
      );

      return { assessment: catName.assessment, color: catName.color };
    };

    const chemicalElement = (chemicals, index, score, color) => {
      let chemical = _.find(
        store.getState().results.data.markers,
        elemen => elemen.id == chemicals.id
      );
      console.log(color);

      return (
        <ListItem
          direction="row"
          justify="center"
          alignItems="center"
          onClick={handel}
          key={index}
          button
          divider
        >
          <ListItemAvatar>
            <div>
              <CircularProgress
                className={classes.progress}
                variant="static"
                value={Math.round(score)}
                style={{ color }}
              />
              <Avatar alt="Remy Sharp" src={chemical.images[0].value} />
            </div>
          </ListItemAvatar>
          <ListItemText
            // primary={content.markers[0].name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {chemical.name}
                </Typography>
                {/* {" — I'll be in your neighborhood doing errands thisdlashf l afskldjflkasdjflkjasd asldfkj lasdkjfla  …"} */}
              </React.Fragment>
            }
          />
          <ListItemText
            className={classes.rightEnd}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="subtitle2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  <span style={{ color }}>{Math.round(score)}</span>
                  <span>/100</span>
                  {/* {`${Math.round(score)}/100`} */}
                </Typography>
                {/* {" — I'll be in your neighborhood doing errands thisdlashf l afskldjflkasdjflkjasd asldfkj lasdkjfla  …"} */}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    };
    const historyList = history => {
      let _history = { ...history };
      let _list = Object.keys(_history.categories).map((element, index) => {
        return (
          <div key={index}>
            <ListSubheader
              className={classes.test}
              style={{ color: assessment(element).color }}
            >
              {assessment(element).assessment}
            </ListSubheader>
            {history.categories[element].map((element2, index2) => {
              return chemicalElement(
                element2,
                index2,
                element2.score,
                assessment(element).color
              );
            })}
          </div>
        );
      });
      return _list;
    };

    return (
      <Paper className={classes.paper}>
        <Container className={classes.listTitle}>
          <Typography
            component="p"
            variant="h6"
            className={classes.inline}
            color="textPrimary"
          >
            Your Levels
          </Typography>
        </Container>
        <Container className={classes.listTitle}>
          <Typography
            component="p"
            variant="subtitle1"
            className={classes.inline}
            color="textSecondary"
          >
            Your levels based on your blood test
          </Typography>
        </Container>

        <List className={classes.root}>
          {historyList(store.getState().results.history[0]).map(ele => {
            return ele;
          })}
        </List>
      </Paper>
    );
  }
  return <h1>loading...</h1>;
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
