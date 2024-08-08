
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Rs103observationform = ({ open, handleClose }) => {
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

  const initializeRows = () => {
    const initialRows = [
      { id: 1, antennas: 'Electric Field Antenna (10MHz ~ 100MHz)', testLevel: '', iteration: '', remarks: '' },
      { id: 2, antennas: 'Hybrid Combi log (100MHz ~ 1GHz)', testLevel: '', iteration: '', remarks: '' },
      { id: 3, antennas: 'Double Ridged Horn Antenna (1GHz ~ 18GHz)', testLevel: '', iteration: '', remarks: '' },
    ];
    return initialRows;
  };


  const [rows, setRows] = useState(initializeRows);

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append row data to the formData
    rows.forEach((row, index) => {
      formData.append(`rows[${index}][antennas]`, row.antennas);
      formData.append(`rows[${index}][testLevel]`, row.testLevel);
      formData.append(`rows[${index}][iteration]`, row.iteration);
      formData.append(`rows[${index}][remarks]`, row.remarks);
    });

    // Append performance criteria to the form data
    data.performanceCriteria.forEach((criteria) => {
      formData.append(`performanceCriteria[criteria]`, criteria.criteria);
      formData.append(`performanceCriteria[value]`, criteria.value);
    });

    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch('http://localhost:4000/Rs103observationform', {
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

  const defaultRows = [
    { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
    { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
    { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
    { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
      <DialogTitle align='center'>RS103-OBSERVATION FORM </DialogTitle>
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
            name="Date of Test"
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
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
            )}
            {...register("dateOfTest", { valueAsDate: true })}
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
              <TableHead sx={{ Align: 'center', fontWeight: 'bold', minWidth: 1400 }}>
                <TableRow>
                  <TableCell>Sl</TableCell>
                  <TableCell> Antennas with Frequencies</TableCell>
                  <TableCell>Test Level (V/m)</TableCell>
                  <TableCell>Iteration</TableCell>
                  <TableCell>Remarks</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{row.antennas}</TableCell>
                    <TableCell>
                      <TextField
                        value={row.testLevel}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].testLevel = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.iteration}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].iteration = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={row.remarks}
                        onChange={(e) => {
                          const updatedRows = [...rows];
                          updatedRows[index].remarks = e.target.value;
                          setRows(updatedRows);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ Align: 'center', fontWeight: 'bold', minWidth: 1400 }} Performance Criteria>
                <TableRow>
                  <TableCell align="center"> Performance Criteria</TableCell>
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

export default Rs103observationform;