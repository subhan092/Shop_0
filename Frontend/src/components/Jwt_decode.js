import {jwtDecode} from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (!token) return null; // If no token, return null

  const decoded = jwtDecode(token); // Decode the token
  return decoded.role; // Return the role from the token
  
};

export const getShopStatus = () => {
  const token = localStorage.getItem("statustoken"); // Get token from localStorage
  if (!token) return null; // If no token, return null

  const decoded = jwtDecode(token); 
  return decoded.status; 
};

