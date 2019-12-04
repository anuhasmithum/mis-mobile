
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import ProductTheme2 from '../components/ProductsTheme2.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../../android/redux/actions/productAction';
import Cart from '../components/Cart.component';
import Search from '../components/Search.component'
import { Body, Container, Header, Icon, Left, Title, Right, } from "native-base";
import Slider from '../components/Slider.component';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;



class ProductsTheme2 extends Component {

  constructor(props) {
    super(props);
  }
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


    this.props.fetchProducts();
  }
///////////////////////////////////////////////////

  addToCart = () => {
    this.props.addItemsToCart(this.props.item)
  }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }

  /////////////////////////////////////////////////

  renderHeader = () => {
    const { navigation } = this.props

    return (
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
    )
  }

  renderSlider = () => {

    if (false) {
      return (
        <View style={{ flex: 1, height: 130 }}>
          <Slider></Slider>
        </View>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }
//////////////////////////////////////////////////////////////

  // renderItem = ({ item }) => {
  //   const { navigation, products } = this.props
  //   if (item.price === "100") {
  //     return (
  //       // <View style={{ height: 30, backgroundColor: 'blue' }}>
  //       //   <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>price equil to 100</Text>
  //       // </View>
  //       <ProductTheme2 item={item} addItemsToCart={this.addItemsToCart} product={item} />
  //     );
  //   }
  //   else {
  //     return (
  //       <View style={{ flexDirection: 'row' }}>
  //         <Left>
  //           <FlatList
  //             data={products}
  //             horizontal={true}
  //             renderItem={
  //               ({ item }) =>
  //                 <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
  //             }
  //             keyExtractor={(item) => item.id}
  //             ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
  //           />
  //           {/* <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} /> */}
  //         </Left>
  //         <Body>
  //           <FlatList
  //             data={products}
  //             renderItem={
  //               ({ item }) =>
  //                 <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
  //             }
  //             keyExtractor={(item) => item.id}
  //             ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
  //           />
  //           {/* <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} /> */}
  //         </Body>
  //         <Right>
  //           <FlatList
  //             data={products}
  //             renderItem={
  //               ({ item }) =>
  //                 <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
  //             }
  //             keyExtractor={(item) => item.id}
  //             ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
  //           />
  //           {/* <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} /> */}
  //         </Right>

  //         {/* <ProductTheme2 item={item} addItemsToCart={this.addItemsToCart} product={item} /> */}
  //       </View>
  //     );
  //   }
  // };




  render() {
    const { products, navigation } = this.props

    return (

      <Container style={{ justifyContent: 'space-around' }}>
        {this.renderHeader()}

        <View style={{ height: 55, }}>
          <Search ></Search>
        </View>
        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

        <ScrollView >

          {this.renderSlider()}

          <View style={styles.body}>
            <FlatList
              data={products}
              horizontal={false}
              renderItem={
                // this.renderItem
                ({ item }) =>
                  <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
            />
          </View>

          <Text>ProductsTheme 2</Text>

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
    flex: 1,
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 1

  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme2);












