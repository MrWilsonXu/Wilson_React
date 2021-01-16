/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import Styles  from "./src/Main.style";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';

import YSText from "./coomponents/YSText";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () =>  {

  const name = "Wilson";
  const [count, setCount] = useState(0);

  function getFullName(firstName: string,secondName: string,thirdName: string) {
    return firstName + " " + secondName + " " + thirdName;
  }

  function fetchNickName() {
    return "my name is kobe fans"
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" style={{flex: 1, backgroundColor: 'black'}} />
        <SafeAreaView>
          <ScrollView>
            <Text style={Styles.largeTitle}>{this.name}First ReactNative Project</Text>
            <Text/>
            <Text style={Styles.mediumTitle}>在React语法中，字符串括号可以添加任何变量赋值包括函数</Text>
            <Text style={Styles.mediumTitle}>当前设备尺寸宽度：{Dimensions.get('window').width} </Text>
            <Text></Text>
            <Text style={Styles.smallTitle}>当前设备尺寸高度：{Dimensions.get('window').height} </Text>
            <Text style={Styles.smallTitle}>当前运行平台：{Platform.OS} </Text>
            <Text></Text>
            <YSText></YSText>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={Styles.mediumTitle}>You clicked {count} times</Text>
                <Button onPress = {() => setCount(count + 1)}
                        title = "Press me!"
                />
            </View>
          </ScrollView>        
        </SafeAreaView>
      </>
  );
};

export default App;
