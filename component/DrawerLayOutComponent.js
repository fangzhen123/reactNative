/**
 * Created by fangzhen on 2016/10/31.
 */

import React,{
    Component
} from 'react';

import {
    Text,
    View,
    DrawerLayoutAndroid,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class DrawerLayOutComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            showContent:this.props.showContent
        };
    }
    render(){
        //抽屉导航的内容
        var layOutView  = (
            <View style={drawLayoutStyle.backStyle}>
                <Text style={drawLayoutStyle.title}>导航栏</Text>
                <TouchableOpacity
                    onPress={}></TouchableOpacity>
                <TouchableOpacity></TouchableOpacity>
                <Text style={drawLayoutStyle.drawItem}>电影</Text>
                <Text style={drawLayoutStyle.drawItem}>音乐</Text>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                drawerPosition={DrawerLayoutAndroid.positions.right}
                drawerWidth={150}
                renderNavigationView={()=>layOutView}>
                {this.state.showContent}
            </DrawerLayoutAndroid>
        );
    }
}

const drawLayoutStyle = StyleSheet.create({
    backStyle:{
        flex:1,
        backgroundColor:'#008ca6',
    },
    title:{
        fontSize:25,
        color:'#fff',
        textAlign:'center'
    },
    drawItem:{
        fontSize:20,
        textAlign:'center',
        margin:5,
    }
});