import { FETCH_PRODUCTS } from './types';
// import { getProducts } from '../../../app/data';


import axios from 'axios';
export const fetchProducts = () => dispatch => {
 
    
   
    axios.get(`http://192.168.8.100:3000/api/productlist`)
    .then(res => {
        const books = res.data;
        dispatch({
            type: FETCH_PRODUCTS,
            payload: books,
           
        })
   
    
    }).catch((error) => {
        console.error(`Error is : ${error}`);
    });
   

}


