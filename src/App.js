import {Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {atom} from "jotai";
import {AuthService, Register} from "pet-project-frontend-sharedcomponents";
import "./index.css"
import LoginVisitor from "./containters/Login/LoginVisitor";
import Homepage from "./containters/Homepage/Homepage";
import ShelterDetails from "./containters/ShelterDetails/ShelterDetails";
import ShelterPets from "./containters/ShelterPets/ShelterPets";
import VisitorProfile from "./containters/VisitorProfile/VisitorProfile";
import RegisterVisitor from "./containters/RegisterVisitor/RegisterVisitor";
import {ToastProvider} from "react-toast-notifications";

export const userAtom = atom(AuthService.getCurrentUser() !== null);
export const nameAtom = atom(AuthService.getCurrentUser() !== null ? AuthService.getCurrentUser().username : "");
export const shelterAtom = atom({})

export default function App() {
    return (
        <ToastProvider placement={'top-right'}>
        <Layout>
            <Switch>
                <Route exact path="/login" component={LoginVisitor}/>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/register/visitor" component={RegisterVisitor}/>
                <Route exact path="/shelter-details" component={ShelterDetails}/>
                <Route exact path="/shelter-pets/:id" component={ShelterPets}/>
                <Route exact path="/profile" component={VisitorProfile}/>
            </Switch>
        </Layout>
        </ToastProvider>
    )

}
