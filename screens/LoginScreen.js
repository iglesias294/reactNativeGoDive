import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    Keyboard
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base'
const SCREEN_HEIGHT = Dimensions.get('window').height
export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            placeholderText: 'Enter your mobile number'
        }
    }
    componentWillMount() {
        this.loginHeight = new Animated.Value(150)
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
            this.keyboardWillShow)
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
            this.keyboardWillHide)


        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)
    }


    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration + 100,
                toValue: event.endCoordinates.height + 10
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: event.duration,
                toValue: 1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: event.duration,
                toValue: 1
            })
        ]).start()
    }
    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration + 100,
                toValue: 0
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: event.duration,
                toValue: 0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: event.duration,
                toValue: 0
            })
        ]).start()
    }
    increaseHeightofLogin = () => {
        this.setState({ placeholderText: '092123456789' })
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus()
        })
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue: 150,
            duration: 500
        }).start()
    }
    render() {

        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })

        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 100]
        })

        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })


        return (
            <View style={{ flex: 1, }}>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60,
                        width: 60,
                        top: 60,
                        left: 25,
                        zIndex: 100,
                        opacity: headerBackArrowOpacity
                    }}>
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}>
                        <Icon name="md-arrow-back" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        right: 10,
                        bottom: this.keyboardHeight,
                        opacity: this.forwardArrowOpacity,
                        zIndex: 100,
                        backgroundColor: '#54575e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                    }}>
                    <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                </Animated.View>

                <ImageBackground
                    source={require("../assets/scuba.jpg")}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Animatable.View
                            animation="zoomIn" iterationCount={1}
                            style={{ backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', height: 100, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Go-Dive</Text>
                        </Animatable.View>
                    </View>
                    <Animatable.View
                        animation="slideInUp"
                        iterationCount={1}
                    >
                        <Animated.View style={{
                            height: this.loginHeight,
                            backgroundColor: 'rgba(255,255,255,.5)'
                        }}>
                            <Animated.View
                                style={{
                                    opacity: headerTextOpacity,
                                    alignItems: 'flex-start',
                                    paddingHorizontal: 25,
                                    marginTop: marginTop
                                }}>
                                <Text
                                    style={{ fontSize: 25 }}
                                >Get diving with Go-Dive</Text>
                            </Animated.View>
                            <TouchableOpacity
                                onPress={() => this.increaseHeightofLogin()}
                            >
                                <View style={{
                                    marginTop: 25,
                                    paddingHorizontal: 25,
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        style={{
                                            height: 25, width: 24,
                                            resizeMode: 'contain'
                                        }}
                                    >
                                    </Image>
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            borderBottomWidth: this.borderBottomWidth
                                        }}>

                                        <Text style={{
                                            fontSize: 20,
                                            paddingHorizontal: 10
                                        }}>+62</Text>
                                        <TextInput
                                            ref="textInputMobile"
                                            style={{ flex: 1, fontSize: 20 }}
                                            placeholder={this.state.placeholderText}
                                        >

                                        </TextInput>

                                    </Animated.View>
                                </View>
                            </TouchableOpacity>

                        </Animated.View>
                        <View style={{
                            height: 70, backgroundColor: 'rgba(255,255,255,.5)',
                            alignItems: 'center', justifyContent: 'center',
                            borderTopColor: '#e8e8ec', borderWidth: 1, paddingHorizontal: 25
                        }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Or connect using a social account</Text>
                        </View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
