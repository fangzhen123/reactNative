/**
 * Created by fangzhen on 2016/10/28.
 */

import React ,{ Component} from 'react';

import {
    Animated,
    TouchableWithoutFeedback,
    Easing,
} from 'react-native';


export default class TestAnimated extends  Component{
    constructor(props){
        super(props);
        this.state = {
            bounceValue:new Animated.Value(0),
            rotateValue:new Animated.Value(0),
        };
    }

    render(){
        return (
            <TouchableWithoutFeedback onPress={()=>this.jump()} onLongPress={()=>this.rotate()}>
                <Animated.Image source={{uri:'http://favim.com/orig/201106/14/adorable-cute-lab-love-puppy-puppy-face-Favim.com-75572.jpg'}}
                                style={{
                                    flex:0.3,
                                    borderRadius:15,
                                    transform:[
                                        {scale:this.state.bounceValue},
                                        {rotateX: this.state.rotateValue.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ['0deg', '360deg']})
                                        },
                                        {rotateZ: this.state.rotateValue.interpolate({
                                            inputRange: [0,1],
                                            outputRange: ['0deg', '360deg']})
                                        }
                                    ]
                                }}
                ></Animated.Image>
            </TouchableWithoutFeedback>

        );
    }

    componentDidMount() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue:0.8,
                friction:1,
            }
        ).start();
    }


    jump(){
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue:0.8,
                friction:1,
            }
        ).start();
    }


    rotate(){
        this.state.rotateValue.setValue(0);
        Animated.timing(
            this.state.rotateValue,
            {
                toValue:1,
                duration:5000,
                easing:Easing.elastic(),
            }
        ).start();
    }
}