import React from "react";
import { Alert, Picker, View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import validate from "../utility/validation"
import AsyncStorage from "@react-native-community/async-storage"
import axios from "react-native-axios";
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;


class LoginScreen extends React.Component {

  state = {
    themeColors: '',
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false

      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 4
        },
        touched: false

      },

    }
  };


  static navigationOptions = () => {
    return {

      headerTitle: 'LOGIN',
      headerLeft: null,
      headerTitleStyle: {
        textAlign: 'center',
        backgroundColor: 'white',
        flexGrow: 1,
        alignSelf: 'center',
      },

    }
  }


  componentDidMount = () => {
 
    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });
  }


  // setUserId = async _id => {
  //   await AsyncStorage.setItem("loginUserId", _id).then(async val => {
  //     const _id = await AsyncStorage.getItem('loginUserId')
  //     console.log(_id)
  //     // this.props.navigation.navigate('Dashboard1');
  //   });
  // };



  setToken = async token => {
    await AsyncStorage.setItem("token", token).then(async val => {
      const token = await AsyncStorage.getItem('token')
      alert(token)
      this.props.navigation.navigate('Dashboard1');
    });
  };



  signIn = () => {

    axios.post(`http://192.168.8.100:3000/api/signin`, {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value

    })
      .then(res => {
        if (res.status === 200) {

          // this.setUserId(res.data.userid)        //  store user id function
          this.setToken(res.data.token)
          
        }

        if (res.status === 201) {
          Alert.alert(
            "Oops",
            res.data.msg
          )
        }
      })
      .catch(err => {
        // Alert.alert(
        //   "Network Error",
        //   'Something Went Wrong'
        //   )
        console.log();
        throw err;
      });
  };





  updateInputState = (key, value) => {
    let connectedValue = {};
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,

          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (




      <View style={styles.con}>
        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

        <View style={styles.container}>

          <View style={styles.container}>


            <TextInput style={[styles.inputContainer, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.inputInvalid : null]}
              value={this.state.controls.email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
            />
            <Text style={!this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalidMsg : styles.invalidMsgFalse} >Enter Valid Email Address</Text>


            <TextInput
              value={this.state.controls.password.value}
              onChangeText={(val) => this.updateInputState('password', val)}
              style={[styles.inputContainer, !this.state.controls.password.valid && this.state.controls.password.touched ? styles.inputInvalid : null]}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
            />


            <TouchableHighlight underlayColor='#e3d8dd'
              disabled={!(this.state.controls.email.valid && this.state.controls.password.valid)}
              style={!(this.state.controls.email.valid && this.state.controls.password.valid) ? styles.buttonDisable : styles.buttonContainer}
              onPress={() => { this.signIn() }}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>



            <TouchableHighlight underlayColor='#e3d8dd' style={styles.btnsm} onPress={() => this.props.navigation.navigate('Signup')}  >
              <Text>Create New Account</Text>
            </TouchableHighlight>


          </View>



        </View>
      </View>




    );
  }
}
const styles = StyleSheet.create({
  icon: {
    margin: 5
  },
  con: {
    backgroundColor: '#EEEEEE',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },

  btnsm: {
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold'
  },

  welcome: {

    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  welcome1: {

    margin: 40,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {

    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,
    height: 45,
    backgroundColor: "red",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
  },
  buttonDisable: {
    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,

    height: 45,
    backgroundColor: "gray",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
  },



  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  inputInvalid: {
    borderLeftColor: 'red',
    borderLeftWidth: 3,

  },

  invalidMsg:
  {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    color: 'red'
  },

  invalidMsgFalse: {

    color: "#EEEEEE",
    fontSize: 12
  }


});

export default LoginScreen;