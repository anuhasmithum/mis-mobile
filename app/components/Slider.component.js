import React, { Component } from 'react';
import { StyleSheet, View, Platform, } from 'react-native';
import Slideshow from 'react-native-slideshow';
import axios from "axios";
const apiGetSliderProps = `http://192.168.8.100:3000/api/getsimg`;



export default class Slider extends Component {
    constructor() {
        super();
        this.state = {
            position: 1,
            interval: null,
            dataArray: [],
            dataProps: []
        };
    }
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === sliderProps.imagesArray.length ? 0 : this.state.position + 1
                });
            }, 3000)
        });

        this.renderPropsFromServer().then(res => {
            this.renderSliderProps(res);
        })

    }

    componentWillUnmount() {
        clearInterval(this.state.interval);

        this.renderPropsFromServer().then(res => {
            this.renderSliderProps(res);
        })
    }

    ////////////////////////////////////////////////////////////

    renderPropsFromServer = async () => {
        const res = await axios.get(apiGetSliderProps);
        return res.data
    }

    renderSliderProps = (res) => {

        const dataArrays = []
        // alert(JSON.stringify(res) + 'there are renderSliderProps')                 // work
        this.setState({ dataProps: res })
        const data = this.state.dataProps
        // alert(JSON.stringify(data))

        for (i = 0; i < data.length; i++) {
            const newObj = {                                                            // Change your required detail here
                url: `http://192.168.8.100:3000/api/imgs/${this.state.dataProps[i].img}`,
                title: this.state.dataProps[i].title,
                caption: this.state.dataProps[i].description
            }
            dataArrays.push(newObj);
            // alert(JSON.stringify(dataArrays)+"ssssssssssssss")
        }
        this.setState({ dataArray: dataArrays })
    }
    
/////////////////////////////////////////////////////////////////

    render() {
        // const images = sliderProps.imagesArray;
        return (
            <View style={styles.MainContainer}>
                <Slideshow
                    dataSource={this.state.dataArray}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({ position })}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        backgroundColor: '#FFF8E1'
    }
});



