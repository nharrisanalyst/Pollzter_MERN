import { connect } from 'react-redux';
import { createVoteAction, newQuestionWAnswers, addAnotherQuestion,deleteAQuestion } from '../actions/actions';
import CreateVote from '../components/CreateVote';



const mapStateToProps = (state)=>{
  return{
    question: state.makePoll.question,
    answers: state.makePoll.answers

  }
}


const mapDispatchToProps =(dispatch)=>{
  return{
    submit: ev=>{dispatch(newQuestionWAnswers(ev))},
    addQuestion:()=>{dispatch(addAnotherQuestion())},
    deleteQuestion:()=>{dispatch(deleteAQuestion())}

  }

}

const CreateVoteCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVote);

export default CreateVoteCont;
