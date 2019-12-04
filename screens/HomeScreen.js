import React,  { Component } from "react";
import { View, Text ,Image, AppRegistry, TouchableOpacity, SectionList, StyleSheet, FlatList, Platform} from "react-native";
import Layout from '../components/Layout'
import {  Body,  Card, CardItem } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';



export default class Home extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home'
    }

    state={
      mood: "",
    
    foodsFromServer: []
    }

componentDidMount() {
      axios.get(`http://192.168.8.100:3000/api/productlist`)
          .then(res => {
              const foodsFromServer = res.data;
              this.setState({ foodsFromServer });
          })
  }  
componentDidUpdate() {
    axios.get(`http://192.168.8.100:3000/api/productlist`)
        .then(res => {
            const foodsFromServer = res.data;
            this.setState({ foodsFromServer });
        })
}


    render() {
      return (


        <View   style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <FlatList
                    ref={"flatList"}
                    data={this.state.foodsFromServer}
                    renderItem={({ item, index }) => {

                        return (
                        
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id : item._id
            
                          })}>
                            <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent:'space-around',
                              width: '98%',
                              height: 100,
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: 'white',
                              margin: 4,
                              backgroundColor: '#f2f0e9'
                            }}>
                              
                              <Image
                                source={{ uri: `http://192.168.8.100:3000/static/${item.dateTime}.${item.oriName.split('.')[item.oriName.split('.').length - 1]}` }}
                                style={{ width: 110, height: 80, margin: 5, borderRadius: 10 }}
                              >
            
                              </Image>
            
                              <View style={{
            
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '90%',
                                marginLeft: 20
            
                              }}>
                                <Text style={{
                                  fontSize:16,
                                  fontWeight: 'bold',
                                  color: 'black',
                                  margin: 6
                                }}>{item.productName}</Text>
            
                                <Text style={{
                                  fontSize: 14,
                                  margin: 4,
            
                                  color: 'black',
            
                                }}>{item.price} </Text>
                             
                              </View>

                              <TouchableOpacity
                              onPress={() => { alert(item._id) }}
                              style={{ justifyContent: 'center', }}
                            >
                              <Icon                                            
                                style={{ width: 50, height: 50, alignItems: 'flex-end', alignSelf: 'stretch', marginLeft: 5, }}
                                name='cart-plus'
                                size={30}
                              />
                            </TouchableOpacity>

                            </View>
                          </TouchableOpacity>
                        
                        );
                    }}
                    keyExtractor={(item, index) => item.name}
                >
                </FlatList>

            </View>      
      );
    }
  }


const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});