/**
 * Created by fangzhen on 2016/10/26.
 */
import React,{ Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Navigator,
    StyleSheet,
    Image,
    ListView,
} from 'react-native';

var REQUEST_URL = 'https://api.douban.com/v2/music/search?q=%E8%AE%B8%E5%B5%A9&count=100';

class MusicTitle extends Component{
    render(){
        return (
            <Text>我的音乐</Text>
        );
    }
}


export default class MyScene extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigator:this.props.navigator,
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            loaded:false,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.musics),
                    loaded: true,
                });
            });
    }

    static defaultProps = {
        title:'我的音乐',
    }


    render(){

        if(!this.state.loaded){
            return this.renderLoadingView();
        }

        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#008ca6'}}>
                    <View style={{left:0}}>
                        <TouchableHighlight onPress={()=>{this.props.navigator.jumpBack()}}>
                            <View>
                                <Image style={mySceneStyle.backButton} source={require('./images/back.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text style={mySceneStyle.pageTitle}>{this.props.title}</Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMusic}
                        style={mySceneStyle.listView}
                    />
                </View>
            </View>

        );
    }

    renderLoadingView() {
        return (
            <View style={mySceneStyle.container}>
                <Text>
                    音乐加载中...
                </Text>
            </View>
        );
    }

    renderMusic(music) {
        return (
            <View style={mySceneStyle.container}>
                <Image
                    source={{uri: music.image}}
                    style={mySceneStyle.thumbnail}
                />
                <View style={mySceneStyle.rightContainer}>
                    <Text style={mySceneStyle.title}>歌名:   {music.title}</Text>
                    <Text style={mySceneStyle.title}>评分:   {music.rating.average}</Text>
                </View>
            </View>
        );
    }
}


const mySceneStyle = StyleSheet.create({
    pageTitle:{
        fontSize:25,
        textAlign:'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        margin: 8,
        textAlign: 'left',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 70,
        height:94,
        margin:3,
        borderRadius:5,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    backButton: {
        width: 20,
        height: 20,
        marginLeft: 16,
        tintColor: 'white',
    },
});