import data from './mockData';

const URL = "http://localhost:7070/api"

function handleHttpErrors(response) {
if (!response.ok) {
  return Promise.reject({ status: response.status, fullError: response.json() })
}

if (response.status === 204) {
  return Promise.resolve();
}

return response.json();
}



const updateOrderStatus = (orderId, newStatus) => {
  const options = makeOptions("PUT", false, { status: newStatus });
  return fetch(`${URL}/orders/${orderId}`, options).then(handleHttpErrors);
}

const getAllOrders = () => {
  const options = makeOptions("GET", false);
  return fetch(URL + "/orders", options).then(handleHttpErrors);
}

const getOrderById = (orderId) => { 
  const options = makeOptions("GET",false);
return fetch(`${URL}/orders/${orderId}`, options).then(handleHttpErrors);
}

const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // JWT has 3 parts, the header, payload and signature. Here we access the payload, which contains the expiration date
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return payload.exp > currentTime; // Validate that token is not expired. If exp (expiration date) is higher, the user is still logged in
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

const makeOptions= (method,addToken,body) =>{
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
    }
  }
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

const facade = {
  getAllOrders,
  getOrderById,
  updateOrderStatus
};

export default facade;
