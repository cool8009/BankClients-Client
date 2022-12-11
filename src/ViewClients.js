import React, { useState, useEffect } from 'react';
import ClientsService from './services/ClientsService'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const ViewClients = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await ClientsService.getAllClients();
      setData(res);
    }
    fetchData();
  }, []);
  return (
    <div>
        views page
    </div>
  )
}

export default ViewClients