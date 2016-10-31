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
    WebView,
    ToastAndroid,
    ProgressBarAndroid,
    ActivityIndicator,
} from 'react-native';

var REQUEST_URL_SEARCH = 'http://api.douban.com/v2/movie/search?q=';


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
                                if(this.state.inputContent==''){
                                    ToastAndroid.show('搜索内容不能为空哦',ToastAndroid.SHORT);
                                }
                                else {
                                    this.props.setKeyWord(this.state.inputContent);
                                }

                        }}
                        style={MySceneStyle.searchBtn}
                    >
                        <Text>搜索</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}




export default class MyMovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigator:this.props.navigator,
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            loaded:false,
            pageSize:10,
            page:1,
            start:0,
            data:[],
            keyword:'周星驰'
        };
        this.fetchData = this.fetchData.bind(this);
        this.renderMovies = this.renderMovies.bind(this);
        this.setKeyWord = this.setKeyWord.bind(this);
    }


    componentDidMount() {
        this.fetchData(REQUEST_URL_SEARCH+this.state.keyword);
    }


    /**
     * 搜索时设置关键词
     * @param keyword
     */
    setKeyWord(keyword){
        this.setState({
            keyword:keyword,
            page:1,
            start:0,
            data:[],
        },function () {
            this.fetchData(REQUEST_URL_SEARCH+keyword);
        });
    }

    fetchData(url) {
        url += '&count=10&start=' + this.state.start;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                let newData = this.state.data.concat(responseData.subjects);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newData),
                    loaded: true,
                    data: newData,
                });
            });
    }
    renderMovies(movies) {
        return (
            <View style={MySceneStyle.container}>
                <Image
                    source={{uri: movies.images.large}}
                    style={MySceneStyle.thumbnail}
                />
                <View style={MySceneStyle.rightContainer}>
                    <Text style={MySceneStyle.title}>电影:   {movies.title}</Text>
                    <Text style={MySceneStyle.title}>评分:   {movies.rating.average}</Text>
                    <Text style={MySceneStyle.title}>时间:   {movies.year}</Text>
                    <Text style={MySceneStyle.title}>类型:   <Text style={{color:'#00D0CF'}}>{movies.genres.join(' / ')}</Text></Text>
                    <TouchableOpacity onPress={()=>{
                        this.state.navigator.push({name:'movieInfo',url:'https://movie.douban.com/subject/'+movies.id+'/mobile',sceneConfig:Navigator.SceneConfigs.FadeAndroid});
                    }}>
                        <View style={MySceneStyle.viewInfo}>
                            <Text style={MySceneStyle.viewText}>查看详情</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    static defaultProps = {
        title:'我的电影',
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
                                <Image style={MySceneStyle.backButton} source={require('./../images/back.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{flex:3}}>
                        <Text style={MySceneStyle.pageTitle}>{this.props.title}</Text>
                    </View>


                </View>

                <View>
                    <SearchComponent setKeyWord={this.setKeyWord}/>
                </View>


                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMovies}
                        style={MySceneStyle.listView}
                        onEndReached={()=>{
                            let page = this.state.page+1;
                            this.setState({
                                page:page,
                                start:this.state.pageSize*(page-1),
                            },function () {
                                this.fetchData(REQUEST_URL_SEARCH+this.state.keyword);
                            });
                        }}
                    />
                </View>
            </View>

        );
    }

    renderLoadingView() {
        return (
            <View style={MySceneStyle.container_loading}>
                <ActivityIndicator
                    color="#9DE2A1"
                    size="large"
                />
                <Text>
                    电影加载中...
                </Text>
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container_loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
        // marginTop:20,
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
        width: 150,
        height:210,
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
        padding: 12,
        margin:2,
        borderRadius:5
    },
    searchImage:{
        width:30,
        height:30,
        borderWidth:1,
    },
    viewInfo:{
        width:150,
        height:50,
        backgroundColor:'#00D0CF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:10,
    },
    viewText:{
        fontSize:15,
        color:'#fff'
    }
});