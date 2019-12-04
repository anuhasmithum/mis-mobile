import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import Cart from '../app/components/Cart.component';
import { connect } from 'react-redux';
import { addToCart } from '../app/redux/actions/cartActions';
import { fetchProducts } from '../android/redux/actions/productAction';
import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;


class DisplayOneItem extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        foodsFromServer: '',
        spinnerVisible: false,
        themeColors: ''
    }

    componentDidMount() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`http://192.168.8.100:3000/api/product/${_id}`)
            .then(res => {
                const foodsFromServer = res.data;
                this.setState({ foodsFromServer });
            })

        axios.get(apiGetThemes).then(res => {
            const data = res.data;
            this.setState({ themeColors: data })
        }).catch((error) => {
            console.error(`Error reddda is : ${error}`);
        });

    }

    componentDidUpdate() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`http://192.168.8.100:3000/api/product/${_id}`)
            .then(res => {
                const foodsFromServer = res.data;
                this.setState({ foodsFromServer });
            })
    }

    addToCart = () => {
        this.props.addItemsToCart(this.state.foodsFromServer)
    }

    addItemsToCart = (product) => {
        addToCart(product);
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
        //const item = this.props
        const { navigation } = this.props

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#eee' }}>
                <Container>
                    <Header style={{ backgroundColor: this.state.themeColors.color }}>
                        <Left>
                            {this.renderHeaderIcon()}
                        </Left>
                        <Body>
                            <Title>View</Title>
                        </Body>
                        <Right>
                            <Cart navigation={navigation} style={{ alignItems: 'center' }} />
                        </Right>
                    </Header>

                    <View style={{ flex: 1, flexDirection: 'column', }}>
                        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />
                        <View style={styles.imageViewStyle}>
                            <TouchableOpacity style={styles.imageStyle}>
                                <Image
                                    source={{ uri: `http://192.168.8.100:3000/static/${this.state.foodsFromServer.dateTime}.${typeof this.state.foodsFromServer.oriName === "string" ? this.state.foodsFromServer.oriName.split('.')[this.state.foodsFromServer.oriName.split('.').length - 1] : ""}` }}
                                    style={{ width: '100%', height: '100%', }}
                                >
                                </Image>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white' }}>

                                <View style={styles.imageTextStyle}>
                                    <Text style={{ fontSize: 22, padding: 5 }}>{this.state.foodsFromServer.productName}</Text>
                                    <Text style={{ fontSize: 16, padding: 5 }}>{this.state.foodsFromServer.price} $</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => { this.addItemsToCart(this.state.foodsFromServer) }}
                                    style={{ justifyContent: 'center', }}
                                >
                                    <Icon
                                        style={{
                                            width: 50, height: 50, backgroundColor: 'white',
                                            alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center'
                                        }}
                                        name='cart-plus'
                                        size={45}

                                    //actions={[{ title: 'Settings', iconName: "cart-plus", show: 'always' }]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.descriptionView}>

                            <Text style={styles.description}>{this.state.foodsFromServer.description}</Text>
                            <Text style={styles.description}>{this.state.foodsFromServer.oriName} </Text>
                            <Text style={styles.description}>{this.state.foodsFromServer.description}</Text>
                            <Text style={styles.description}>{this.state.foodsFromServer.oriName} </Text>
                        </View>

                    </View>
                </Container>
            </ScrollView>

        );
    }
}
// alert(this.state.foodsFromServer)
const mapStateToProps = (state) => ({

    products: state.foodsFromServer

})
export default connect(mapStateToProps, { addToCart, fetchProducts })(DisplayOneItem);


const styles = StyleSheet.create({

    imageViewStyle: {
        flexDirection: 'column', height: 420, marginHorizontal: 10,
        justifyContent: 'center', marginVertical: 5,
        alignItems: 'center', borderWidth: 2, borderColor: '#bbb',
    },
    imageStyle: {
        height: 320,
        backgroundColor: 'green', justifyContent: 'center',
        alignItems: 'center', width: '100%',
    },
    imageTextStyle: {
        height: 100,
        justifyContent: 'center',
        width: '85%',
        padding: 10

    },
    description: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
    descriptionView: {
        backgroundColor: '#eee', borderWidth: 2, borderColor: '#bbb',
        flexDirection: 'column',
        marginHorizontal: 10,
        height: 'auto',
    }
});



















// import React, {Component} from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
                // import axios from 'axios';
// import {ScrollView} from 'react-native-gesture-handler';
// import {Spinner} from 'native-base';
// export default class DisplayOneItem extends Component {

//     constructor(props) {
//         super(props);
//         // const { navigation } = this.props;
//         //  productId = navigation.getParam('_id', '0');

//     }

//     state = {
//         foodsFromServer: [],

//     }

// componentDidMount() {
//         const _id = this.props.navigation.getParam('_id','');
//         axios.get(`http://192.168.8.101:3000/api/product/${_id}`)
//             .then(res => {
//                 const foodsFromServer = res.data;
//                 this.setState({ foodsFromServer });
//             })

//                     }

// componentDidUpdate() {
//         const _id = this.props.navigation.getParam('_id','');
//         axios.get(`http://192.168.8.101:3000/api/product/${_id}`)
//             .then(res => {
//                 const foodsFromServer = res.data;
//                 this.setState({ foodsFromServer });
//             })


//       }


//     render() {
//         return (
//             <ScrollView style={{ flex: 1, backgroundColor: '#ccc' }}>


//             <View style={{ flex: 1, flexDirection: 'column', borderRadius: 10 }}>

//                     <View style={styles.imageViewStyle}>
//                         <TouchableOpacity style={styles.imageStyle}>
//                             <Image
//                                 source={{ uri: `http://192.168.8.101:3000/static/${this.state.foodsFromServer.dateTime}.${ typeof this.state.foodsFromServer.oriName==="string" ?this.state.foodsFromServer.oriName.split('.')[this.state.foodsFromServer.oriName.split('.').length-1]:""}` }}      
//                                 style={{ width:'100%', height: '100%', }}
//                             >
//                             </Image>
//                         </TouchableOpacity>

//                         <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white' }}>

//                             <View style={styles.imageTextStyle}>
//                                 <Text>{this.state.foodsFromServer.productName}</Text>
//                                 <Text>{this.state.foodsFromServer.price} $</Text>
//                                 <Text>{this.state.foodsFromServer.dateTime} </Text>
//                                 <Text>{this.state.foodsFromServer.oriName} </Text>
//                             </View>

//                             <TouchableOpacity  //onPress={alert( `${this.state.foodsFromServer.productName} added to cart`)}
//                                 style={{ justifyContent: 'center', }}
//                             >
//                                 <Image                                                // add to cart icon here
//                                     style={{ width: 50, height: 50, }}

//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     <View style={styles.descriptionView}>

//                         <Text style={styles.description}>{this.state.foodsFromServer.description}</Text>
//                         <Text style={styles.description}>{this.state.foodsFromServer.oriName} </Text>
//                         <Text style={styles.description}>{this.state.foodsFromServer.description}</Text>
//                         <Text style={styles.description}>{this.state.foodsFromServer.oriName} </Text>
//                     </View>

//                 </View>
//             </ScrollView>

//         );
//     }
// }

// const styles = StyleSheet.create({

//     imageViewStyle: {
//         flexDirection: 'column', height: 420, margin: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     imageStyle: {
//         height: 320,
//         backgroundColor: 'green', justifyContent: 'center',
//         alignItems: 'center', width: '100%',
//     },
//     imageTextStyle: {
//         height: 100,
//         justifyContent: 'center',
//         width: '85%',
//         padding: 10

//     },
//     description: {
//         color: 'black',
//         padding: 10,
//         fontSize: 20,
//     },
//     descriptionView: {
//         backgroundColor: '#eee',
//         flexDirection: 'column',
//         marginHorizontal: 15,
//         height: 'auto',
//     }
// });

