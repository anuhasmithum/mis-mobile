import React, { Component } from "react";
import { View, Image } from "react-native";
import { Button, Text, Container, Header, Left, Body, Right, Title, Icon } from "native-base";

import axios from "axios"
const apiGetThemes = `http://192.168.8.100:3000/api/getTheme`;

class EditProPicScreen extends Component {
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

//   renderHeaderIcon = () => {
        
//     if (this.state.themeColors.theme === 'theme1') {
//         return (

//             <Icon name="arrow-back" style={{ color: 'white' }}
//                 onPress={() => this.props.navigation.navigate('Dashboard')} />

//         )
//     }
//     else if (this.state.themeColors.theme === 'theme2') {
//         return (

//             <Icon name="arrow-back" style={{ color: 'white' }}
//                 onPress={() => this.props.navigation.navigate('Dashboard2')} />

//         )
//     }
//     else if (this.state.themeColors.theme === 'theme3') {
//         return (

//             <Icon name="arrow-back" style={{ color: 'white' }}
//                 onPress={() => this.props.navigation.navigate('Dashboard3')} />

//         )
//     }
// }

  render() {
    return (
      <>

        <Container id="parentView" style={{ flex: 1 }}>
          <Header style={{ backgroundColor: this.state.themeColors.color }}>
            <Left>
            <Icon name="arrow-back" style={{ color: 'white' }}
                onPress={() => this.props.navigation.navigate('Profile')} />
            </Left>
            <Body>
              <Title> Brows Image </Title>
            </Body>
            <Right>
              {/* <Button hasText transparent onPress={() => this.props.navigation.navigate('Profile')}>
                <Text>Cancel</Text>
              </Button> */}
            </Right>
          </Header>

          <View
            id="childView"
            style={{
              flex: 1,
              //   justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                style={{
                  borderWidth: 5,
                  borderColor: "white",
                  borderRadius: 100,
                  marginTop: 30,
                  width: 200,
                  height: 200,
                }}
                source={{
                  uri: "https://www.gstatic.com/webp/gallery3/1.sm.png",
                }}
              />
              <Button success style={{ marginTop: 30, width: "90%" }}>
                <Text>Update Profile Picture</Text>
              </Button>
            </View>
          </View>
          <View id="childViewTwo">
            <Text>Don't center me</Text>
          </View>
        </Container>
      </>
    );
  }
}

export default EditProPicScreen;
