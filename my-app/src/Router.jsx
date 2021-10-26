import {BrowserRouter as Router,
    Switch,
    Route,
    Link,
    RouteComponentProps,} from 'react-router-dom';
    import App from './App';
    import Simple from './component/Simple'

 const Routers = ()=>{
    return <Router>
        <Switch>
            <Route path="/">
                <div>
                    <Route exact component={App} path="/" />
                    <Route exact component={Simple} path="/simple" />
                </div>
            </Route>
        </Switch>
    </Router>
}
export default Routers;