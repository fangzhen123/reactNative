/**
 * Created by fangzhen on 16/10/30.
 */

import React,{ Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    WebView,
    Image,
    Text,
} from 'react-native';

export default class MovieInfo extends Component{
    render(){
        console.log(this.props.url);
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',height:56,alignItems:'center',backgroundColor:'#008ca6'}}>

                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{this.props.navigator.jumpBack()}}>
                            <View>
                                <Image style={MySceneStyle.backButton} source={require('./images/back.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex:3}}>
                        <Text style={MySceneStyle.pageTitle}>电影详情</Text>
                    </View>

                </View>

                <WebView source={{uri:this.props.url}}></WebView>
            </View>
        );
    }
}

const MySceneStyle = StyleSheet.create({
    pageTitle:{
        fontSize:25,
        marginLeft:50,
        color:'#fff',
    },
    backButton: {
        width: 20,
        height: 20,
        marginLeft: 16,
        tintColor: 'white',
    },
});