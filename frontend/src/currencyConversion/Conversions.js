import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

import ConversionApi from "../api/conversionApi";
import currencies from "./currencyList";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "40px",
    marginBottom: "40px",
    fontWeight: 200,
    color: "#ffffff",
  },
  body: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: "30px",
    margin: "auto",
    marginTop: "30px",
    width: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  alert: { marginTop: "10px", maxWidth: "415px" },
  submit: { width: "95%" },
  result: { fontWeight: 700, fontSize: "1.5rem" },
}));

/** Currency Conversion Calculator
 *  Takes a currency type and an amount to calculate value in another currency
 *  Amount must be greater than 0
 *
 */
function Conversions() {
  const classes = useStyles();
  const DEFAULT_DATA = {
    to: "EUR",
    from: "USD",
    amount: 0,
  };
  const [formErrors, setFormErrors] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [conversionResult, setConversionResult] = useState(null);

  // On change of form data, the formData state is updated
  async function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  // On submission of form, data is sent to conversion API and state for conversionResult is updated
  // Reveals error is error is thrown by API
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await ConversionApi.convert(formData);
      if (res.success) {
        setFormErrors(null);
        setConversionResult({
          amount: formData.amount,
          from: currencies[formData.from],
          result: res.result,
          to: currencies[formData.to],
        });
      } else {
        setFormErrors(res.error.info);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid>
      <Typography variant="h4" className={classes.title} align="center">
        Currency Converter
      </Typography>

      <Grid container justifyContent="center" direction="column">
        <Paper
          className={classes.body}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid
            container
            justifyContent="center"
            direction="column"
            spacing={2}
          >
            <Grid container item justifyContent="center">
              <Typography variant="caption">
                Choose your currency conversions and an amount.
              </Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              direction="row"
              spacing={4}
            >
              <Grid item xs={3}>
                <TextField
                  id="currency-from"
                  name="from"
                  select
                  label="From"
                  value={formData.from}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {Object.keys(currencies).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="currency-amount"
                  name="amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0.01, step: ".01" } }}
                  label="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              spacing={4}
              direction="row"
            >
              <Grid item xs={3}>
                <TextField
                  id="currency-to"
                  name="to"
                  select
                  label="To"
                  value={formData.to}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {Object.keys(currencies).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item container justifyContent="center" xs={8}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  size="large"
                  className={classes.submit}
                >
                  Convert
                </Button>
              </Grid>
            </Grid>
            {formErrors && (
              <Alert severity="error" className={classes.alert}>
                {formErrors}
              </Alert>
            )}
          </Grid>
        </Paper>
        {conversionResult && (
          <Paper className={classes.body}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle1">
                  {conversionResult.amount} {conversionResult.from}
                  {conversionResult.amount > 1 ? "s" : null} is equal to
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.result}>
                  {conversionResult.result} {conversionResult.to}
                  {conversionResult.result > 1 ? "s" : null}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default Conversions;
