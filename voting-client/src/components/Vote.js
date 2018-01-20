import React, {Component} from 'react';
import {RingLoader} from 'react-spinners';
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import makeChart from '../makeChart';





class Vote extends Component{


  componentDidMount(){
    let getPoll = this.props.getPoll;
    let id = this.props.id;
    let setVote = this.props.setVote;
    getPoll(id);
    setVote();
  }

  render(){
   const {id, question, answers, gettingPoll, voted, vote} = this.props;


   return(
     <div>
       <VoteSwitch question={question} answers={answers} gettingPoll={gettingPoll} voted={voted} vote={vote}/>

    </div>
   )

 }
}

const VoteSwitch = ({question, answers, gettingPoll, voted, vote})=>{
 if(gettingPoll){ return( <RingLoader/>)}

 if(!gettingPoll && !voted && answers.length>0){
   return (<PollPoll question={question} answers={answers} vote={vote}/>)
 }

 if(!gettingPoll && !voted && answers.length===0){
   return (<NoPoll/>)
 }

 if(!gettingPoll && voted){
   return(<PollResults question={question} answers={answers} />)
 }



}

const PollPoll = ({question, answers, vote})=>{

    let answerForm= answers.map((val, i)=>{
         return(
            <div>
            <div className='vote-button' value={i} onClick={()=>vote(i)}>
            {val.answer}
            </div>
            </div>
         )

    })



return(
  <div className='vote-form-cont'>
  <div className= 'vote-form'>

  <div classNAme='vote-question'>{question}</div>
  <div>
  {answerForm}

  </div>
  </div>

  </div>
)

}


class PollResults extends Component{

  componentDidMount(){


     let answers = this.props.answers;
     console.log(answers)
     let idSelect='#voteResults';


       makeChart(answers,idSelect);
   }

  render(){
    return(
      <div className='chart-result-cont'>
      <div className='chart-result'>
      <div id='voteResults' ></div>
      </div>
      </div>
    )
     }

}

const NoPoll=()=>(
  <div id='noPoll'>
    <h1>  Error 404: No Poll Was Found  at This URL Please DoubleCheck the URL and Try Again 'POLLZTER'</h1>
  </div>
)




 export default Vote;
