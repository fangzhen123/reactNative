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
    ToastAndroid,
} from 'react-native';

export default class DrawerLayOutComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            showContent:this.props.showContent,
            navigator:this.props.navigator,
        };
    }
    render(){
        //抽屉导航的内容
        var layOutView  = (
            <View style={drawLayoutStyle.backStyle}>

                <View>
                <Text style={drawLayoutStyle.title}>导航栏</Text>
                </View>

                <View style={drawLayoutStyle.itemGround}>
                <TouchableOpacity onPress={()=> {
                    this.props.navigator.push({name: 'myMovieList'});
                }}>
                    <Text style={drawLayoutStyle.drawItem}>电影</Text>
                </TouchableOpacity>
                </View>


                <View style={drawLayoutStyle.itemGround}>
                <TouchableOpacity onPress={()=>{
                    ToastAndroid.show('还没做～～',ToastAndroid.SHORT);
                }}>
                    <Text style={drawLayoutStyle.drawItem}>音乐</Text>
                </TouchableOpacity>
                </View>


                <View style={drawLayoutStyle.itemGround}>
                <TouchableOpacity onPress={()=>{
                    ToastAndroid.show('还没做～～',ToastAndroid.SHORT);
                }}>
                    <Text style={drawLayoutStyle.drawItem}>图书</Text>
                </TouchableOpacity>
                </View>

                <View style={drawLayoutStyle.itemGround}>
                <TouchableOpacity onPress={()=>{
                    ToastAndroid.show('还没做～～',ToastAndroid.SHORT);
                }}>
                    <Text style={drawLayoutStyle.drawItem}>日记</Text>
                </TouchableOpacity>
                </View>

                <View style={drawLayoutStyle.itemGround}>
                <TouchableOpacity onPress={()=>{
                    ToastAndroid.show('还没做～～',ToastAndroid.SHORT);
                }}>
                    <Text style={drawLayoutStyle.drawItem}>便签</Text>
                </TouchableOpacity>
                    </View>
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
        backgroundColor: '#c8c8a9',
        shadowOpacity:0.5,
        alignItems:'center'
    },
    title:{
        fontSize:25,
        textAlign:'center',
        marginTop:10,
    },
    titleGround:{
        backgroundColor:'#fcfc9f',
    },
    drawItem:{
        fontSize:20,
        textAlign:'center',
        margin:5,
        padding:5,
        color:'#fff'
    },
    itemGround:{
        backgroundColor:'#ffac5d',
        margin:15,
        width:120,
        borderRadius:5,
    }
});