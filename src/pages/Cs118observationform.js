import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Cs118observationform = ({ open, handleClose }) => {
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
      testVoltage: '',
      numberOfPulse: '',
      testLocationAddress: '',
      statusOfEUTOnReceipt: '',
      eutReceivedOn: '',
      dateOfTest: '',
      environmentalConditions: '',
      // performanceCriteria: [
      //   { criteria: 'Criteria A', value: 'Normal EUT performance during and after the test as intended' },
      //   { criteria: 'Criteria B', value: 'Temporary loss of function is allowed, EUT should be recoverable without operator intervention' },
      //   { criteria: 'Criteria C', value: 'Temporary loss of function is allowed, EUT can be recoverable with operator intervention' },
      //   { criteria: 'Criteria D', value: 'Loss of function, not recoverable' },
      // ],
      // observations: '',
      // testWitnessedBy: '',
      // testEngineerName: '',
      // labManager: '',
    }
  });


  // const [rows, setRows] = useState([]);

  const [airDischargeRows, setAirDischargeRows] = useState([]);
  const [contactDischargeRows, setContactDischargeRows] = useState([]);

  // const handleAddRow = () => {
  // const newRow = { id: rows.length + 1, cables: '', leads: '', iteration: '', remarks: '' };
  const handleAddAirDischargeRow = () => {
    const newRow = {
      // id: rows.length + 1,
      id: airDischargeRows.length + 1,
      portstested: '',
      airdischarge: {
        '2P': '',
        '2N': '',
        '4P': '',
        '4N': '',
        '8P': '',
        '8N': '',
        '15P': '',
        '15N': '',
        '25P': '',
        '25N': '',
        '30P': '',
        '30N': ''
      },
      results: ''
    };
    setAirDischargeRows([...airDischargeRows, newRow]);
    // setRows([...rows, newRow]);
  };

  const handleAddContactDischargeRow = () => {
    const newRow = {
      id: contactDischargeRows.length + 1,
      portstested: '',
      contractdischarge: {
        '2P': '',
        '2N': '',
        '4P': '',
        '4N': '',
        '8P': '',
        '8N': '',
        '15P': '',
        '15N': '',
        '25P': '',
        '25N': '',
        '30P': '',
        '30N': ''
      },
      results: ''
    };
    setContactDischargeRows([...contactDischargeRows, newRow]);
  };



  // const handleRemoveRow = (id) => {
  //   const updatedRows = rows.filter((row) => row.id !== id);
  //   setRows(updatedRows);
  // };

  const handleRemoveAirDischargeRow = (id) => {
    const updatedRows = airDischargeRows.filter((row) => row.id !== id);
    setAirDischargeRows(updatedRows);
  };

  const handleRemoveContactDischargeRow = (id) => {
    const updatedRows = contactDischargeRows.filter((row) => row.id !== id);
    setContactDischargeRows(updatedRows);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);

    }

    // rows.forEach((row, index) => {
    //   formData.append(`rows[${index}][portstested]`, row.portstested);
    //   Object.keys(row.airdischarge).forEach((key) => {
    //     formData.append(`rows[${index}][airdischarge][${key}]`, row.airdischarge[key]);
    //   });
    //   formData.append(`rows[${index}][results]`, row.results);
    // });


    airDischargeRows.forEach((row, index) => {
      formData.append(`airDischargeRows[${index}][portstested]`, row.portstested);
      if (row.airdischarge) {
        Object.keys(row.airdischarge).forEach((key) => {
          formData.append(`airDischargeRows[${index}][airdischarge][${key}]`, row.airdischarge[key]);
        });
      }
      formData.append(`airDischargeRows[${index}][results]`, row.results);
    });

    // contactDischargeRows.forEach((row, index) => {
    //   formData.append(`contactDischargeRows[${index}][portstested]`, row.portstested);
    //   if (row.contractdischarge) {
    //     Object.keys(row.contractdischarge).forEach((key) => {
    //       console.log(`Appending ${key} with value ${row.contractdischarge[key]}`);
    //       formData.append(`contactDischargeRows[${index}][contractdischarge][${key}]`, row.ContactDischarge[key]);
    //     });
    //   }
    //   formData.append(`contactDischargeRows[${index}][results]`, row.results);
    // });

    // Handle contactDischargeRows with checks
    contactDischargeRows.forEach((row, index) => {
      formData.append(`contactDischargeRows[${index}][portstested]`, row.portstested);
      if (row.contractdischarge) {  // Check if contractdischarge exists
        Object.keys(row.contractdischarge).forEach((key) => {
          if (row.contractdischarge[key] !== undefined) {  // Check if the value is not undefined
            console.log(`Appending ${key} with value ${row.contractdischarge[key]}`);
            formData.append(`contactDischargeRows[${index}][contractdischarge][${key}]`, row.contractdischarge[key]);
          }
        });
      }
      formData.append(`contactDischargeRows[${index}][results]`, row.results);
    });

    // // Append performance criteria to the form data
    // data.performanceCriteria.forEach((criteria) => {
    //   formData.append(`performanceCriteria[criteria]`, criteria.criteria);
    //   formData.append(`performanceCriteria[value]`, criteria.value);
    // });


    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch('http://localhost:4000/Cs116observationform', {
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
      <DialogTitle align='center'>ESD - OBSERVATION FORM </DialogTitle>
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
            {...register('testVoltage')}
            sx={textFieldStyle}
            label="Test Voltage"
            margin="normal"
            variant="outlined"
            autoComplete="on"
          />
          <br />


          <TextField
            {...register('numberOfPulse')}
            sx={textFieldStyle}
            label="Number of Pulse"
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
              <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
                <TableRow>
                  <TableCell rowSpan={3}>Sl No</TableCell>
                  <TableCell rowSpan={3} align="center">Ports Tested</TableCell>
                  <TableCell colSpan={12} align="center">Air Discharge (kV)</TableCell>
                  <TableCell rowSpan={3} align="center">Results</TableCell>

                  <TableCell rowSpan={3} align="center">
                    <IconButton size="small" onClick={handleAddAirDischargeRow}>
                      <Tooltip title="Add Row" arrow>
                        <AddIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* <TableRow>
                  {['2', '4', '8', '15', '25', '30'].map((level) => (
                    <TableCell colSpan={2} align="center" key={level}>{level}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {['2P', '2N', '4P', '4N', '8P', '8N', '15P', '15N', '25P', '25N', '30P', '30N'].map((subLevel) => (
                    <TableCell align="center" key={subLevel}>{subLevel.endsWith('P') ? 'P' : 'N'}</TableCell>
                  ))}
                </TableRow> */}

                <TableRow>
                  <TableCell colSpan={2} align="center">2</TableCell>
                  <TableCell colSpan={2} align="center">4</TableCell>
                  <TableCell colSpan={2} align="center">8</TableCell>
                  <TableCell colSpan={2} align="center">15</TableCell>
                  <TableCell colSpan={2} align="center">25</TableCell>
                  <TableCell colSpan={2} align="center">30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {airDischargeRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">
                      <TextField
                        value={row.portstested}
                        onChange={(e) => {
                          const updatedRows = [...airDischargeRows];
                          updatedRows[index].portstested = e.target.value;
                          setAirDischargeRows(updatedRows);
                        }}
                      />
                    </TableCell>

                    {Object.keys(row.airdischarge).map((key) => (
                      <TableCell key={key} align="center">
                        <TextField
                          value={row.airdischarge[key]}
                          onChange={(e) => {
                            const updatedRows = [...airDischargeRows];
                            updatedRows[index].airdischarge[key] = e.target.value;
                            setAirDischargeRows(updatedRows);
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <TextField
                        value={row.results}
                        onChange={(e) => {
                          const updatedRows = [...airDischargeRows];
                          updatedRows[index].results = e.target.value;
                          setAirDischargeRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleRemoveAirDischargeRow(row.id)}
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
                  onClick={handleAddAirDischargeRow}
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


          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold', minWidth: 1400 }}>
                <TableRow>
                  <TableCell rowSpan={3}>Sl No</TableCell>
                  <TableCell rowSpan={3} align="center">Ports Tested</TableCell>
                  <TableCell colSpan={12} align="center">Contact Discharge (kV)</TableCell>
                  <TableCell rowSpan={3} align="center">Results</TableCell>

                  <TableCell rowSpan={3} align="center">
                    <IconButton size="small" onClick={handleAddContactDischargeRow}>
                      <Tooltip title="Add Row" arrow>
                        <AddIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2} align="center">2</TableCell>
                  <TableCell colSpan={2} align="center">4</TableCell>
                  <TableCell colSpan={2} align="center">8</TableCell>
                  <TableCell colSpan={2} align="center">15</TableCell>
                  <TableCell colSpan={2} align="center">25</TableCell>
                  <TableCell colSpan={2} align="center">30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">N</TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
                {contactDischargeRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">
                      <TextField
                        value={row.portstested}
                        onChange={(e) => {
                          const updatedRows = [...contactDischargeRows];
                          updatedRows[index].portstested = e.target.value;
                          setContactDischargeRows(updatedRows);
                        }}
                      />
                    </TableCell>

                    {Object.keys(row.contractdischarge).map((key) => (
                      <TableCell key={key} align="center">
                        <TextField
                          value={row.contractdischarge[key]}
                          onChange={(e) => {
                            const updatedRows = [...contactDischargeRows];
                            updatedRows[index].contractdischarge[key] = e.target.value;
                            setContactDischargeRows(updatedRows);
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <TextField
                        value={row.results}
                        onChange={(e) => {
                          const updatedRows = [...contactDischargeRows];
                          updatedRows[index].results = e.target.value;
                          setContactDischargeRows(updatedRows);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => handleRemoveContactDischargeRow(row.id)}
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
                  onClick={handleAddContactDischargeRow}
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

          <br />

          <Button type="submit" color="primary" variant="contained" sx={{ margin: '16px' }}>
            Submit
          </Button>

          <Button onClick={handleClose} color="primary" variant="contained" sx={{ margin: '16px' }}>
            Close
          </Button>
        </form>
      </DialogContent>
    </Dialog >
  );
};

export default Cs118observationform;