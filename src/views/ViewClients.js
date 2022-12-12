import React, { useState, useEffect } from 'react';
import ClientsService from '../services/ClientsService'
import CitiesService from '../services/CitiesService'
import { Paper, Table, TableContainer, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';

const ViewClients = () => {
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  //useEffect to get client data and city data
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await ClientsService.getAllClients();
      setData(res);
      
    }
    const getCities = async () => {
      setLoading(true);
      const res = await CitiesService.getAllCities();
      setCities(res);
      setLoading(false);  
    }
    getData();
    getCities();
    
  }, []);
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Hebrew Name</TableCell>
          <TableCell align="center">English Name&nbsp;</TableCell>
          <TableCell align="center">Birth Date&nbsp;</TableCell>
          <TableCell align="center">City&nbsp;</TableCell>
          <TableCell align="center">SSN&nbsp;</TableCell>
          <TableCell align="center">Bank Number&nbsp;</TableCell>
          <TableCell align="center">Branch Number&nbsp;</TableCell>
          <TableCell align="center">Account Number&nbsp;</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((client) => (
          <TableRow
            key={client.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center">{client.hebrewName}</TableCell>
            <TableCell align="center">{client.englishName}</TableCell>
            <TableCell align="center">{
                client.dateOfBirth
                .replace("T00:00:00", "")
                .split("-")
                .reverse()
                .join("-")
            }
            </TableCell>
            <TableCell align="center">{(cities.find(city => city.id === client.cityId)?.name || '')}</TableCell>
            <TableCell align="center">{client.ssn}</TableCell>
            <TableCell align="center">{client.bankCode}</TableCell>
            <TableCell align="center">{client.bankBranch}</TableCell>
            <TableCell align="center">{client.bankAccountNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default ViewClients