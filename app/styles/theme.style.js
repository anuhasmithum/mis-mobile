// import axios from "axios"
// import React, { Component } from 'react';
// const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;



// // export default class SAD extends Component{

//   export const getTheme = () => {

//   axios.get(apiGetThemes).then(res => {
//     const data = res.data;
//    // const lson=  JSON.stringify(data);
//     //alert(data)
//     return data;

//   }).catch((error) => {
//     console.error(`Error reddda is : ${error}`);
//   });
// }



// export { getTheme };



// export default{
//     BUTTON_COLOR: '#1abc8c',
//     BACKGROUND_COLOR: '#1abc9c'
// }


// export default sliderProps = {


//   themePatton: '',
//   headerColor: 'blue',
//   statusbarcolor: 'blue',
//   imagesArray: [
//     {
//       title: 'Title 1',
//       caption: 'Caption 1',
//       url: 'https://reactnativecode.000webhostapp.com/images/dahlia-red-blossom-bloom-60597.jpeg',
//     }, {
//       title: 'Title 2',
//       caption: 'Caption 2',
//       url: 'https://reactnativecode.000webhostapp.com/images/flower-impala-lily-floral-plant-65653.jpeg',
//     }, {
//       title: 'Title 3',
//       caption: 'Caption 3',
//       url: 'https://reactnativecode.000webhostapp.com/images/flowers-background-butterflies-beautiful-87452.jpeg',
//     },
//   ],





  // source={{ uri: `http://192.168.8.100:3000/static/${this.state.foodsFromServer.dateTime}
  // .${typeof this.state.foodsFromServer.oriName === "string" ? this.state.foodsFromServer.oriName.split('.')
  // [this.state.foodsFromServer.oriName.split('.').length - 1] : ""}` }}
}




// function getColor() {
//   return 'orange'

//    axios.get('/getTheme')
//     .then(function (response) {
//       const colors = JSON.parse.response.data
//       return colors;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }




// axios.get('/getTheme')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });





// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import axios from "axios"


// export default class Theme extends Component {

//   state = {
//     getTheme: ''
//   }
//   getColor = () => {

//     axios.get('/getTheme')
//       .then(function (response) {
//         const data = response.data
//         this.setState({ getTheme: data })
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   render() {
//     return (
//       <View>
//         <Text>
//           themes are here
//       </Text>
//       </View>
//     )
//   }
// }


