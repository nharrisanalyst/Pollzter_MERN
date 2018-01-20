import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {RotateLoader} from 'react-spinners';
import ShowVotesCont from '../containers/ShowVotesCont';
//const DashBoard = ({user}) =>{


// console.log(user)
// return(  <div>
//   <Link to="/newquestion">Create A New Poll</Link>
//     Hello user:{user}  user The Dashboard
//
//
//   </div>
//
//   )
// }

class DashBoard extends Component{
     constructor(props){
       super(props)
     }
  componentDidMount(){
    const {user, setUp} = this.props;
     setUp(user);
    console.log(user);





  }
  render(){
  const {user, setUp, questions, gettingQuestions, gotQuestions,showResults} = this.props;
     let QuestionList = questions.map(function(val,i){
         return( <div key={val._id} className='dashboard-question' onClick={()=>{showResults(i)}}>
                 {val.question} <ShowVotesCont index={i}/> <div className='question-link'>link:&nbsp; <Link to={'/poll/'+val._id}> pollzter.com/poll/{val._id}</Link></div>

                 </div>
         )
     })


    let Questions = questions.length===0?gettingQuestions?null:<div id='dashboard-noQuestions-cont'><h3 className='dashboard-noQuestions'> You have not created any Polls<p></p> Click on the Create a New Poll Link to Create Your first Poll</h3></div>:QuestionList;

  return(  <div className='dashBoard'>
     <Link className='create-new' to="/newpoll">Create A New Poll</Link>
     {Questions}




    </div>

    )
  }
}

export default DashBoard;
