import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker'
import {Button} from '@mui/material'
import axios from 'axios'

import {API_URLs} from '../../Helper/API_URLs'



const DatePick = (props) => {
    const {startDate,endDate,setStartDate,setEndDate,setDatesBackup} = props
    console.log("##### DATE PICK COMPONENT #####")
    

    useEffect(()=>{
        const fetchOldestAndNewestDates = async()=>{
            const {oldestAndNewDates_API} = API_URLs
            const {data} = await axios.get(oldestAndNewDates_API)
            console.log(data.data)
            setStartDate(new Date(data.data.oldestDate))
            setEndDate(new Date(data.data.recentDate))
            setDatesBackup(data.data)
        }
        fetchOldestAndNewestDates()
    },[])

    

  return (
    <>
    <br/>
        <span>From</span>
        <br/>
        <DatePicker selected={startDate} onChange={(date)=>setStartDate(date)} />
        <br/>
        <span>To</span>
        <br/>
        <DatePicker selected={endDate} onChange={(date)=>setEndDate(date)}   />
        <br/>
    </>
  )
}

export default DatePick