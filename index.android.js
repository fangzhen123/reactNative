
import React ,{ Component} from 'react';

import {
    AppRegistry,
    Navigator,
} from 'react-native';

import HomePage from './homePage';
import MyMovieList from './MyMovieList';
import MovieInfo from './MovieInfo';

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