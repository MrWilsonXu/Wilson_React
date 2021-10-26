import logo from './logo.svg';
import './App.css';
import Simple from './component/Simple'
import WilsonComponent from './component/WilsonComponent'
import WilsonComponenSimple from "./component/WilsonComponenSimple";
import { Link } from 'react-router-dom';

function App(props) {

  const fetchContent = (content) => {
    console.log(content);
  }

  const handlerClick = (v)=>{
    console.log(v);
  }
  const dataSource = ["React", "Angular", "Vue"]

  return (
    <div className="App">

      <header className="App-header">
        {/* 精简类组件 */}
        
        <WilsonComponenSimple name='胜哥哥' age={29} />
        <img src={logo} className="App-logo" alt="logo" />

        {/* 标准类组件 */}
        <div style={{ backgroundColor: 'red', color: 'green' }}>
          <Simple name={'ddddd'} onClick={handlerClick} age={18}/>
        </div>

        <input
          placeholder="请输入内容"
          onChange={
            fetchContent
          }
        />

        {/* 可自定义标签，首字母需要大些，若组件没有定义，则报错：xxx is not define 
              js中：【js语句（代码）】【js表达式】需要区分使用  */}

        <h3>前端框架列表</h3>
        <ul>
          {
            dataSource.map((item, index) => {
              return <li key={`${index}li`} style={{ textAlign: 'left' }}>{item}</li>
            })
          }
        </ul>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <h5>页面跳转的三种方式</h5>
        <Link to="simple">跳转到Simple</Link>

        <div onClick={() => {
          window.location.href = '/simple';
        }}>跳转到Simple</div>

        <div onClick={() => {
          props.history.push('/simple');
        }}>跳转到Simple</div>
      
      </header>

    </div>
  );
}

export default App;
