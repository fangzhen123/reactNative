
import React ,{ Component} from 'react';

import {
    AppRegistry,
    Navigator,
    DrawerLayoutAndroid,//抽屉导航切换
} from 'react-native';

import HomePage from './component/HomePage';
import MyMovieList from './component/MyMovieList';
import MovieInfo from './component/MovieInfo';

class AwesomeProject extends React.Component {

    render(){
        return (
            <Navigator
                initialRoute={{name:'homePage',sceneConfig:Navigator.SceneConfigs.PushFromLeft}}
                renderScene={this.renderScene}
                configureScene={(route)=>{
                    if(route.sceneConfig){
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
            />
        )
    }

    renderScene(route,navigator){
        switch (route.name){
            case "homePage":
                return <HomePage navigator={navigator}/>
                break;
            case "myMovieList":
                return <MyMovieList navigator={navigator}/>
                break;
            case "movieInfo":
                return <MovieInfo url={route.url} navigator={navigator}/>
                break;
            default:

        }
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);