import { connect } from 'react-redux';
import Vote from '../components/Vote';
import {getPoll, voteThunk, setVote} from '../actions/actions';




function mapStateToProps(state,ownProps){
  return{
    id: ownProps.match.params.id,
    question: state.poll.question,
    answers: state.poll.answers,
    gettingPoll: state.poll.gettingPoll,
    voted: state.poll.voted
  }
}


function mapDispatchToProps(dispatch){
  return{
       getPoll:id=>{dispatch(getPoll(id))},
       vote: index=>{dispatch(voteThunk(index))},
       setVote: ()=>{dispatch(setVote())}
  }

}




const VoteCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote)


export default VoteCont;
