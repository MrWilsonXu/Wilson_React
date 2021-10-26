import React from 'react'

// 类组件
class WilsonComponent extends React.Component{
    constructor(props) {
        super();
        this.state = {isSelect: false, name: "wilson"};
    }

    /**
     * 类中的方法默认开启了局部'严格模式'，即通过实例调用的话，根本找不到this关键字
     * buttonClick可以有两种写法：
     * 1. buttonClick(){}
     * 2. buttonClick = ()=>{}
     * 其中第二种写法默认this和方法绑定，可以获取到this实例
     */ 

    buttonClick(type){
        console.log(type);
        // console.log(this);
        // const {isSelect} =this.state;
        // 状态(state)不可直接更改，需要借助内部的api直接更改！
        // this.setState({isSelect:!isSelect});
    }

    // 箭头函数是没有this的，他是从外部找到this调用，即组件的实例对象
    buttonClickRow = () => {
        console.log(this);
        const {isSelect} =this.state;
        // 状态(state)不可直接更改，需要借助内部的api直接更改！
        this.setState({isSelect:!isSelect});
    } 

    render() {
        const {isSelect} = this.state;

        return <div style={{width: 150, height: 80, backgroundColor: 'white'}}>
            <div style={{color: 'red'}}>{isSelect+''}</div>

            <button onClick={
                this.buttonClick
            } >点我试试看！</button>    
        </div>
        
    }
}

/**
 * 需要区分直接调用和实例调用和存在'严格模式'的情况
 */

// 实例调用
const w = new WilsonComponent();
w.buttonClick('实例调用方式：');

// 直接调用，在js中，方法也是一个特殊的属性
const other = w.buttonClick;
other('直接调用方式：');

export default WilsonComponent;