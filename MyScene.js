/**
 * Created by fangzhen on 2016/10/26.
 */
import React,{ Component} from 'react';

import {View, Text} from 'react-native';

export default class MyScene extends Component{
    static defaultProps = {
        title:'李青',
    }

    render(){
        return (
            <View>
                <Text>我是{this.props.title}</Text>
            </View>
        );
    }
}