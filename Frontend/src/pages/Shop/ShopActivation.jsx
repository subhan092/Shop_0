import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { backend_url } from '../../Url';

const ShopActivation = () => {
    const { activationToken} = useParams();
    const [error, setError] = useState('');
    axios.defaults.withCredentials = true;
    useEffect(() => {
      if (activationToken) {
        const sendRequest = async () => {
          await axios.post(`${backend_url}seller/activation`, {
              activationToken,
            }).then((response) => {
              if (response.status !== 200)  {
                setError(response.data.message);
                // toast.success(response.data.message);
            }
            }).catch((error) => {
              if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                // toast.error(error.response.data.message);
            }
            });
        };
        sendRequest();
      }
    }, []);
  
    
  return (
    <div 
     style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
    {error}
    </div>
  )
}

export default ShopActivation