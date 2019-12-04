import React, { Component } from 'react';
import { View, StyleSheet, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import Product from '../components/ProductsTheme1.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../../android/redux/actions/productAction';
import Cart from '../components/Cart.component';
import axios from 'axios';

import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Right,
  Text,
  Title
} from 'native-base';


class SamplePage extends Component {

  static navigationOptions = ({ navigation }) => {
    return {

      headerTitle: 'Products',
      headerRight: <Cart navigation={navigation}/>
    }
  }
  constructor(props) {
    super(props);
  }

  addToCart = () => {
    this.props.addItemsToCart(this.props.item)
  }

  componentDidMount = () => {

    this.props.fetchProducts();
  }
  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }
  render() {
    const { products, navigation } = this.props
    return (

    <Container>
      <Header>
        <Left>
          <Button hasText transparent>
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
          <Title>Theme 1</Title>
        </Body>
        <Right>
          <Button hasText transparent>
            <Text>Cancel</Text>
          </Button>
        </Right>
      </Header>
    </Container>



    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(SamplePage);












