import React, { Component } from "react";
import { View, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title, ListItem } from "native-base";
import AsyncStorage from "@react-native-community/async-storage"
// import jwt from "react-native-pure-jwt";
import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;
const id = '5d84a7809456470f2444f458'
const apiGetUserDetails = `http://192.168.8.100:3000/api/user/${id}`;



class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: "Preferences", header: false },
        { name: "Account", header: false },
        { name: "Help Center", header: false },
      ],
      userData: [],
      stickyHeaderIndices: [],
      fullName: "",
      email: "",
      gender: '',
      themeColors: ''
    };
  }

  componentDidMount() {

    const id = AsyncStorage.getItem('loginUserId')
    const token = AsyncStorage.getItem('token')
    // alert(JSON.stringify(token)+'  '+JSON.stringify(id) )

    // jwt
    // .decode(
    //   token, // the token
    //   "SECRET#123", // the secret
    //   {
    //     skipValidation: true // to skip signature and exp verification
    //   }
    // )





    // const loginUserId = AsyncStorage.getItem('loginUserId')




    // axios.get("/auth/user/me").then(res => {
    //   axios.get("/users/" + res.data.id).then(res => {
    //     this.setState({
    //       fname: res.data.fname,
    //       lname: res.data.lname ? res.data.lname : "",
    //     });
    //   })
    //     .catch(err => console.log(err));
    // })
    //   .catch(err => {
    //     throw err;
    //   });

    ///////////////////////////////////////

    axios.get(apiGetUserDetails).then(res => {
      alert(res.data.name)
      this.setState({
        fullName: res.data.name,
        email: res.data.email,
        gender: res.data.gender
      });
    })
      .catch(err =>
        console.log(err)
      );




    axios.get(apiGetThemes).then(res => {
      const data = res.data;
      // alert(JSON.stringify(data))
      this.setState({ themeColors: data })
    }).catch((error) => {
      console.error(`Error reddda is : ${error}`);
    });

////////////////////////////////////////////////////////////////////




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


  renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ListItem itemDivider>
          <Left />
          <Body style={{ marginRight: 40 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          </Body>
          <Right />
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem style={{ marginLeft: 0 }}>
          <Body>
            <Text>{item.name}</Text>
          </Body>
        </ListItem>
      );
    }
  };

  render() {

    return (
      <Container>

        <Header style={{ backgroundColor: this.state.themeColors.color }}>
          <Left>
            {this.renderHeaderIcon()}
          </Left>
          <Body>
            <Title> User Profile  </Title>
          </Body>
          <Right>
            {/* <Button hasText transparent onPress={() => this.props.navigation.navigate('Dashboard1')}>
              <Text>Cancel</Text>
            </Button> */}
          </Right>
        </Header>

        <ScrollView>
          <View style={styles.fullView}>

            <View
              style={styles.imageView}
            >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProPic')}>
                <Image
                  style={styles.image}
                  source={{ uri: "https://www.gstatic.com/webp/gallery3/1.sm.png" }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 30, color: "white", paddingBottom: 10 }}>
                {this.state.fullName} User Name
              </Text>
            </View>

            <View style={styles.detailsView}>
              <TouchableOpacity style={styles.infomation}>
                <Text style={styles.text}>Email : {this.state.email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infomation}>
                <Text style={styles.text}>gender : {this.state.gender}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infomation}>
                <Text style={styles.text}>Description</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infomation}>
                <Text style={styles.text}>Address Sweet home </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView></Container>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  detailsView: {
    paddingVertical: 20,
    fontSize: 16,
    width: "100%",
    backgroundColor: "#ddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infomation: {
    width: '100%',
    paddingVertical: 20,
    fontSize: 16,
    backgroundColor: "#ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRightWidth: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 10,
    borderColor: "#ddd",

  },
  text: { marginVertical: 10, },
  imageView: {
    width: "100%",
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderColor: '#ddd',
    backgroundColor: "#bbb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 100,
    margin: 10,
    marginLeft: 10,
    width: 220,
    height: 220,
  },
  fullView: {
    backgroundColor: "#ddd",
    alignItems: "center",
    flex: 1
  }
});






















// import React, { Component } from "react";
// import { View, Image, FlatList,TouchableOpacity } from "react-native";
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Text, ListItem, Left, Body, Right, Title, Card, CardItem } from "native-base";

// class ProfileScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [
//         { name: "Preferences", header: false },
//         { name: "Account", header: false },
//         { name: "Help Center", header: false },
//       ],
//       userData: [],
//       stickyHeaderIndices: [],
//       fname: "",
//       lname: "",
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/auth/user/me")
//       .then(res => {
//         axios
//           .get("/users/" + res.data.id)
//           .then(res => {
//             console.log("Users : ");
//             console.log(res.data);
//             this.setState({
//               fname: res.data.fname,
//               lname: res.data.lname ? res.data.lname : "",
//             });
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => {
//         console.log(err);
//         throw err;
//       });
//   }

//   renderItem = ({ item }) => {
//     if (item.header) {
//       return (
//         <ListItem itemDivider>
//           <Left />
//           <Body style={{ marginRight: 40 }}>
//             <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//           </Body>
//           <Right />
//         </ListItem>
//       );
//     } else if (!item.header) {
//       return (
//         <ListItem style={{ marginLeft: 0 }}>
//           <Body>
//             <Text>{item.name}</Text>
//           </Body>
//         </ListItem>
//       );
//     }
//   };

//   render() {
//     return (
//       <View>
//         <View
//           style={{
//             width: "100%",
//             backgroundColor: "#ab0a80",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditProPic')}>
//           <Image
//             style={{
//               borderWidth: 5,
//               borderColor: "white",
//               borderRadius: 100,
//               margin: 10,
//               marginLeft: 10,
//               width: 80,
//               height: 80,
//             }}
//             source={{ uri: "https://www.gstatic.com/webp/gallery3/1.sm.png" }}
//           />
// </TouchableOpacity>
//           <Text style={{ fontSize: 30, color: "white" }}>
//             {this.state.fname + " " + this.state.lname}
//           </Text>
//         </View>
//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="contacts" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Contact</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="work" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Work</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="school" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Education</Text>
//             </Body>
//           </CardItem>
//         </Card>
//         {/* <FlatList
//                style={{marginTop: "40%"}}
//         data={this.state.data}
//         renderItem={this.renderItem}
//         keyExtractor={item => item.name}
//         stickyHeaderIndices={this.state.stickyHeaderIndices}
//       /> */}
//       </View>
//     );
//   }
// }

// export default ProfileScreen;
