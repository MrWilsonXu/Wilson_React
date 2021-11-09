import React from 'react'
import PropTypes from "prop-types";

// 类组件-精简模型下，实际开发项目中常用的方式
class WilsonComponenSimple extends React.Component{

    // 使用 propTypes 来对入参类型做限定
    static propTypes = {
        name: PropTypes.string.isRequired,
         age: PropTypes.number,
        test: PropTypes.func,
    }

    state = {isSelect: false, 
             userName: '', 
             password: '',
            otherUserName: '', 
            otherPassword: '',
        }

    /**
     * 返回一个容器，可以存储被ref标识的节点，改容器是’专人专用‘的，后面放进去会替换前面的，即一个 React.createRef() 只能用于一个节点
     * 官方并不推荐大量使用这种方式
     */
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

    // 事件发生自身节点会传进来，所以我们不要过度的使用ref
    isOnBlur = (event) => {
        alert(event.target.value)
    }

    logProps() {
        console.log(this.props.name + '：' + this.props.age);
    }

    /**
     *  返回一个函数给onChange
     * 
     *  高阶函数：
     *  1.若A函数，接收的参数为另一个函数，那么A就可以称之为高阶函数
     *  2.若A函数，调用的返回值还是一个函数，那么A就可以称之为高阶函数
     * 
     *  函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式
     */ 
    commonSaveData = (dataType) => {
        // return部分才是 onChange 正真的回调
        return (event) => {
            this.setState({[dataType]: event.target.value});
            console.log(this.state.userName);
            console.log(this.state.password);
        }
    }
    // 实现 commonSaveData 的另外一种方式
    commonSaveDataAnother = (dataType, event) => {
        this.setState({[dataType]: event.target.value})
        // 为什么state中的值会少一个呢？？？？
        console.log('传过来的值：',event.target.value);
        console.log('通过state赋值后取出的值：', this.state.otherPassword);
    }

    /**
     * 组件更新流程之调用 setState
     * (根据是否有参数，若有参数，则执行：componentWillReceiveProps，执行顺序排在下面步骤之前，但首次展示不会调用)
     * 1.首先询问是否允许更新，调用方法：shouldComponentUpdate，我们可以充写改方法决定是否允许更新
     * 2.第一步返回true，执行将要更新，调用方法：componentWillUpdate
     * 3.调用render函数，更新各个节点
     * 4.渲染完成，则调用方法：componentDidUpdate
     */

    /**
     * 组件更新流程之调用 forceUpdate
     * 1.执行将要更新，调用方法：componentWillUpdate
     * 2.调用render函数，更新各个节点
     * 3.渲染完成，则调用方法：componentDidUpdate
     */

    /**
     * 组件更新
     */
    getSnapshotBeforeUpdate() {
        
    }

    /**
     * 组件初次加载
     */
    componentWillUnmount() {
        console.log('组件将要卸载：componentWillUnmount');
    }

    componentDidMount() {
        console.log('组件已经挂载：componentDidMount');
    }

    render() {
        const {isSelect} = this.state

        console.log('组件渲染完成：render');

        return (
          <div style={{width: 200 , height: 300, backgroundColor: 'white'}}>
            <div style={{color: 'red'}}>{isSelect+''}</div>

            <button onClick={ this.buttonClickRow } >点我试试看</button><br />  

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
            <input ref={this.myRef} type="text" placeholder="请输入内容" />
            <input onBlur={this.isOnBlur}  type="text" placeholder="失去焦点时提示" />

            {/* 
                随着输入内容维护一个state‘状态’的，就归类为受控组建； 非受控的就是直接随着内容改变获取，现用现取
                为了避免过度使用ref，尽量写state来维护，效率更高效
            */}

            {/* 必须给一个函数，作为onChange的回调 */}
            <input onChange={this.commonSaveData('userName')} type="text" placeholder="用户名：" />
            <input onChange={this.commonSaveData('password')} type="text" placeholder="密码：" />

            <input onChange={ (event) => { this.commonSaveDataAnother('otherUserName', event) }} type="text" placeholder="另外一种方式-用户名：" />
            <input onChange={ (event) => { this.commonSaveDataAnother('otherPassword', event) }} type="text" placeholder="另外一种方式-密码：" />

          </div>
        )
        
    }
}

export default WilsonComponenSimple;