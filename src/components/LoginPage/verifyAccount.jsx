import { useEffect, useState } from "react";
import styles from './loginPage.module.css';
import { StyledButton } from "./loginPage";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const VerifyAccount=()=>{

    const [isTokenValid,setIsTokenValid] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate()

    const {token} = useParams()

    const onVerifyEmail=async()=>{
       

        try{
           const response = await axiosInstance.post(`/user/verify-email/${token}`)
           if(response?.data?.token){
            setIsTokenValid(true)
            localStorage.setItem("token",response?.data.token)
            navigate("/dashboard")
           }
        }catch(error){
          
            setIsTokenValid(false);
        }
    }

    useEffect(()=>{
            onVerifyEmail()
    },[])


   

    return(
        <div className="w-screen h-screen" style={{backgroundColor:"var(--color-white)"}}>
                  <div className="w-full h-full p-5 md:p-0 md:w-1/2 flex justify-center items-center">
            {isTokenValid ? <div>
                <h1 className={styles.welcome_text}>Account Verified !</h1>
                
            </div> :     <p className={styles.description}>Invalid token</p> }
                    
        </div>
        </div>
    )
}