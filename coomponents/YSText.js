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
    Alert,
    Dimensions
} from "react-native";

import styles from "./YSText.style";

/**函数式组件 */
const YSChoice = (props) => {
    /** hook 函数组件中添加一个“状态钩子”，在函数组件重新渲染执行的时候能够保持住之前的状态 */
    const [isSelected,setIsSelected] = useState(false);

    /**创建一个对象 */
    const Element = {
        type: "h1",
        props: {
        className: "footer",
        children: "hellow world"
        }
    }

    return (
        <View>
            <View style={styles.superLayout}>
                <Text style={styles.titleLayout}>This is YSText Components</Text>
                <Text style={styles.subTitleLayout}>
                    You name is {props.name}, and {isSelected ? "You had made a decision!" : "Please make a choice!"}
                </Text>

                <View style={styles.btnContainerViewLayout}>
                    <Button 
                        color='#f194ff'
                        title={isSelected ? "make choice" : "reset"}
                        onPress={() => {
                            setIsSelected(!isSelected);
                        }}     
                    />
                    <Button
                        color="#1F7F7F"
                        title="Show me Alert!"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>
            </View>
        </View>
    )
}

/**类组件 */
export default class YSText extends Component {
    constructor() {
        super();
        
        this.state = {
            
        }
    }

    render() {
        return (
            <>
                <YSChoice name="Wilson"/>
            </>
        )
    }
}