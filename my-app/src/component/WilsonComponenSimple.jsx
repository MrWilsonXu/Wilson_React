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
    // 返回一个容器，可以存储被ref标识的节点，改容器是’专人专用‘的，后面放进去会替换前面的，即一个 React.createRef() 只能用于一个节点
    myRef = React.createRef()

    /**
     * 箭头函数是没有this的，他是从外部找到this调用，即组件的实例对象
     * 使用赋值语句+箭头函数
     * 组件被称为‘状态机’，通过 state 来更新页面显示
     * 组件中 render 方法中的 this 为组件实例对象
     * 组件自定义方法中 this 为 undefined 时，需要通过设置箭头函数或者采用绑定的方式：bind() 
     */
    buttonClickRow = () => {
        this.logProps()

         // 必须使用setState更改状态
        const {isSelect} = this.state
        this.setState({isSelect:!isSelect})

        const content = this.myRef.current.value ? this.myRef.current.value : "无内容输入"
        alert(content)
    } 

    saveInput = (c) => {
        // 使用外部关联方式，属性放在实例上
        console.log('外部关联方式ref：',c);
        this.inputNode = c;
    }

    logProps() {
        console.log(this.props.name + '：' + this.props.age);
    }

    render() {
        const {isSelect} = this.state

        return (
          <div style={{width: 180 , height: 100, backgroundColor: 'white'}}>
            <div style={{color: 'red'}}>{isSelect+''}</div>

            <button  onClick={ this.buttonClickRow } >点我试试看</button><br />  

            {/* ref类型:
                1.字符串引用已被废弃，由于一些问题：https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs (效率不高)
                    <input ref="input_tag" type="text" placeholder="请输入内容" />
                2.回调函数方式：在重新渲染时，内联函数会被调用两次，（第一次为null，是为了清空之前传的值，但实际开发中，基本忽略影响）
                    <input ref={(c) => {this.inputNode = c; console.log('@',c);}}  type="text" placeholder="请输入内容" />
                  要想避免这种问题，可以使用：class绑定函数的方式：
                    <input ref={this.saveInput}  type="text" placeholder="请输入内容" />
                3.创建 api 方式
                  React.createRef()
            */}
            <input ref={this.myRef}  type="text" placeholder="请输入内容" />

          </div>
        )
        
    }
}

export default WilsonComponenSimple;