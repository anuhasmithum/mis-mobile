import axios from 'axios';

import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

export const getProducts = () => {


  axios.get(`http://192.168.8.100:3000/api/productlist`)
    .then(res => {

      const data = res.data;
     // alert(JSON.stringify(data));
      return data;

    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });


}










// const books = [
//     {
//         id: "1",
//       productName: "Beginning Android Programming",
//       dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "2",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "3",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "4",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "5",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "6",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "7",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "8",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "9",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     },
//     {
//         id: "10",
//         productName: "Beginning Android Programming",
//         dateTime: "J.F DiMarzio",

//     }
//     ];
//     export const getProducts = () => {
//         return books;

//     }


