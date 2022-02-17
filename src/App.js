import {Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {atom} from "jotai";
import {AuthService, Register} from "pet-project-frontend-sharedcomponents";
import "./index.css"
import LoginVisitor from "./containters/Login/LoginVisitor";
import Homepage from "./components/Homepage/Homepage";
import ShelterDetails from "./containters/ShelterDetails/ShelterDetails";
import ShelterPets from "./containters/ShelterPets/ShelterPets";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");
export const shelterAtom = atom({})

export default function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/login" component={LoginVisitor}/>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/register/visitor" component={Register}/>
                <Route exact path="/shelter-details" component={ShelterDetails}/>
                <Route exact path="/shelter-pets/:id" component={ShelterPets}/>
            </Switch>
        </Layout>)

}
