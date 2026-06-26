// to be developed by -- ritika
import { useNavigate } from "react-router-dom";
import { isValidToken, signIn } from "../jsFunctions"

export default function SignIn() {


    return (
        <>
            <h1 onClick={signIn}>User Signed In</h1>
        </>
    )
}