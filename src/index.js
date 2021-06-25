import React, { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const App = React.lazy(() => import ('./App'))

const injectGA = () => {
  if (typeof window == 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-EW6V9K4745');
};

ReactDOM.render(
    <React.StrictMode>
      <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-EW6V9K4745"
    />
    <script>{injectGA()}</script>
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