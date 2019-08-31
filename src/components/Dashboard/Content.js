import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import { Link } from "react-router-dom";
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
    position: "absolute",
    top: "4px",
    left: " 12px"
  },
  listTitle: {
    display: "flex",
    marginTop: "10px"
  },
  links: {
    textDecoration: "none"
  }
});


// The list of elements
function Content(props) {
  const { classes } = props;
  
  if (!store.getState().loading) {
    // to get the name and the color of the assessment (the rang of scores in the config file)
    const assessment = assess => {
      let catName = assess.split("-");
      catName = _.find(
        store.getState().results.config,
        // eslint-disable-next-line
        conf => conf.from == catName[0]
      );

      return { assessment: catName.assessment, color: catName.color };
    };

     /**
 * Takes the markers object to render element of the spicific date
 * @param {Array} chemicals - the elements for all tests from the same date.
 * @param {string} score - the score of the test.
 * @param {string} color - the hash of the color.
 * @returns {JSX.Element} - Rendered component.
 */

    const chemicalElement = (chemicals, index, score, color) => {
      let chemical = _.find(
        store.getState().results.data.markers,
        // eslint-disable-next-line
        elemen => elemen.id == chemicals.id
      );

      return (
        <Link
          className={classes.links}
          key={index}
          to={`/report/${chemical.id}/${chemical.measurements[store.getState().results.historyPage].referenceId}`}
        >
          <ListItem
            direction="row"
            justify="center"
            alignItems="center"
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
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Link>
      );
    };
    // renders a list of elements with score
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
          {historyList(
            store.getState().results.history[
              store.getState().results.historyPage
            ]
          ).map(ele => {
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
