import React, {Component} from 'react';
import * as d3Scale from 'd3-scale';
import VoteResultsCont from '../containers/VoteResultsCont';


const ShowVotes = ({showPoll, answers, index, questionID}) =>{
  if(!showPoll){

    return null;
  }

  return(
    <div>
    <VoteResultsCont  index={index}/>
    </div>
  )
}








export default ShowVotes;
