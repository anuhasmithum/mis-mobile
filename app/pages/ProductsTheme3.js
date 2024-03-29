
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductTheme3 from '../components/ProductsTheme3.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productAction';
import Cart from '../components/Cart.component';
import { Body, Container, Header, Icon, Left, Title, Right, } from "native-base";
import { SearchBar } from 'react-native-elements';
import Slider from '../components/Slider.component';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios"
import property from '../../config'

const apiGetThemes = `${property.BASE_URL}getTheme`;

class ProductsTheme3 extends Component {

  constructor(props) {
    super(props);
    this.arrayholder = [];
  }
  state = {
    themeColors: '',
    isLoading: true,
    search: '',
    searchedDta: []
  }


  componentDidMount = () => {
    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });

    this.props.fetchProducts();

    axios.get(`${property.BASE_URL}productlist`)
      .then(res => {

        const dataProducts = res.data;
        this.setState({ dataSource: dataProducts, searchedDta: dataProducts })

      }).catch((error) => {
        console.error(`Error reddda is : ${error}`);
      });

  }

  addToCart = () => {
    this.props.addItemsToCart(this.props.item)
  }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }

  SearchFilterFunction(text) {
    const products = this.state.searchedDta
    const newData = products.filter(function (item) {
      const itemData = item.productName ? item.productName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
      isLoading: false
    });
  }

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

    if (this.state.themeColors.sbox) {
      return (
        <View style={{ flex: 1, height: 'auto' }}>
          <Slider></Slider>
        </View>
      )
    }
  }

  renderFooter = () => {
    return (
      <View
        style={{ paddingVertical: 3, borderTopWidth: 1, borderColor: "#aaa", backgroundColor: '#ccc' }}
      >
        <ActivityIndicator animating size='small' />
      </View>
    )
  }

  render() {
    const { products, navigation } = this.props

    return (

      <Container style={{ flexDirection: 'column', }}>

        {this.renderHeader()}
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          containerStyle={{ backgroundColor: this.state.themeColors.color, }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

          {this.renderSlider()}

          <View style={styles.body}>


            <FlatList
              data={this.state.dataSource}
              numColumns={2}
              renderItem={({ item }) =>
                <ProductTheme3 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
              enableEmptySections={true}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
              ListFooterComponent={this.renderFooter()}
            />
          </View>
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
    marginTop: 10,
    margin: 12,
    paddingVertical: 1

  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme3);
