import React,{Fragment, useEffect,useReducer,memo} from 'react'
import {Typography,Card,CardContent,Box} from '@mui/material'
import axios from 'axios'
import { borderBottom } from '@mui/system'

// const initialState = {
//   count: 0,
// }

// function reducer(state, action){
//   switch(action.type){
//     case 'UPDATE_COUNT' : 
//         return{
//           ...state,
//           count: state.count + 1
//         }
//   }
// }

const CallList = ({state,dispatch}) => {
  console.log(" #### CALL LIST (Re-rendered) ####")
  useEffect(()=>{
    const fetchTranscriptions = async()=>{
      const url = `http://localhost:5000/api/get-all-transcriptions`
      const {data} = await axios.get(url)
      console.log(data.transcriptions)
      dispatch({type: 'UPDATE_TRANSCRIPTIONS', payload: data.transcriptions})
    }
    fetchTranscriptions()
  },[])


  return (
      <Card sx={{width: '400px', height: '500px', overflowY:'hidden', mt:'30px', ml:'30px'}}>
        <CardContent>
        {
          (state.transcriptions.length > 0)
          ?
          <div>
            <Typography variant="h5">Transcription List</Typography>
            <br/>  
            <Box 
              sx={{
                height:'400px',
                width:'350px', 
                border:'1px solid black',
                overflowY:'scroll',
                padding:'10px',
                bgcolor: 'ButtonFace',
                cursor:'pointer',
              }}
            >
              {
                state.transcriptions.map((transcription,idx)=>{
                  return(
                    <Box key={idx} sx={
                      {
                        '&:hover': {
                          color: 'black',
                          backgroundColor: 'white',
                        },
                        padding: '10px',
                        borderBottom: 0.5,
                        borderColor: 'grey.500'
                      }
                    }>
                      <Typography variant='subtitle2'>Agent Name :  {transcription.callDetails.agent.name} </Typography>
                      <Typography variant='subtitle2'>Date: {transcription.metaData.callDate} </Typography>
                    </Box> 
                  )
    
                })
              }
            </Box>
            
          </div>
          :
          <h1>Loding...</h1>
        }

        </CardContent>
      </Card>
  )
}

export default CallList