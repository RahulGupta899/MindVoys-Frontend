import React,{useEffect, useState} from 'react'
import axios from 'axios'

const HealthCheck = () => {
    const [res,setResponse] = useState(null)
    useEffect(function(){
        const fetchData = async()=>{
            const {REACT_APP_BACKEND_API} = process.env
            const url = `${REACT_APP_BACKEND_API}/api/healthcheck`
            const {data} = await axios.get(url)
            setResponse(data)
        }
        fetchData()
    },[])

  return (
    <>
    {
        (res === null)
        ?
            <h2>Server Not Connected</h2>
        :
            <h2>Server Connected</h2>
    }
    </>
  )
}

export default HealthCheck