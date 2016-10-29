/**
 * Created by fangzhen on 2016/10/26.
 */
import React,{ Component} from 'react';

import {
    View,
    Text,
    Navigator,
    StyleSheet,
    Image,
    ListView,
    TextInput,
    TouchableOpacity,
} from 'react-native';

// var REQUEST_URL = 'https://api.douban.com/v2/music/search?q=%E8%AE%B8%E5%B5%A9&count=100';
var REQUEST_URL = 'https://api.douban.com/v2/music/search?count=100&q=';

//搜索按钮组件
class SearchComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            inputContent:'',
        }
    }

    render(){
        return (
            <View style={{flexDirection:'row'}}>

                <View style={{flex:4}}>
                    <TextInput onChangeText={(text)=>{this.setState({inputContent:text})}}
                        placeholder="关键词查找"
                               autoCapitalize='none'
                               autoCorrect={false}
                               style={{textAlign:'center'}}

                    ></TextInput>
                </View>


                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={
                            ()=>{
                                this.props.fetchData(this.state.inputContent);
                        }}
                        style={mySceneStyle.searchBtn}
                    >
                        <Text>搜索</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        this.fetchData('许嵩');
    }


    fetchData(keyword) {
        var url = REQUEST_URL+keyword;
        fetch(url)
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

                <View style={{flexDirection:'row',height:56,alignItems:'center',backgroundColor:'#008ca6'}}>

                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{this.props.navigator.jumpBack()}}>
                            <View>
                                <Image style={mySceneStyle.backButton} source={require('./images/back.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex:3}}>
                        <Text style={mySceneStyle.pageTitle}>{this.props.title}</Text>
                    </View>


                </View>

                <View>
                    <SearchComponent fetchData={this.fetchData}/>
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
        marginLeft:50,
        color:'#fff',
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
    searchBtn:{
        backgroundColor: '#9DE2A1',
        padding: 15,
        borderWidth: StyleSheet.hairlineWidth,
        margin:5,
        borderRadius:5
    },
    searchImage:{
        width:30,
        height:30,
        borderWidth:1,
    }
});