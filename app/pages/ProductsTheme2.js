
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import ProductTheme2 from '../components/ProductsTheme2.component';
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

class ProductsTheme2 extends Component {

  constructor(props) {
    super(props);

  }
  state = {
    themeColors: '',
    isLoading: false,
    search: '',
    refreshing: false,
    searchedDta: []
  }

  componentDidMount = () => {
    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });

    this.props.fetchProducts()

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

  renderFooter = () => {
    return (
      <View style={{ paddingVertical: 3, borderTopWidth: 1, borderColor: "#aaa", backgroundColor: '#ccc' }}>
        <ActivityIndicator animating size='small' />
      </View>
    )
  }

  render() {
    const { navigation, products } = this.props
    return (
      <Container style={{ justifyContent: 'space-around' }}>
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

        <StatusBar backgroundColor={this.state.themeColors.statusbarcolor} barStyle="light-content" />

        <ScrollView showsVerticalScrollIndicator={false}>

          {this.renderSlider()}

          <View style={styles.body}>

            <FlatList
              data={this.state.dataSource}
              horizontal={false}
              renderItem={
                ({ item }) =>
                  <ProductTheme2 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
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
    alignItems: 'center',
    paddingVertical: 2,
    marginHorizontal: '1.6%',
    width: '97%'

  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme2);
