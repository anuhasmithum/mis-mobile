import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
import { View, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Container, Text, Root, Icon } from 'native-base';
import AsyncStorage from "@react-native-community/async-storage"



import ProductsTheme1 from '../pages/ProductsTheme1';
import ProductsTheme2 from '../pages/ProductsTheme2';
import ProductsTheme3 from '../pages/ProductsTheme3';


import Checkout from '../../app/pages/Checkout';
import SamplePage from '../../app/pages/SamplePage';
import Receipt from '../pages/Receipt';
import Signup from '../../screens/SignupScreen';
import LoginScreen from '../../screens/LoginScreen'
import Profile from '../../screens/ProfileScreen';
import CheckAuth from '../../Utils/CheckAuth'
import EditProPic from '../../screens/EditProPicScreen'
import DisplayOneItem from '../../screens/DisplayOneItem'
import CustomDrawer from '../../Utils/CustomDrawer';


import getTheme from '../styles/theme.style';




const oneStackNavigation = createStackNavigator({
  CheckAuth: { screen: CheckAuth },
  LoginScreen: { screen: LoginScreen },
  Signup: { screen: Signup }
}, {
  initialRouteName: 'CheckAuth',
})



const ThemeDraw1 = createDrawerNavigator({
  Dashboard1: {
    screen: ProductsTheme1,
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: () => (
        <Icon name={'home'} size={25} />
      )
    }
  },
  DisplayOneItem: {
    screen: DisplayOneItem,
    navigationOptions: {
      drawerLabel: () => null
    }

  },
  Receipt: {
    screen: Receipt,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => 'Profile',
      drawerIcon: () => (
        <Icon name={'person-add'} size={25} />
      )
    }
  },

  Checkout: {
    screen: Checkout,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  EditProPic: {
    screen: EditProPic,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

},
  {
    backBehavior: 'initialRoute',
    contentComponent: (props) => (
      <SafeAreaView style={{}}>
        <View style={{ height: hp("30%"), alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground
            source={require("../assets/images/profile.jpg")}
            style={{ width: wp("65%"), height: hp("35%") }} >
            <Text style={{ marginTop: hp('27%'), marginStart: wp('20%') }}>
              Welcome back</Text>
            <Icon name={'person-add'} size={10} style={{
              marginTop: hp('0.5%'),
              marginStart: wp('45%')
            }} />


          </ImageBackground>
        </View>
        <ScrollView>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <View style={{
              width: wp('68%'), flexDirection: 'row',
              alignItems: 'center', marginTop: hp('1%')
            }}>
              <View>
                <Icon name={'power'} size={25} style={{ marginStart: wp('4.6%'), color: '#4e4e4e' }} />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: wp('3.5%'), marginStart: wp('7%'), color: '#4e4e4e' }}
                  onPress={() => {

                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('loginUserId')
                    props.navigation.navigate('LoginScreen');
                  }}
                >Logout Theme 1</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  });





const ThemeDraw2 = createDrawerNavigator({
  Dashboard2: {
    screen: ProductsTheme2,
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: () => (
        <Icon name={'home'} size={25} />
      )
    }
  },
  DisplayOneItem: {
    screen: DisplayOneItem,
    navigationOptions: {
      drawerLabel: () => null
    }

  },
  Receipt: {
    screen: Receipt,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => 'Profile',
      drawerIcon: () => (
        <Icon name={'person-add'} size={25} />
      )
    }
  },

  Checkout: {
    screen: Checkout,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  EditProPic: {
    screen: EditProPic,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

},
  {
    backBehavior: 'initialRoute',
    contentComponent: (props) => (
      <SafeAreaView style={{}}>
        <View style={{ height: hp("30%"), alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground
            source={require("../assets/images/profile.jpg")}
            style={{ width: wp("65%"), height: hp("35%") }} >
            <Text style={{ marginTop: hp('27%'), marginStart: wp('20%') }}>
              Welcome back</Text>
            <Icon name={'person-add'} size={10} style={{
              marginTop: hp('0.5%'),
              marginStart: wp('45%')
            }} />


          </ImageBackground>
        </View>
        <ScrollView>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <View style={{
              width: wp('68%'), flexDirection: 'row',
              alignItems: 'center', marginTop: hp('1%')
            }}>
              <View>
                <Icon name={'power'} size={25} style={{ marginStart: wp('4.6%'), color: '#4e4e4e' }} />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: wp('3.5%'), marginStart: wp('7%'), color: '#4e4e4e' }}
                  onPress={() => {

                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('loginUserId')
                    props.navigation.navigate('LoginScreen');
                  }}
                >Logout Theme 2</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  });


const ThemeDraw3 = createDrawerNavigator({

  Dashboard3: {
    screen: ProductsTheme3,
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: () => (
        <Icon name={'home'} size={25} />
      )
    }
  },
  DisplayOneItem: {
    screen: DisplayOneItem,
    navigationOptions: {
      drawerLabel: () => null
    }

  },
  Receipt: {
    screen: Receipt,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => 'Profile',
      drawerIcon: () => (
        <Icon name={'person-add'} size={25} />
      )
    }
  },

  Checkout: {
    screen: Checkout,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  EditProPic: {
    screen: EditProPic,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

},
  {
    backBehavior: 'initialRoute',
    contentComponent: (props) => (
      <SafeAreaView style={{}}>
        <View style={{ height: hp("30%"), alignItems: 'center', justifyContent: 'center' }}>
          <ImageBackground
            source={require("../assets/images/profile.jpg")}
            style={{ width: wp("65%"), height: hp("35%") }} >
            <Text style={{ marginTop: hp('27%'), marginStart: wp('20%') }}>
              Welcome back</Text>
            <Icon name={'person-add'} size={10} style={{
              marginTop: hp('0.5%'),
              marginStart: wp('45%')
            }} />


          </ImageBackground>
        </View>
        <ScrollView>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <View style={{
              width: wp('68%'), flexDirection: 'row',
              alignItems: 'center', marginTop: hp('1%')
            }}>
              <View>
                <Icon name={'power'} size={25} style={{ marginStart: wp('4.6%'), color: '#4e4e4e' }} />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: wp('3.5%'), marginStart: wp('7%'), color: '#4e4e4e' }}
                  onPress={() => {

                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('loginUserId')
                    props.navigation.navigate('LoginScreen');
                  }}
                >Logout Theme 3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  });







const MainNavigation = createSwitchNavigator({
  AuthStack: oneStackNavigation,
  DrawNavigator1: ThemeDraw1,
  DrawNavigator2: ThemeDraw2,
  DrawNavigator3: ThemeDraw3,

},

  {
    initialRouteName: "AuthStack",
  })



const Route = createAppContainer(MainNavigation);
export default Route;





