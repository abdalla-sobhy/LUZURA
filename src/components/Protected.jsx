import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Protected(props){
    const navigateTo = useNavigate();
    let Cmp = props.Cmp
    useEffect(()=>{
        if(!localStorage.getItem('userInfo')){
            navigateTo('/Register')
            // console.log('should navigate')
        }
    },[])

    return(
        <>
            <Cmp />
        </>
    )
}
export default Protected