import React from 'react'

// 函数式组件
const Simple = (props) => {
    const { name, onClick } = props

    const handlerClick = ()=>{
        console.log('ddd');
    }

    return (
         <div onClick={handlerClick}>
                wilson is 帅B {name}
         </div>
    )
}

class WilsonCount extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    求和函数
                </h1>


            </div>
        )
    }
}

// export default WilsonCount
export default Simple