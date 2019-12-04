import React, { Component } from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import { connect } from 'react-redux';
import OrderSummary from '../components/OrderSummary.component';
import Cart from '../components/Cart.component';
import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;


class Receipt extends Component {

    state = {
        themeColors: ''
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Purchase Details',
            headerRight: <Cart navigation={navigation} />
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


    getTotal() {
        let total = 0;
        const { items } = this.props;

        for (let i = 0; i < items.length; i++) {
            total = total + items[i].price
        }

        return <Text style={styles.totText}>Total: Rs. {total}/=</Text>
        // <Text style={styles.totText}>Total: ${(total).toFixed(2)}</Text>
    }

    renderHeaderIcon = () => {
        
        if (this.state.themeColors.theme === 'theme1') {
            return (

                <Icon name="arrow-back" style={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('Dashboard')} />

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
        const headerColor = 'black'
        const statusbarcolor = 'black'
        const { customer, items, navigation } = this.props;
        return (

            <Container>
                <Header style={{ backgroundColor: this.state.themeColors.color }}>
                    <Left>
                       {this.renderHeaderIcon()}
                    </Left>
                    <Body>
                        <Title>Purchase Details</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent onPress={() => this.props.navigation.navigate('Dashboard1')}>
                            <Text>ok</Text>
                        </Button>
                    </Right>
                </Header>



                <View style={styles.container}>
                    <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />
                    {/* <View style={styles.headings}>
                        <Text>Invoice for your purchase</Text>
                    </View> */}
                    <View style={styles.billings}>
                        <Text style={styles.billtext}>Billing details</Text>
                        <Text style={styles.text}>{customer.name}</Text>
                        <Text style={styles.text}>{customer.phone}</Text>
                        <Text style={styles.text}>{customer.email}</Text>
                        <Text style={styles.text}>{customer.street}</Text>
                    </View>


                    <View style={styles.orderSumm}>
                        <Text style={styles.billtext}>Order summary</Text>
                        <FlatList
                            data={items}
                            renderItem={({ item }) =>

                                <OrderSummary item={item} />
                            }
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />}
                        />

                        {this.getTotal()}

                    </View>
                </View>


            </Container>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headings: {
        backgroundColor: '#34495e90',
        padding: 12,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderSumm: {
        flex: 1,
        margin: 10
    },
    billtext: {
        padding: 6,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'pink',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    text: {
        marginLeft: 40,
        marginVertical: 5
    },
    billings: {
        height: 180,
        margin: 10
    },
    totText: {
        textAlign: 'center',
        color: 'red'
    }
});
const mapStateToProps = (state) => ({
    customer: state.order.order.customer,
    items: state.order.order.items
})
export default connect(mapStateToProps)(Receipt);
