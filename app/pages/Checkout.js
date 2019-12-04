import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native'
import CheckoutItems from '../components/CheckoutItems.component';
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import getTheme from '../styles/theme.style'

import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;


export class Checkout extends Component {

    state = {
        themeColors: ''

    }

    componentDidMount = () => {
        axios.get(apiGetThemes).then(res => {
            const data = res.data;
            this.setState({ themeColors: data })
        }).catch((error) => {
            console.error(`Error reddda is : ${error}`);
        });
    }

    renderHeaderIcon = () => {
        
        if (this.state.themeColors.theme === 'theme1') {
            return (

                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard1')} />

            )
        }
        else if (this.state.themeColors.theme === 'theme2') {
            return (

                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard2')} />

            )
        }
        else if (this.state.themeColors.theme === 'theme3') {
            return (

                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard3')} />

            )
        }
    }

    render() {
        const { cartItems, navigation, cartTotal } = this.props;
        // const headerColors = {headerColor}.color
        // const statusbarcolor = {headerColor}.statusbarcolor
        return (
            <Container>

                <Header style={{ backgroundColor: this.state.themeColors.color }}>
                    <Left>
                        {this.renderHeaderIcon()}
                    </Left>
                    <Body>
                        <Title>Checkout </Title>
                    </Body>
                    <Right>
                        {/* <Button hasText transparent onPress={() => this.props.navigation.navigate('Dashboard3')}>
                            <Text>Cancel</Text>
                        </Button> */}
                    </Right>
                </Header>

                <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />
                <CheckoutItems cartItems={cartItems} cartTotal={cartTotal} navigation={navigation} />

            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    cartTotal: state.cart.total
});


export default connect(
    mapStateToProps
)(Checkout);
