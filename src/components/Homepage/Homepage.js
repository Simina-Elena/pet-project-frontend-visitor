import {makeStyles} from "@mui/styles";
import {CssBaseline} from "@mui/material";
import Card from "../Card";
import {useEffect, useState} from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        background: '#fef9ef',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
    choices: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Nunito'

    },
    appbar: {
        background: 'transparent !important',
        boxShadow: 'none'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',

    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#9c27b0',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fe6d73',
        fontSize: '4.5rem',
        paddingRight: '30px'

    },
    goDown: {
        color: "#fff",
        fontSize: '4rem',
    },
}))

export default function Homepage() {
    const classes = useStyles()
    const [shelters, setShelters] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchShelters = async () => {
        const data = await axios.get('http://localhost:8080/api/shelter/list')
        const resp = await data.data
        setShelters(resp)
        setLoading(false)
    }
    useEffect(() => {
        fetchShelters()
    }, [])

    if (loading === true)
        return (<div>Loading...</div>)
    else
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <div className={classes.container}>
                    <h1 className={classes.title}>Shelters</h1>
                    <Card shelters={shelters}/>
                </div>
            </div>
        )
}