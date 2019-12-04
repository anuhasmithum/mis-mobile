import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addOrder } from '../redux/actions/orderAction';
import { emptyCart } from '../../app/redux/actions/cartActions';
// import { sendOrderToBackend } from '../styles/sendOrder';

import axios from 'axios';
const apiInsertOrder = `http://192.168.8.100:3000/api/addOrder`;


class CustomerForm extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        street: '',
        orderArray: []
    }


    //////////////////////////////////////             // send order details to server 

    getOrderArray = () => {
        let orderArray = [];
        const { cartItems } = this.props;

        for (let i = 0; i < cartItems.length; i++) {
            let name = cartItems[i]._id
            orderArray[i] = { 'productId': name, 'quantity': 1 }
            // orderArray = orderArray.concat({temp},'1')
        }
        // alert(JSON.stringify(orderArray))
        this.setState({ orderArray });
        this.sendOrderToBackend(orderArray)
    }

    ///////////////////////////////////////////////////////////////////////////////


    sendOrderToBackend = (orderArray) => {
        // alert(orderArray)
        axios
            .post(apiInsertOrder, {
                customername: this.state.name,
                email: this.state.email,
                telephone: this.state.phone,
                deliveraddress: this.state.street,
                orderitems: orderArray

            })
            .then(res => {
                if (res.status === 200) {
                    //   Alert.alert(
                    //     "Hi",
                    //     "order Pass Successfully"
                    //   )
                    this.onPressButton()
                }else{
                    alert("Error : order didnt pass to server")
                }

            })
            .catch(err => {
                console.log(err);
                throw err;
            });

    };


    ///////////////////////////////////////////////////////////////////////////////

    onPressButton = () => {
        const { name, phone, email, street } = this.state;
        const { cartItems, navigation, addOrder, emptyCart } = this.props;

        if (name === '') { return Alert.alert('enter name') }
        if (phone === '') { return Alert.alert('enter phone') }
        if (email === '') { return Alert.alert('enter email') }
        if (street === '') { return Alert.alert('enter street') }
        let customer = { name: name, phone: phone, email: email, street: street }

        addOrder({ cartItems: cartItems, customer: customer });

        emptyCart();
        this.setState({ name: '' });
        this.setState({ phone: '' });
        this.setState({ email: '' });
        this.setState({ street: '' });

        // this.sendOrderToBackend;           // call sendOrder To Backend function

        navigation.navigate('Receipt');


    }


    renderButton() {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.getOrderArray}>
                <Text style={styles.btnText}>proceed to checkout</Text>
            </TouchableOpacity>
        );
    }

    renderTextfield(options) {
        return (
            <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
                placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
        );
    }



    render() {
        return (
            <View style={styles.panel}>
                {this.renderTextfield({ name: 'name', label: 'Your name' })}
                {this.renderTextfield({ name: 'phone', label: 'Your phone number', keyboard: 'phone-pad' })}
                {this.renderTextfield({ name: 'email', label: 'Your email address', keyboard: 'email-address' })}
                {this.renderTextfield({ name: 'street', label: 'Your street' })}
                {this.renderButton()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10
    },
    textField: {
        height: 40,
        margin: 8
    },
    btn: {
        backgroundColor: '#34495e',
        borderRadius: 3,
        padding: 12,
        flex: 1,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    }
});
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, { addOrder, emptyCart })(CustomerForm);