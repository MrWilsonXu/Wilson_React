import React from 'react'
import PropTypes from "prop-types";

// 类组件-精简模型下，实际开发项目中常用的方式
class WilsonComponenSimple extends React.Component{

    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        test: PropTypes.func,
    }

    state = {isSelect: false}

    /**
     * 箭头函数是没有this的，他是从外部找到this调用，即组件的实例对象
     * 使用赋值语句+箭头函数
     * 组件被称为‘状态机’，通过 state 来更新页面显示
     * 组件中 render 方法中的 this 为组件实例对象
     * 组件自定义方法中 this 为 undefined 时，需要通过设置箭头函数或者采用绑定的方式：bind() 
     */
    buttonClickRow = () => {
        this.test()
        const {isSelect} = this.state
        // 状态(state)不可直接更改，需要借助内部的api直接更改！
        this.setState({isSelect:!isSelect})
    } 

    test() {
        console.log('test method invoke');
        console.log(this.props.name + '：' + this.props.age);
    }

    render() {
        const {isSelect} = this.state

        return (
          <div style={{width: 150, height: 80, backgroundColor: 'white'}}>
            <div style={{color: 'red'}}>{isSelect+''}</div>

            <button onClick={
                this.buttonClickRow
            } >精简后-点我试试看！</button>    
          </div>
        )
        
    }
}

export default WilsonComponenSimple;