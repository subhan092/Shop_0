import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const ActivationPage = () => {
  const { activationToken} = useParams();
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (activationToken) {
      const sendRequest = async () => {
        await axios.post('http://localhost:3000/activation', {
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
      }}
    >
    {error}
      {/* {error ? (
        <p>{error}</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )} */}
    </div>
  );
};

export default ActivationPage;
