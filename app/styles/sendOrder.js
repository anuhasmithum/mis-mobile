// import React, { Component } from 'react';

// import axios from 'axios';
// const apiInsertOrder = 'http://127.0.0.1:3000/api/orderDetails';


//     export default sendOrderToBackend = () => {     // send order details {customerName, phoneNumber, emailAddress, deliveryAddress, orderedProducts}
    
//     const { cartItems, cartTotal, customer } = this.props;
//     try {
//         let response = axios.post(apiInsertOrder, {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 "customername": customer.name,
//                 "email": customer.phone,
//                 "telephone": customer.email,
//                 "deliveraddress": customer.street,

//                 "orderitems": this.getOrderArray,
//             }),
           
//         });
//         let responseJson =  response.json();
//         return responseJson; // result 
//     } catch (error) {
//         console.error(`Error is : ${error}`);
//     }
// }

// getOrderArray = () => {
//     let orderArray = [];
//     const { cartItems } = this.props;

//     for (let i = 0; i < cartItems.length; i++) {
//         orderArray = orderArray.concat(cartItems[i]._id, 1)
//     }

//     return orderArray;
   
// }


////////////////////////////////////////////////

// customername: {
//     type: String,

// },
// email: {
//     type: String,

// },
// telephone: {
//     type: String,

// }
// ,
// deliveraddress: {
//     type:Number,
// },

// orderitems: {
//     type: Array
// },
// orderstatus: {
//     type: String
// }
// });














