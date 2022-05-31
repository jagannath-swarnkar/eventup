// import React from 'react';
// import { SnackbarProvider, useSnackbar } from 'notistack';
// import { SnackbarSubject } from '../lib/rxSubject';

// const SnackbarComponent = () => {
//   const { enqueueSnackbar } = useSnackbar();

//   SnackbarSubject.subscribe(({
//       message, 
//       variant="info", 
//       duration=2000,
//       vertical="top",
//       horizontal="right"
//     })=>{
//     enqueueSnackbar(message, { 
//         variant,
//         vertical,
//         horizontal,
//         autoHideDuration: duration,
//      })
//   })
//   return (
//     <React.Fragment>
//       <div></div>
//     </React.Fragment>
//   );
// }

// const Snackbar = () => {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <SnackbarComponent />
//     </SnackbarProvider>
//   );
// }

// export default Snackbar
