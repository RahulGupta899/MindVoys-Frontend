import React,{useState} from 'react'
import DatePick from './DatePick'
import DateWiseQS from './DateWiseQS'

const HomePage = () => {
    console.log("##### HOMEPAGE COMPONENT #####")
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [datesBackup,setDatesBackup] = useState(null)
    
    console.log(startDate)
    console.log(endDate)
  return (
    <>
        <h1>Dashboard</h1>
        <DatePick
            startDate = {startDate}
            endDate = {endDate}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
            setDatesBackup = {setDatesBackup}
        />
        {
            <DateWiseQS
                startDate = {startDate}
                endDate = {endDate}
                setStartDate = {setStartDate}
                setEndDate = {setEndDate}
                datesBackup = {datesBackup}
            />
        }
        
    </>
  )
}

export default HomePage