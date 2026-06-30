// Developed By Sudarshan Gondalwad
// defined dashboard to render on condition
import { useEffect } from "react"
import { isValidToken } from "../../jsFunctions"
import Admin from "../Dashboards/Admin"
import User from "../Dashboards/User"

export default function Dashboard(){


        if(isValidToken && localStorage.getItem('userType') === 'Admin'){
            return (<Admin/>)
        }else{
            return (<User/>)
        }
}