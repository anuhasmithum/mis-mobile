import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';
import axios from 'axios';
export const fetchProducts = () => dispatch => {

    const products = getProducts();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: products
    })
}
