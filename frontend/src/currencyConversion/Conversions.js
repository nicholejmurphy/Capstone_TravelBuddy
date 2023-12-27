import React, { useContext, useState, useEffect } from "react";
import ConversionApi from "../api/conversionApi";
import ConversionForm from "./ConversionForm";
import ConversionResults from "./ConversionResults";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "40px",
    marginBottom: "40px",
    fontWeight: 200,
    color: "#ffffff",
  },
  clear: { marginTop: "5px" },
  response: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    marginTop: "auto",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  body: {
    paddingTop: "10px",
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

/** Shows User's saved locations (favorites) data
 *  - Gets saved data and passes to LocationList
 *
 * { Further Study: }
 * Adding a drop down for user's saved locations
 * and will add saved translations/conversions here or on separate pages
 */
function Conversions() {
  const classes = useStyles();
  const [formData, setFormData] = useState(searchTerm);

  // Updates serchterm state on form input change
  function handleChange(e) {
    setFormData(e.target.value);
    setError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData) {
      setError(true);
    } else {
      setSearchTerm(formData);
    }
  }
  return (
    <Grid>
      <Typography variant="h4" className={classes.title} align="center">
        Currency Converter
      </Typography>

      <Grid container justifyContent="center">
        <ConversionForm></ConversionForm>
        <ConversionResult></ConversionResult>
        <Paper className={classes.response}>
          <Typography variant="p">
            Saved if needed as a styled container
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Conversions;
