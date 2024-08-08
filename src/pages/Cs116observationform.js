
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Cs116observationform = ({ open, handleClose }) => {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      companyName: '',
      address: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactNo: '',
      eutName: '',
      eutSerialNo: '',
      testStandard: '',
      testID: '',
      testLocationAddress: '',
      statusOfEUTOnReceipt: '',
      eutReceivedOn: '',
      dateOfTest: '',
      environmentalConditions: '',
      performanceCriteria: [
        { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
        { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
        { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
        { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
      ],
      observations: '',
      testWitnessedBy: '',
      testEngineerName: '',
      labManager: '',
    }
  });

  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      cables: '',
      leads: '',
      iteration: {
        '10KHz': '',
        '100KHz': '',
        '1mKHz': '',
        '10MHz': '',
        '30MHz': '',
        '100MHz': ''
      },
      remarks: ''
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append performance criteria to the form data
    data.performanceCriteria.forEach((criteria) => {
      formData.append(`performanceCriteria[criteria]`, criteria.criteria);
      formData.append(`performanceCriteria[value]`, criteria.value);
    });

    // Append rows to the form data
    rows.forEach((row, index) => {
      formData.append(`rows[${index}][cables]`, row.cables);
      formData.append(`rows[${index}][leads]`, row.leads);
      Object.keys(row.iteration).forEach((key) => {
        formData.append(`rows[${index}][iteration][${key}]`, row.iteration[key]);
      });
      formData.append(`rows[${index}][remarks]`, row.remarks);
    });

    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch('http://localhost:4000/Cs116observationform', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        reset(); // Clear the form after successful submission
        handleClose(); // Close the dialog
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const textFieldStyle = { marginBottom: '16px', marginLeft: '10px', borderRadius: 3, width: '500px' };

  const defaultRows = [
    { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
    { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
    { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
    { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle align="center">CS116-OBSERVATION FORM</DialogTitle>
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

          <Controller
            name="dateOfTest"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={textFieldStyle}
                  label="Date of Test"
                  value={field.value || null}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(props) => <TextField {...props} />}
                />
              </LocalizationProvider>
            )}
            {...register('dateOfTest', { valueAsDate: true })}
          />
          <br />
          <TextField
            {...register('environmentalConditions')}
            sx={textFieldStyle}
            label="Environmental Conditions"
            margin="normal"
            variant="outlined"
          />
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
                <TableRow>
                  <TableCell>Performance Criteria</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {defaultRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.criteria}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
                <TableRow>
                  <TableCell rowSpan={2}>Sl No</TableCell>
                  <TableCell rowSpan={2} align="center">Cables</TableCell>
                  <TableCell rowSpan={2} align="center">Leads</TableCell>
                  <TableCell colSpan={6} align="center">Iteration</TableCell>
                  <TableCell rowSpan={2} align="center">Remarks</TableCell>
                  <TableCell rowSpan={2} align="center">
                    <IconButton size="small" onClick={handleAddRow}>
                      <Tooltip title="Add Row" arrow>
                        <AddIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center">10KHz</TableCell>
                  <TableCell align="center">100KHz</TableCell>
                  <TableCell align="center">1mKHz</TableCell>
                  <TableCell align="center">10MHz</TableCell>
                  <TableCell align="center">30MHz</TableCell>
                  <TableCell align="center">100MHz</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">
                      <TextField
                        value={row.cables}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].cables = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        value={row.leads}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].leads = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    {Object.keys(row.iteration).map((key) => (
                      <TableCell key={key} align="center">
                        <TextField
                          value={row.iteration[key]}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[index].iteration[key] = e.target.value;
                            setRows(updatedRows);
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <TextField
                        value={row.remarks}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].remarks = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleRemoveRow(row.id)}
                      >
                        <Tooltip title="Remove row" arrow>
                          <RemoveIcon />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleAddRow}
                  sx={{
                    mt: 1,
                    ml: 1,
                    minWidth: '120px',
                    textAlign: 'center',
                  }}
                >
                  Add Row
                </Button>
              </Box>
            </Table>
          </TableContainer>

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

export default Cs116observationform;




// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useForm, Controller } from 'react-hook-form';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const Cs116observationform = ({ open, handleClose }) => {
//   const { control, register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       companyName: '',
//       address: '',
//       contactPersonName: '',
//       contactPersonEmail: '',
//       contactNo: '',
//       eutName: '',
//       eutSerialNo: '',
//       testStandard: '',
//       testID: '',
//       testLocationAddress: '',
//       statusOfEUTOnReceipt: '',
//       eutReceivedOn: '',
//       dateOfTest: '',
//       environmentalConditions: '',
//       performanceCriteria: [
//         { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
//         { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
//         { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
//         { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
//       ],
//       observations: '',
//       testWitnessedBy: '',
//       testEngineerName: '',
//       labManager: '',
//     }
//   });


//   const [rows, setRows] = useState([]);

//   const handleAddRow = () => {
//     // const newRow = { id: rows.length + 1, cables: '', leads: '', iteration: '', remarks: '' };
//     const newRow = {
//       id: rows.length + 1,
//       cables: '',
//       leads: '',
//       iteration: {
//         '10KHz': '',
//         '100KHz': '',
//         '1mKHz': '',
//         '10MHz': '',
//         '30MHz': '',
//         '100MHz': ''
//       },
//       remarks: ''
//     };
//     setRows([...rows, newRow]);
//   };

//   const handleRemoveRow = (id) => {
//     const updatedRows = rows.filter((row) => row.id !== id);
//     setRows(updatedRows);
//   };

//   const onSubmit = (data) => {
//     const formData = new FormData();

//     for (const key in data) {
//       formData.append(key, data[key]);
//     }

//     // Append performance criteria to the form data
//     data.performanceCriteria.forEach((criteria) => {
//       formData.append(`performanceCriteria[criteria]`, criteria.criteria);
//       formData.append(`performanceCriteria[value]`, criteria.value);
//     });

//     // Append rows to the form data
//     rows.forEach((row, index) => {
//       formData.append(`rows[${index}][cables]`, row.cables);
//       formData.append(`rows[${index}][leads]`, row.leads);
//       // formData.append(`leads`, row.leads);
//       Object.keys(row.iteration).forEach((key) => {
//         formData.append(`rows[${index}][iteration][${key}]`, row.iteration[key]);
//       });
//       formData.append(`rows[${index}][remarks]`, row.remarks);
//     });

//     // Log FormData content for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     fetch('http://localhost:4000/Cs116observationform', {
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

//   const textFieldStyle = { marginBottom: '16px', marginLeft: '10px', borderRadius: 3, width: '500px' };

//   const defaultRows = [
//     { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
//     { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
//     { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
//     { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
//   ];

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth='lg'>
//       <DialogTitle align='center'>CS116-OBSERVATION FORM </DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             {...register('companyName')}
//             sx={textFieldStyle}
//             label="Company Name"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('address')}
//             sx={textFieldStyle}
//             label="Address"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('contactPersonName')}
//             sx={textFieldStyle}
//             label="Contact Person Name"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('contactPersonEmail')}
//             sx={textFieldStyle}
//             label="Contact Person Email"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('contactNo')}
//             sx={textFieldStyle}
//             label="Contact No"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('eutName')}
//             sx={textFieldStyle}
//             label="Eut Name"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('eutSerialNo')}
//             sx={textFieldStyle}
//             label="Eut Serial No"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />

//           <TextField
//             {...register('testStandard')}
//             sx={textFieldStyle}
//             label="Test Standard"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('testID')}
//             sx={textFieldStyle}
//             label="Test ID"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('testLocationAddress')}
//             sx={textFieldStyle}
//             label="Test Location Address"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('statusOfEUTOnReceipt')}
//             sx={textFieldStyle}
//             label="Status of EUT on receipt"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('eutReceivedOn')}
//             sx={textFieldStyle}
//             label="EUT Received on"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />

//           <Controller
//             name="Date of Test"
//             control={control}
//             render={({ field }) => (
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   sx={textFieldStyle}
//                   label="Date of Test"
//                   value={field.value || null}
//                   onChange={(newValue) => {
//                     field.onChange(newValue);
//                   }}
//                   renderInput={(props) => <TextField {...props} />}
//                   format="YYYY-MM-DD"
//                 />
//               </LocalizationProvider>
//             )}
//             {...register("dateOfTest", { valueAsDate: true })}
//           />
//           <br />
//           <TextField
//             {...register('environmentalConditions')}
//             sx={textFieldStyle}
//             label="Environmental Conditions"
//             margin="normal"
//             variant="outlined"
//           />
//           <br />

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
//                 <TableRow>
//                   <TableCell>Performance Criteria</TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {defaultRows.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{row.criteria}</TableCell>
//                     <TableCell>{row.value}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <br />
//           <TextField
//             {...register('observations')}
//             sx={textFieldStyle}
//             label="Observations"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('testWitnessedBy')}
//             sx={textFieldStyle}
//             label="Test Witnessed by"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('testEngineerName')}
//             sx={textFieldStyle}
//             label="Test Engineer Name"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />
//           <TextField
//             {...register('labManager')}
//             sx={textFieldStyle}
//             label="Lab Manager"
//             margin="normal"
//             variant="outlined"
//             autoComplete="on"
//           />
//           <br />



//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
//                 <TableRow>
//                   <TableCell rowSpan={2} >Sl No</TableCell>
//                   <TableCell rowSpan={2} align="center">Cables</TableCell>
//                   <TableCell rowSpan={2} align="center">Leads</TableCell>
//                   <TableCell colSpan={6} align="center">Iteration</TableCell>
//                   <TableCell rowSpan={2} align="center">Remarks</TableCell>
//                   <TableCell rowSpan={2} align="center">
//                     <IconButton
//                       size="small"
//                       onClick={handleAddRow}
//                     // sx={{ color: "white" }}
//                     >
//                       <Tooltip title="Add Row" arrow>
//                         <AddIcon />
//                       </Tooltip>
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow>
//                   <TableCell align="center">10KHz</TableCell>
//                   <TableCell align="center">100KHz</TableCell>
//                   <TableCell align="center">1mKHz</TableCell>
//                   <TableCell align="center">10MHz</TableCell>
//                   <TableCell align="center">30MHz</TableCell>
//                   <TableCell align="center">100MHz</TableCell>
//                 </TableRow>

//               </TableHead>
//               <TableBody>
//                 {rows.map((row, index) => (
//                   <TableRow key={row.id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         value={row.cables}
//                         onChange={(e) => {
//                           const updatedRows = [...rows];
//                           updatedRows[index].cables = e.target.value;
//                           setRows(updatedRows);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         value={row.leads}
//                         onChange={(e) => {
//                           const updatedRows = [...rows];
//                           updatedRows[index].leads = e.target.value;
//                           setRows(updatedRows);
//                         }}
//                       />
//                     </TableCell>
//                     {Object.keys(row.iteration).map((key) => (
//                       <TableCell key={key} align="center">
//                         <TextField
//                           value={row.iteration[key]}
//                           onChange={(e) => {
//                             const updatedRows = [...rows];
//                             updatedRows[index].iteration = e.target.value;
//                             setRows(updatedRows);
//                           }}
//                         />
//                       </TableCell>
//                     ))}

//                     <TableCell align="center">
//                       <TextField
//                         value={row.remarks}
//                         onChange={(e) => {
//                           const updatedRows = [...rows];
//                           updatedRows[index].remarks = e.target.value;
//                           setRows(updatedRows);
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="secondary"
//                         size="small"
//                         onClick={() => handleRemoveRow(row.id)}
//                       >
//                         <Tooltip title="Remove row" arrow>
//                           <RemoveIcon />
//                         </Tooltip>
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <Box display="flex" justifyContent="flex-end">
//                 <Button
//                   variant="outlined"
//                   onClick={handleAddRow}
//                   sx={{
//                     mt: 1,
//                     ml: 1,
//                     minWidth: "120px",
//                     textAlign: "center",
//                   }}
//                 >
//                   Add Row
//                 </Button>
//               </Box>
//             </Table>
//           </TableContainer>

//           <br />

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

// export default Cs116observationform;