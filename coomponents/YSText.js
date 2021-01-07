/** 自定义Text组件 */

/** 在 JSX 语法糖的实质是调用React.createElement方法，所以必须在文件头部引用import React from 'react'。 
 *  在 JSX 中，引用 JS 值时需要使用{}括起来，并且 JS 中定义一个对象时，本来也需要用括号括起来
*/
import React, { Component, useState} from "react";

import {  
    View,
    Text,
    TextInput,
    Button,
    Alert
} from "react-native";

import styles from "./YSText.style";

const YSChoice = (props) => {
    /** hook 函数组件中添加一个“状态钩子”，在函数组件重新渲染执行的时候能够保持住之前的状态 
     *  相当于oc中定义的一个属性，来记录控件的状态
    */

    const [state,setState]=useState({isSelected: false});

    return (
        <View>
            <Text style={styles.titleLayout}>
                You name is {props.name}, and {state.isSelected ? "You had made a decision!" : "Please make a choice!"}
            </Text>
            <View style={styles.fixToText}>
                <Button 
                    title={state.isSelected ? "make choice" : "reset"}
                    onPress={() => {
                        setState({isSelected: !state.isSelected});
                    }}     
                    color="#f194ff" 
                />
                <Button
                    title="Right button"
                    onPress={() => Alert.alert('Right button pressed')}
                />
            </View>
        </View>
    )
}

const YSText = () => {
    return (
        <>
            <YSChoice name="Wilson"/>
        </>
    )
}

export default YSText;