import React, { useState, useEffect } from 'react';
import BanksService from './services/BanksService'
import ClientsService from './services/ClientsService'
import { TextField, FormControl, FormHelperText, Box, Grid, Container, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const ClientForm = ({ cities, loading }) => {
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        hebrewName: '',
        englishName: '',
        dateOfBirth: '',
        ssn: '',
        accountNumber: '',
    });
    const [selectedCity, setSelectedCity] = useState(null);
    const [isCitySelected, setIsCitySelected] = useState(false);
    const [banks, setBanks] = useState([]);
    const [bankBranches, setBankBranches] = useState([]);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedBankBranch, setSelectedBankBranch] = useState(null);
    const [isBankSelected, setIsBankSelected] = useState(false);

    const [banksLoading, setBanksLoading] = useState(false);

    useEffect(() => {
        const getBanks = async () => {
            if (selectedCity !== null && isCitySelected !== false) {
                setBanksLoading(true);
                const res = await BanksService.getAllBanks();
                setBanks(res);
                setBanksLoading(false);

            }
            else setIsCitySelected(false);
        }
        
            getBanks();
            setBanksLoading(false);
        
    }, [selectedCity])
    

    // Event handler for when the form data changes
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const regex = new RegExp(event.target.pattern);
      
        // Update the error state whenever the input value changes
        setError({
          [event.target.name]: true
        });
      
        if (regex.test(value)) {
          // The input is valid
          setError(null);
          setFormData({
            ...formData,
            [name]: value,
          });
        } else {
          // The input is invalid
          setError({
            [event.target.name]: true
          });
        }
      }

    const handleCityChange = (event, value) => {
        if(value !== null || value !== undefined) {
            setSelectedCity(value);
            setIsCitySelected(true);
        }
    }

    const handleBankChange = async (event, value) => {
        if(value !== null || value !== undefined) {
            const res = await BanksService.getBranchesForBankId(value.Code)
            setSelectedBank(value);
            setIsBankSelected(true);
            setBankBranches(res);
        }
    }

    const handleBankBranchChange = (event, value) => {
        if(value !== null || value !== undefined) {
            setSelectedBankBranch(value);
        }
    }

    // Event handler for when the form is submitted
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (error !== null) {
        alert("Form wasn't filled correctly")
        return;
      }
      const date = new Date(formData.dateOfBirth);
      const formattedDate = date.toISOString();
      const res = await ClientsService.addClient({
        hebrewName: formData.hebrewName,
        englishName: formData.englishName,
        dateOfBirth: formattedDate,
        ssn: formData.ssn,
        cityId: selectedCity.id,
        bankCode: selectedBank.Code,
        bankBranch: selectedBankBranch.BranchNumber,
        bankAccountNumber: formData.accountNumber
      }).then((res) =>{ 
        console.log(res)
        alert('Added successfully')
      }).catch((error) => {
        console.log(error)
        alert("Client wasn't added successfully")
    });

    };
  
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <Container maxWidth="sm">
            <Box my={2}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} >
                                <TextField
                                fullWidth
                                required
                                inputProps={{ 
                                    pattern: "^[א-תןםץךף'\\s-]+$",
                                    maxLength: 20
                                }}
                                id="hebrewName"
                                label="Enter Hebrew Name: Up to 20 characters"
                                type="text"
                                name="hebrewName"
                                onChange={handleChange}
                                />
                                {error && error.hebrewName && (
                                    <FormHelperText error>Invalid Input. Hebrew Only.</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                fullWidth
                                required
                                inputProps={{ 
                                    pattern: "^[a-zA-Z-'\\s]+$",
                                    maxLength: 15
                                }}
                                id="englishName"
                                label="Enter English Name"
                                type="text"
                                name="englishName"
                                onChange={handleChange}
                                />
                                {error && error.englishName && (
                                    <FormHelperText error>Invalid Input. English Only.</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                fullWidth
                                id="dateOfBirth"
                                label="Enter date"
                                type="date"
                                name="dateOfBirth"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                fullWidth
                                required
                                inputProps={{ 
                                    pattern: "^[0-9]{9}$",
                                    maxLength: 9,
                                }}
                                id="ssn"
                                label="Enter your SSN"
                                type="text"
                                name="ssn"
                                onChange={handleChange}
                                />
                                {error && error.ssn && (
                                    <FormHelperText error>Invalid Input. 9 Numbers Only.</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} >
                                <Autocomplete
                                id="city"
                                name="city"
                                options={cities}
                                fullWidth
                                getOptionLabel={(option) => { 
                                    return option.name !== null ? option.name : 'null'
                                }}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={handleCityChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select your city" />
                                )}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Autocomplete
                                disabled={!isCitySelected}
                                id="bank"
                                name="bank"
                                options={banks}
                                fullWidth
                                getOptionLabel={(option) => option.Description}
                                getOptionSelected={(option, value) => option.Code === value.Code}
                                onChange={handleBankChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select your bank" />
                                )}
                                />
                            </Grid>
                            <Grid item xs={12} >
                            <Autocomplete
                                disabled={!isBankSelected}
                                id="bank"
                                name="bank"
                                options={bankBranches}
                                fullWidth
                                getOptionLabel={(option) => `${option.BranchNumber} - ${option.BranchName}`}
                                getOptionSelected={(option, value) => option.BranchNumber === value.BranchNumber}
                                onChange={handleBankBranchChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select your bank branch" />
                                )}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                fullWidth
                                required
                                inputProps={{ 
                                    pattern: "^[0-9]{0,9}$",
                                    maxLength: 9,
                                }}
                                id="accountNumber"
                                label="Enter account number"
                                type="text"
                                name="accountNumber"
                                onChange={handleChange}
                                />
                                {error && error.accountNumber && (
                                    <FormHelperText error>Invalid Input. Up to 9 numbers only.</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>
            </Box>
        </Container>
    );
}

export default ClientForm