import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import getTheme from '../styles/theme.style';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class ProductTheme2 extends Component {

    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container }>


                <Left style={{ justifyContent: 'space-around', marginHorizontal: 5, }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Image
                            source={{ uri: `http://192.168.8.100:3000/static/${item.dateTime}.${item.oriName.split('.')[item.oriName.split('.').length - 1]}` }}
                            style={{ width: 140, height: 80, margin: 5, borderRadius: 10 }}
                        >

                        </Image>
                    </TouchableOpacity>
                </Left>
                <Body style={{ width: 200, marginHorizontal: 5, }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', margin: 6, width: 150 }}>{item.productName}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, margin: 4, color: 'black', width: 150 }}>Rs. {item.price}/= </Text>
                    {/* Rs.{(item.price).toFixed(2)} */}
                </Body>
                <Right style={{ alignItems: 'flex-end', width: 60 }}>
                    <TouchableOpacity
                        onPress={this.addToCart} //alert(item._id);
                        style={{ justifyContent: 'center', width: 60 }}
                    >
                        <Icon                                                // add to cart icon here
                            style={{ width: 50, height: 50, alignItems: 'flex-end', alignSelf: 'stretch', marginLeft: 5, }}
                            name='cart-plus'
                            size={30}
                        />
                    </TouchableOpacity>
                </Right>


            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        height: 220, 
        marginHorizontal: 8, 
        backgroundColor: '#46c',
        paddingVertical:25,
        borderRadius:10
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: 'pink'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    }

});
export default ProductTheme2;



