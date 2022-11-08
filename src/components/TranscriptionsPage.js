import React,{useReducer} from 'react'
import SplitterLayout from 'react-splitter-layout'
import 'react-splitter-layout/lib/index.css';
import Scorecard from './Scorecard';
import CallList from './CallList'

const initialState = {
  count: 0 ,
  transcriptions: [],
  scorecards: [],
  totalScore: 0,
  passScore: 0,
  tags: ["payment","satisfaction"]
}


function reducer(state,action){
  switch(action.type){
    case 'UPDATE_TRANSCRIPTIONS' : 
        return{
          ...state,
          count: state.count + 1,
          transcriptions: action.payload
        }

    case 'UPDATE_SCORES':
      return{
        ...state,
        count: state.count + 1,
        totalScore: action.payload.totalScore,
        passScore: action.payload.passScore
      }   

    case 'UPDATE_SCORECARD_AND_SCORES': 
      return{
        ...state,
        count: state.count+1,
        scorecards: action.payload.scorecards,
        totalScore: action.payload.totalScore,
        passScore: action.payload.passScore
      }
  }
}


const Transcriptions = () => {
  console.log(" #### TRANSCRIPTION PAGE (Re-rendered) ####")
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <SplitterLayout >
        <CallList state={state} dispatch={dispatch}/>
        <Scorecard state={state} dispatch={dispatch}/>
    </SplitterLayout>
  )
}

export default Transcriptions















