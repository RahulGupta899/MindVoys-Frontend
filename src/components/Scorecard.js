import React,{Fragment, useEffect,useReducer} from 'react'
import {Typography,Card,CardContent} from '@mui/material'
import axios from 'axios'

// const initialState = {
//   count: 0,
//   scorecards: [],
//   totalScore: 0,
//   passScore: 0,
//   tags: ["payment","satisfaction"]
// }

// const reducer = (state,action)=>{
//   switch(action.type){
//     case 'UPDATE_SCORES':
//         return{
//           ...state,
//           count: state.count + 1,
//           totalScore: action.payload.totalScore,
//           passScore: action.payload.passScore
//         }    
//     case 'UPDATE_SCORECARD_AND_SCORES': 
//         return{
//           ...state,
//           count: state.count+1,
//           scorecards: action.payload.scorecards,
//           totalScore: action.payload.totalScore,
//           passScore: action.payload.passScore
//         }
//   }
// }


const Scorecard = ({state,dispatch}) => {
  console.log(" #### SCORECARD (Re-rendered) ####")

  useEffect(()=>{
    const fetchScorecard = async()=>{
      const url = 'http://localhost:5000/api/get-scorecard'
      const {data} = await axios.get(url)
      console.log(data)
      
      //### CALCULATE SCORE ###
      let totalScore = 0;
      let passScore = 0;
      (Object.values(data.scorecard).length > 0) &&
      console.log("Executed")
      data.scorecard.questions.map((item)=>{
        totalScore  += item.score
        passScore   += state.tags.includes(item.tag)? item.score : 0
      })
    
      dispatch({type: 'UPDATE_SCORECARD_AND_SCORES', payload: {
        scorecards: data.scorecard,
        totalScore,
        passScore
      }})
    }
    fetchScorecard()
  },[])
 


  return (
    <Card sx={{width: '600px', height: '500px', overflowY:'hidden', mt:'30px'}}>
      <CardContent>
      {
        (Object.values(state.scorecards).length > 0) 
        ?
        <div>
          <Typography variant="h4">Master Scorecard</Typography>
          <Typography variant='h6'>{`${state.passScore}/${state.totalScore}`}</Typography>
          <br/>  
          {
            state.scorecards.questions.map((item,idx)=>{
              return(
                <Fragment key={idx}>
                <hr/> 
                <Typography>{idx+1}. {item.question}</Typography>
                <Typography>Ans: {state.tags.includes(item.tag)? "YES" : "NO"} </Typography> 
                </Fragment>
              )
            })
          }
        </div>
        :
        <h1>Loding...</h1>
      }

      </CardContent>
    </Card>
  )
}

export default Scorecard