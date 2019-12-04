import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import { Spinner } from 'native-base';

import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;
const apiGetLoadingTheme = 'http://192.168.8.100:3000/api/getloadpage'


class CheckAuth extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    theme: '',
    loadingTheme: ''

  }
  componentDidMount = () => {
    this.renderLoadingTheme();
    // this._bootstrapAsync();   //        this line should be remove             

    this.abc().then(res => {
      this.setState({ theme: res })
      this._bootstrapAsync();              //  this should be uncomment
    })
  }

  static navigationOptions = () => {
    return {
      header: null,
    }
  }

  abc = async () => {
    // alert(" inside abc function")
    const res = await axios.get(apiGetThemes);
    let data = res.data;
    // alert(data)
    //this.setState({ theme: data.theme })
    return data.theme

  };

  renderLoadingTheme = () => {
    axios.get(apiGetLoadingTheme).then(res => {
      const data = res.data;
      this.setState({ loadingTheme: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });
  };


  _bootstrapAsync = async () => {

    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {

      if (this.state.theme == "theme1")
        this.props.navigation.navigate('Dashboard1');

      if (this.state.theme == "theme2")
        this.props.navigation.navigate('Dashboard2');

      if (this.state.theme == "theme3")
        this.props.navigation.navigate('Dashboard3');

    }

    else {
      await AsyncStorage.removeItem('token')
      this.props.navigation.navigate('LoginScreen');
    }

  }

  render() {
    return (
      <ImageBackground source={{ uri: `http://192.168.8.100:3000/api/imgs/${this.state.loadingTheme.imgName}` }} style={{ width: '100%', height: '100%' }}>


        <View style={{ display: "flex", marginTop: 200, alignItems: "center", justifyContent: "center" }}>

          <Text style={{ fontSize: 40, color: this.state.loadingTheme.color, marginTop: -30, fontWeight: 'bold', padding: 30 }}> {this.state.loadingTheme.title}</Text>

          <Text style={{ marginTop: -30, }}></Text>
          <Spinner size='large' color='#252626' />

          <Text style={{ fontSize: 16, color: '#252626' }}

          >Loading</Text>
        </View>

      </ImageBackground>
    );
  }
}

export default CheckAuth;
