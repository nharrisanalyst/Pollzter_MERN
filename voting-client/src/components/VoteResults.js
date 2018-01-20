import React, {Component}  from 'react';
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import makeChart from '../makeChart';


class VoteResults extends Component{



 componentDidMount(){
   let index = this.props.index;
   let id = 'voteResults'+index;
   let refreshVotes = this.props.refreshVotes;
   let answers = this.props.anwsers;
   let idSelect='#'+id;
   let questionID = this.props.questionID;

   refreshVotes(questionID,index).then(x=>{
     answers = this.props.anwsers;
     makeChart(answers,idSelect)
   })

   //makeChart(answers,idSelect)



 }




 render(){
     let index = this.props.index;
     let id = 'voteResults'+index;
   return(
     <div>
        <div id={id}></div>
     </div>
   )
 }



 }







// const  VoteResults =({anwsers})=>{
//
//
//       let AnswerComp = anwsers.map((val,i)=>{
//         return(
//           <div>
//               {val.answer}:{val.votes}
//           </div>
//         )
//       })
//
//
//
//
//
//    return(<div>
//           {AnswerComp}
//          </div>
//    )
//
// }


export default VoteResults;
