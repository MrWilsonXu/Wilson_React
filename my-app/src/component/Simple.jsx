import React from 'react'

// 函数式组件
const Simple = (props) => {
    const { name, onClick } =props

    const handlerClick = ()=>{
        onClick('ddd');
    }

    return <div onClick={handlerClick}>wilson is 帅B {name}</div>
}


export default Simple