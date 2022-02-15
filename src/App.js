import {Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {atom} from "jotai";
import {AuthService, Register} from "pet-project-frontend-sharedcomponents";
import "./index.css"
import LoginVisitor from "./containters/Login/LoginVisitor";
import Homepage from "./components/Homepage/Homepage";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");

export default function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/login" component={LoginVisitor}/>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/register/visitor" component={Register}/>
            </Switch>
        </Layout>)

}
