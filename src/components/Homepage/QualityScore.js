import React, { useEffect } from 'react'
import {Card,CardContent,Typography,CircularProgress} from '@mui/material'

const QualityScore = ({scores,rangeQualityScore,generateDateRangeQualityScore}) => {

    useEffect(()=>{ 
        const fetchInfo = async()=>{
            generateDateRangeQualityScore()
        }
        fetchInfo()
    },[scores])

  return (
    <Card sx={{height:'80px', width:'300px', bgcolor:'ButtonShadow',marginTop:'20px',  textAlign:'center'}}>
        {
          (rangeQualityScore)
          ?
            <CardContent>
              <Typography variant="h6">Quality Score: {rangeQualityScore.percent}%</Typography>
              <Typography variant='h6'>Calls: {rangeQualityScore.noOfCalls}</Typography>
            </CardContent>
          :
          <CircularProgress disableShrink sx={{padding:'20px', color:'black'}} />
        }
    </Card>
  )
}

export default QualityScore