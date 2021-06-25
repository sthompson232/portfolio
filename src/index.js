import React, { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactGA from 'react-ga';

ReactGA.initialize('G-EW6V9K4745');
const App = React.lazy(() => import ('./App'))

ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={
      <div className='loader'>
        <Grid container className='loader' alignItems='center' justify='center'>
          <Grid item>
            <CircularProgress size={100} style={{ color: '#ffffff' }}/>
          </Grid>
        </Grid>
      </div>
      }>
        <App />
      </Suspense>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();