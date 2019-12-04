
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ProductTheme3 from '../components/ProductsTheme3.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../../android/redux/actions/productAction';
import Cart from '../components/Cart.component';
import Search from '../components/Search.component'
import { Body, Container, Header, Icon, Left, Title, Right, } from "native-base";
import Slider from '../components/Slider.component';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;
import { SearchBar } from 'react-native-elements';


class ProductsTheme3 extends Component {

  constructor(props) {
    super(props);
    this.arrayholder = [];
  }
  state = {
    themeColors: '',
    isLoading: true,
    search: '',
    function() {
      this.arrayholder = responseJson;
    }
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


  renderHeader = () => {
    const {navigation} = this.props
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

  SearchFilterFunction(text) {
    const {product} = this.props
    //passing the inserted text in textinput
    const newData = product.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.productName ? item.productName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });

  }


  render() {
    const { products, navigation } = this.props

    // if (this.state.isLoading) {
    //   //Loading View while data is loading
    //   return (
    //     <View style={{ flex: 1, paddingTop: 20 }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (

      <Container style={{ flexDirection: 'column', }}>

        {this.renderHeader()}

        <View style={{ height: 55, }}>
          {/* <Search ></Search> */}
          <SearchBar
              round
              searchIcon={{ size: 24 }}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              placeholder="Type Here..."
              value={this.state.search}
            />
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
                <ProductTheme3 navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
              enableEmptySections={true}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
            />
          </View>

          <Text>ProductsTheme 3</Text>

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
export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme3);




































// import React, { Component } from 'react';
// import { View, StyleSheet, FlatList, } from 'react-native';
// import { connect } from 'react-redux';
// import Product from '../components/Product.component';
// import { addToCart } from '../redux/actions/cartActions';
// import { fetchProducts } from '../../android/redux/actions/productAction';
// import Cart from '../components/Cart.component';
// import axios from 'axios';

// import {
//   Container,
//   Header,
//   Left,
//   Button,
//   Body,
//   Right,
//   Text,
//   Title
// } from 'native-base';


// class ProductsTheme2 extends Component {

//   static navigationOptions = ({ navigation }) => {
//     return {

//       headerTitle: 'Products',
//       headerRight: <Cart navigation={navigation}/>
//     }
//   }
//   constructor(props) {
//     super(props);
//   }

//   addToCart = () => {
//     this.props.addItemsToCart(this.props.item)
//   }

//   componentDidMount = () => {

//     this.props.fetchProducts();
//   }
//   addItemsToCart = (product) => {
//     this.props.addToCart(product);
//   }
//   render() {
//     const { products, navigation } = this.props
//     return (

//     <Container>
//       <Header>
//         <Left>
//           <Button hasText transparent>
//             <Text>Back</Text>
//           </Button>
//         </Left>
//         <Body>
//           <Title>Theme Screen 3</Title>
//         </Body>
//         <Right>
//           <Button hasText transparent>
//             <Text>Cancel</Text>
//           </Button>
//         </Right>
//       </Header>
//     </Container>



//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center'
//   }
// });
// const mapStateToProps = (state) => ({
//   products: state.products.items
// })
// export default connect(mapStateToProps, { addToCart, fetchProducts })(ProductsTheme2);












