import React,{useState,useEffect} from 'react'
import {Typography,Button,Box,Skeleton} from '@mui/material'
import axios from 'axios'
import {DataGrid} from '@mui/x-data-grid'

import { API_URLs } from '../../Helper/API_URLs'
import QualityScore from './QualityScore'

const DateWiseQS = (props) => {
    console.log("##### DATEWISE QUALITY SCORE COMPONENT ##### ")
    const {startDate,endDate,datesBackup,setStartDate, setEndDate} = props

    const [scores,setScores] = useState(null)
    const [scoresBackup,setScoresBackup] = useState(null)
    const [pageSize,setPageSize] = useState(10)
    const [rangeQualityScore,setRangeQualityScore] = useState(null)
    

    useEffect(()=>{
        const fetchTranscriptionsInDateRange = async()=>{
            const {transcriptionsDateWise_API} = API_URLs
            const {data} = await axios(transcriptionsDateWise_API)
            setScores(data.datewiseQualityScore)
            setScoresBackup(data.datewiseQualityScore)
        }
        fetchTranscriptionsInDateRange()
    },[])


    const fetchTranscriptionsInDateRange = ()=>{

        //##### FORMATTING DATE #####
        let start = startDate.toLocaleDateString();
        let end = endDate.toLocaleDateString();
        console.log(start)
        console.log(end)
        
        start = start.split("/")
        end =   end.split("/")

        start = start[2]+"-"+start[0]+"-"+start[1]
        end = end[2]+"-"+end[0]+"-"+end[1]

        start = new Date(start).getTime()
        end = new Date(end).getTime()

        const updatedScores = scoresBackup.filter((item)=>{
                let formattedDate = new Date(item.date).toLocaleDateString();
                formattedDate =  new Date(formattedDate).getTime();
                if(formattedDate >= start && formattedDate <= end) return true
        })
        setScores(updatedScores)
    }

    const showAllDateTranscriptions = ()=>{
        console.log(scoresBackup)
        setScores(scoresBackup)
        setStartDate(new Date(datesBackup.oldestDate))
        setEndDate(new Date(datesBackup.recentDate))
    }

    const columns = [
        
        {
          field: 'date',
          headerName:'Date',
          type: 'date',
          width:200,
          headerAlign: 'center',
          align: 'center'
        },
    
        {
          field: 'qualityScore',
          headerName:'Quality Score (%)',
          type: 'number',
          width:200,
          headerAlign: 'center',
          align: 'center'
        },
    
        {
          field: 'count',
          headerName:'Count',
          type: 'number',
          width:150,
          headerAlign: 'center',
          align: 'center'
        },
    ]

    //##### FETCH QUALITY SCORE RANGEWISE #####
    const generateDateRangeQualityScore = async()=>{
        setRangeQualityScore(null)
        const {REACT_APP_BACKEND_API} = process.env
        const start = startDate.toLocaleDateString();
        const end = endDate.toLocaleDateString();
        const url = `${REACT_APP_BACKEND_API}/api/generate-date-range-quality-score?start=${start}&end=${end}`
        const {data} = await axios.get(url)
        setRangeQualityScore(data.data)
    }

  return (
    <Box sx={{height:'600px', marginTop:'10px', p:'10px', boxShadow:1}}>
        <Box sx={{mb:'10px'}}>
            <Button variant='outlined' size='small' onClick={fetchTranscriptionsInDateRange}>Find</Button>
            <Button variant='outlined' size='small' onClick={showAllDateTranscriptions} sx={{marginLeft:'10px'}}>Clear</Button>
        </Box>

        <Box sx={{height: 400, width:'60%'}}>
            <Typography variant='h5'>DateWise Quality Score</Typography>
            <QualityScore 
                scores={scores} 
                rangeQualityScore = {rangeQualityScore}
                generateDateRangeQualityScore = {generateDateRangeQualityScore}
            />
            {
                (scores)
                ?
                <DataGrid
                    columns={columns}
                    rows={scores}
                    getRowId={row=>row.key}
                    rowsPerPageOptions={[5,10,20]}
                    pageSize={pageSize}
                    onPageSizeChange={(size)=>{
                        setPageSize(size)
                    }}
                    sx={{bgcolor:'rgb(240, 241, 245)', }}
                    headerAlign={'center'}
                />
                :
                <Box sx={{padding:'80px'}}>
                    <Skeleton height={70} width={500}/>
                    <Skeleton animation="wave" height={70} width={500}/>
                    <Skeleton animation={false} height={70} width={500}/>
                </Box>
            }
        </Box>



    </Box>
  )
}

export default DateWiseQS