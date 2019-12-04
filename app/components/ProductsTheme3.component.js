import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import getTheme from '../styles/theme.style';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class ProductTheme3 extends Component {

    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container}>
                <Left >

                </Left>
                <Body style={{ width: 100, marginHorizontal: 5, }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Image
                            source={{ uri: `http://192.168.8.100:3000/static/${item.dateTime}.${item.oriName.split('.')[item.oriName.split('.').length - 1]}` }}
                            style={{ width: 200, height: 120, margin: 5, borderRadius: 10 }}
                        >

                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DisplayOneItem', { _id: item._id })}>
                        <Text style={styles.text1}>{item.productName}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text2}>Rs. {item.price}/= </Text>
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
                    </View>
                </Body>



                <Right style={{ alignItems: 'flex-start', width: 60, marginTop: 0 }}>

                </Right>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 220,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        paddingVertical: 25,
        borderRadius: 10,
        justifyContent: 'space-around'
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
    text2: { fontSize: 12, margin: 4, color: 'black', width: 80 },
    text1: { fontSize: 20, fontWeight: 'bold', color: 'black', margin: 6, width: 150, }


});
export default ProductTheme3;



