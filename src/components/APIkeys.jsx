import React from 'react';
import './style/Categories.css';
import { CssBaseline, Grid } from '@mui/material';
import ApikeysCreate from './ApikeysCreate';
import ApikeysList from './ApikeysList';



function Apikeys() {


  return (
    <>
    <CssBaseline />
    <Grid container spacing={1} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <ApikeysCreate />
      </Grid>
      <Grid item xs={12}>
        <ApikeysList />
      </Grid>
    </Grid>
  </>
  );
}
export default Apikeys;
