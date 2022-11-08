import React,{useEffect,useState} from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'

const Homepage = () => {

  const [qualityScore,setQualityScore] = useState(0)
  
  useEffect(()=>{
    const fetchInformation = async()=>{
      const {REACT_APP_BACKEND_API} = process.env
      const url = `${REACT_APP_BACKEND_API}/api/generate-quality-score`
      const {data} = await axios.get(url)
      setQualityScore(data.percentage)
    }
    fetchInformation()
  },[])

  return (
    <>
      <h1>Dashboard</h1>
      <Card sx={{height:'100px', width:'300px', bgcolor:'ButtonShadow',margin:'20px', marginTop:'40px', textAlign:'center'}}>
        <CardContent>
          <Typography variant="h6">Overall Quality Percent</Typography>
          <Typography variant='h5'>  {qualityScore} %</Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default Homepage