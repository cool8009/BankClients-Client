import React, { useState, useEffect } from 'react';
import CitiesService from './services/CitiesService';
import TextField from '@material-ui/core/TextField';
import ClientForm from './ClientForm';


const AddClient = () => {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getCities = async () => {
          setLoading(true);
          const res = await CitiesService.getAllCities()
                        .then(cities => cities.sort((a, b) => a.name.localeCompare(b.name, 'he')));
          setCities(res);
          setLoading(false);  
        }
        getCities();
      }, [])
    return (
      <div>
         <h1>Sign up:</h1>
         <ClientForm cities={cities} loading={loading}/>
      </div>
    )
}

export default AddClient