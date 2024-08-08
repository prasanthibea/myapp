import React from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const Csobservationsform = ({ open, handleClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      companyName: '',
      address: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactNo: '',
      eutName: '',
      eutSerialNo: '',
      testingCableName: '',
      testStandard: '',
      testID: '',
      testLocationAddress: '',
      statusOfEUTOnReceipt: '',
      eutReceivedOn: '',
      dateOfTest: '',
      environmentalConditions: '',
      performanceCriteria: '',
      criteriaA: '',
      criteriaB: '',
      criteriaC: '',
      observations: '',
      testWitnessedBy: '',
      testEngineerName: '',
      labManager: '',
    }
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch('http://localhost:4000/Csobservationsform', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        reset(); // Clear the form after successful submission
        handleClose(); // Close the dialog
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const textFieldStyle = { marginBottom: '16px', marginLeft: '10px', borderRadius: 3, width: '500px' };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle align='center'>CS101-OBSERVATION FORM FOR JC:</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('companyName')}
            sx={textFieldStyle}
            label="Company Name"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('address')}
            sx={textFieldStyle}
            label="Address"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('contactPersonName')}
            sx={textFieldStyle}
            label="Contact Person Name"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('contactPersonEmail')}
            sx={textFieldStyle}
            label="Contact Person Email"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('contactNo')}
            sx={textFieldStyle}
            label="Contact No"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('eutName')}
            sx={textFieldStyle}
            label="Eut Name"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('eutSerialNo')}
            sx={textFieldStyle}
            label="Eut Serial No"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testingCableName')}
            sx={textFieldStyle}
            label="Testing Cable Name"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testStandard')}
            sx={textFieldStyle}
            label="Test Standard"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testID')}
            sx={textFieldStyle}
            label="Test ID"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testLocationAddress')}
            sx={textFieldStyle}
            label="Test Location Address"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('statusOfEUTOnReceipt')}
            sx={textFieldStyle}
            label="Status of EUT on receipt"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('eutReceivedOn')}
            sx={textFieldStyle}
            label="EUT Received on"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('dateOfTest')}
            sx={textFieldStyle}
            label="Date of Test"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('environmentalConditions')}
            sx={textFieldStyle}
            label="Environmental Conditions"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('performanceCriteria')}
            sx={textFieldStyle}
            label="Performance Criteria"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('criteriaA')}
            sx={textFieldStyle}
            label="Criteria A"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('criteriaB')}
            sx={textFieldStyle}
            label="Criteria B"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('criteriaC')}
            sx={textFieldStyle}
            label="Criteria C"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('observations')}
            sx={textFieldStyle}
            label="Observations"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testWitnessedBy')}
            sx={textFieldStyle}
            label="Test Witnessed by"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('testEngineerName')}
            sx={textFieldStyle}
            label="Test Engineer Name"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <TextField
            {...register('labManager')}
            sx={textFieldStyle}
            label="Lab Manager"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />
          <Button type="submit" color="primary" variant="contained" sx={{ margin: '16px' }}>
            Submit
          </Button>

          <Button onClick={handleClose} color="primary" variant="contained" sx={{ margin: '16px' }}>
            Close
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Csobservationsform;








// import React from 'react';
// import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';

// const Csobservationsform = ({ open, handleClose }) => {
//   const { control, handleSubmit, reset } = useForm();

//   const onSubmit = (data) => {
//     const formData = new FormData();

//     for (const key in data) {
//       formData.append(key, data[key]);
//     }

//     // Log FormData content for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     fetch('http://localhost:4000/Csobservationsform', {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//         reset(); // Clear the form after successful submission
//         handleClose(); // Close the dialog
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth='lg'>
//       <DialogTitle align='center'>CS101-OBSERVATION FORM FOR JC:</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {[
//             { name: 'companyName', label: 'Company Name' },
//             { name: 'address', label: 'Address' },
//             { name: 'contactPersonName', label: 'Contact Person Name' },
//             { name: 'contactPersonEmail', label: 'Contact Person Email' },
//             { name: 'contactNo', label: 'Contact No' },
//             { name: 'eutName', label: 'Eut Name' },
//             { name: 'eutSerialNo', label: 'Eut Serial No' },
//             { name: 'testingCableName', label: 'Testing Cable Name' },
//             { name: 'testStandard', label: 'Test Standard' },
//             { name: 'testID', label: 'Test ID' },
//             { name: 'testLocationAddress', label: 'Test Location Address' },
//             { name: 'statusOfEUTOnReceipt', label: 'Status of EUT on receipt' },
//             { name: 'eutReceivedOn', label: 'EUT Received on' },
//             { name: 'dateOfTest', label: 'Date of Test' },
//             { name: 'environmentalConditions', label: 'Environmental Conditions' },
//             { name: 'performanceCriteria', label: 'Performance Criteria' },
//             { name: 'criteriaA', label: 'Criteria A' },
//             { name: 'criteriaB', label: 'Criteria B' },
//             { name: 'criteriaC', label: 'Criteria C' },
//             { name: 'observations', label: 'Observations' },
//             { name: 'testWitnessedBy', label: 'Test Witnessed by' },
//             { name: 'testEngineerName', label: 'Test Engineer Name' },
//             { name: 'labManager', label: 'Lab Manager' }
//           ].map(({ name, label }) => (
//             <Controller
//               key={name}
//               name={name}
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label={label}
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   sx={{ marginBottom: '16px' }}
//                 />
//               )}
//             />
//           ))}
//           <Button type="submit" color="primary" variant="contained" sx={{ margin: '16px' }}>
//             Submit
//           </Button>
//           <Button onClick={handleClose} color="primary" variant="contained" sx={{ margin: '16px' }}>
//             Close
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Csobservationsform;






















