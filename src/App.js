

// src/App.js
import React, { useState } from 'react';
// import Csobservationsform from './pages/Csobservationsform';
import Cs114observationform from './pages/Cs114observationform';
// import Cs115observationform from './pages/Cs115observationform';
// import Cs116observationform from './pages/Cs116observationform';
// import Cs118observationform from './pages/Cs118observationform';
// import Rs101observationform from './pages/Rs101observationform';
// import Rs103observationform from './pages/Rs103observationform';

import { Button } from '@mui/material';



function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Observation Form
      </Button>
      {/* <Csobservationsform open={open} handleClose={handleClose} /> */}
      <Cs114observationform open={open} handleClose={handleClose} />
      {/* <Cs115observationform open={open} handleClose={handleClose} /> */}
      {/* <Cs116observationform open={open} handleClose={handleClose} /> */}
      {/* <Cs118observationform open={open} handleClose={handleClose} /> */}
      {/* <Rs101observationform open={open} handleClose={handleClose} /> */}
      {/* <Rs103observationform open={open} handleClose={handleClose} /> */}
    </div>
  );
}

export default App;










// import Csobservationsform from "./pages/Csobservationsform"
// // import Cs114observationform from "./pages/Cs114observationform"


// function App() {
//   return (
//     <div>
//       <Csobservationsform />

//       {/* <Cs114observationform /> */}
//     </div>
//   );
// }

// export default App;
