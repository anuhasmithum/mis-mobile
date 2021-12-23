import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Slideshow from 'react-native-slideshow';
import axios from "axios";
import property from '../../config'

const apiGetSliderProps = `${property.BASE_URL}getsimg`;

export default class Sliders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            interval: null,
            dataArray: [],
            dataProps: [],
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    index: this.state.index === this.state.dataArray.length ? 0 : this.state.index + 1
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

    renderIndex = () => {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    index: this.state.index === this.state.dataArray.length ? 0 : this.state.index + 1
                });
            }, 3000)
        });
    }

    renderPropsFromServer = async () => {
        const res = await axios.get(apiGetSliderProps);
        return res.data
    }

    renderSliderProps = (res) => {
        const dataArrays = []
        this.setState({ dataProps: res })
        const data = this.state.dataProps
        for (i = 0; i < data.length; i++) {
            dataArrays.push(`${property.BASE_URL}imgs/${this.state.dataProps[i].img}`);
        }
        this.setState({ dataArray: dataArrays })
    }

    render() {
        return (
            <View style={styles.container}>
                <Slideshow
                    images={this.state.dataArray}
                    sliderBoxHeight={150}
                    index={this.state.index}
                    onPositionChanged={position => this.setState({ position })}
                    onCurrentImagePressed={index =>
                        this.renderIndex()
                    }
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    circleLoop
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#239'
    }
});
