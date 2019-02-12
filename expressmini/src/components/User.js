import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "40%",
    " margin-bottom": "20px",
    " margin-top": "50px"

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
  }
};

const User = props => {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props);
  const { name, bio } = props.user;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography component="p">{bio}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(User);
