/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ListView,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import MyScene from './MyScene';


class TestProps extends Component {
  render(){
    return (
        <View>
          <Text style={styles.welcome}>{this.props.title}</Text>
        </View>
    )
  }
}

class TestInput extends Component{
  constructor(props){
    super(props);
    this.state = {text:''};
  }

  render(){
    return (
        <View>
          <TextInput onChangeText={(text)=>this.setState({text})}></TextInput>
          <Text>{this.state.text.split(' ').map((input)=>input&&'小毛').join(' ')}</Text>
        </View>
    )
  }
}

class Blink extends Component {
    constructor(props){
      super(props);
      this.state = {show:true}
      // setInterval(()=>{
      //   this.setState({show:!this.state.show});
      // },1000);
    }

    render(){
      let showText = this.state.show?this.props.text:'挺好玩的';
      let showStyle = this.state.show?styles.styleTest1:styles.styleTest2;

      return (
          <Text style={showStyle}>{showText}</Text>
      )
    }

}

class FlexDirectionBasics extends Component {
  render() {
    return (
        // 尝试把`flexDirection`改为`column`看看
        <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',alignItems:'stretch'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50,backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
    );
  }
}


class TestScrollView extends Component{
  render(){
    return (
        <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
              <Text>1111111111</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
              <Text>1111111111</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
            <Text>1111111111</Text>
          </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
            <Text>1111111111</Text>
          </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
            <Text>1111111111</Text>
          </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
            <Text>1111111111</Text>
          </TouchableOpacity>

            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
              <Text>1111111111</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
              <Text>1111111111</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemWrapper,styles.horizontalItemWrapper]}>
              <Text>1111111111</Text>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}


class TestListView extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
    this.state = {
      dataSource:ds.cloneWithRows([
          'dada','dada','dadad','dada','ssss','fffff'
      ]),
    };
  }

  render(){
    return (
    <View style={{flex:1,paddingTop:22}}>
      <ListView dataSource={this.state.dataSource} renderRow={(data)=><Text>{data}</Text>}>

      </ListView>
    </View>
    );
  };
}


class TestFetchData extends Component{

  constructor(props){
    super(props);
    this.state = {
      getMovies:fetch('http://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          }),
    }
  }

    getMoviesFromApiAsync() {
        return fetch('http://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    }


  render(){
      return (
        <Text>{this.getMoviesFromApiAsync()}</Text>
      )// this.state.getMovies.map((movie)=><Text>{movie}</Text>)
  }
}


class NavButton extends Component {
    render(){
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

class NavMenu extends Component{
    render(){
        return (
            <View style={styles.scene}>
                <Text style={styles.messageText}>{this.props.message}</Text>
                <NavButton
                    onPress={ ()=>{
                        this.props.navigator.push({
                            message:'向右拖拽关闭页面',
                            sceneConfig:Navigator.SceneConfigs.FloatFromRight,
                        });
                    }}
                    text="从右边向左边切入页面(有透明度变化)"
                />
                <NavButton
                    onPress={ ()=>{
                        this.props.navigator.push({
                            message:'向下拖拽关闭页面',
                            sceneConfig:Navigator.SceneConfigs.FloatFromBottom,
                        });
                    }}
                    text="从下往上切入页面"
                />
                <NavButton
                    onPress={ ()=>{
                        this.props.navigator.push({
                            message:'测试',
                            sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight,
                        });
                    }}
                    text="测试效果"
                />
                <NavButton
                    onPress={ ()=>{
                        this.props.navigator.pop();
                    }}
                    text="页面弹出（回退一页）"
                />
                <NavButton
                    onPress={ ()=>{
                        this.props.navigator.popToTop();
                    }}
                    text="页面弹出(回退到最后一页)"
                />
            </View>
        )
    }
}


class TestNavigation extends Component{
    render(){
        return (
            <Navigator
                style={styles.container}
                initialRoute={{message:'初始页面',}}
                renderScene={(route,navigator)=>
                    <NavMenu
                        message={route.message}
                        navigator={navigator}
                    />
                }
                configureScene={ (route)=>{
                    if(route.sceneConfig){
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
            />
        )
    }
}




export default class AwesomeProject extends Component {
  render() {
    return (
            <TestNavigation/>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  styleTest1 :{
    textAlign:'center',
    fontSize:20,
  },
  styleTest2:{
    fontSize:30,
    textAlign:'center'
  },
  itemWrapper: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#a52a2a',
    padding: 30,
    margin: 5,
  },
  horizontalItemWrapper: {
    padding: 50
  },
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CDCDCD',
    },
    scene:{
        flex:1,
    }}
);

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

