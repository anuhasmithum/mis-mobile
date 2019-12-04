import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import ProductTheme1 from '../components/ProductsTheme1.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../../android/redux/actions/productAction';
import Cart from '../components/Cart.component';
import Search from '../components/Search.component'
import { Body, Container, Header, Icon, Left, Title, Right, } from "native-base";
import Slider from '../components/Slider.component';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getTheme } from '../styles/theme.style';

import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;


class ProductsTheme1 extends Component {

  constructor(props) {
    super(props);

  }
  state = {
    themeColors: ''

  }

  addToCart = () => {
    this.props.addItemsToCart(this.props.item)
  }

  componentDidMount = () => {

    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });


    this.props.fetchProducts();
  }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }





  render() {
    const { products, navigation } = this.props
    //   const headerColor = getTheme.color  //'getTheme.statusbarcolor'
    // const statusbarcolor = "black"
    //  // alert(this.statusbarcolor)

    return (

      <Container style={{ flexDirection: 'column', }}>

        <Header style={{ backgroundColor: this.state.themeColors.color }} >

          <Left style={{ flexDirection: 'row' }}>
            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
          </Left>
          
          <Body style={{ flex: 1 }}>
            <Title>New Products</Title>
          </Body>

          <Right style={{ flexDirection: 'row', }}>
            <Cart navigation={navigation} style={{ alignItems: 'center' }} />
          </Right>
        </Header>

        {/* </View> */}

        <View style={{ height: 55, }}>
          <Search ></Search>
        </View>
        <ScrollView >
          <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />
          <View style={{ height: 130 }}>
            <Slider></Slider>
          </View>

          <View style={styles.body}>
            <FlatList
              data={products}
              renderItem={({ item }) =>
                <ProductTheme1 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
            />
          </View>
          {/* <TouchableOpacity onPress={getTheme()}> */}
          <Text>ProductsTheme 1</Text>
          {/* </TouchableOpacity> */}
        </ScrollView>
      </Container>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  body: {
    marginTop: 75,

    paddingVertical: 1

  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme1);












