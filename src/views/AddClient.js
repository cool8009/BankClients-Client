import React, { useState, useEffect } from 'react';
import CitiesService from '../services/CitiesService';
import ClientForm from '../components/ClientForm';

//Add client view
const AddClient = () => {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      // useEffect for getting all cities from the server
        const getCities = async () => {
          setLoading(true);
          const res = await CitiesService.getAllCities();
                cities.sort((a, b) => {
                if (a.name === null || b.name === null) {
                  return 1;
            }
            else return a.name.localeCompare(b.name, 'he')
          });
          setCities(res);
          setLoading(false);  
        }
        getCities();
      }, [])
    return (
      <div>
         <h1 style={{ textAlign: 'center', margin: '0 auto' }} >Sign up:</h1>
         <ClientForm cities={cities} loading={loading}/>
      </div>
    )
}

export default AddClient