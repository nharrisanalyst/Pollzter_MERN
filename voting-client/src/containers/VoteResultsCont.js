import {connect} from 'react-redux';
import VoteResults from '../components/VoteResults';
import {refreshVotes} from '../actions/actions';


function mapStateToProps(state, ownProps){
  return{

       anwsers:state.questions.questions[ownProps.index].answers,
       index: ownProps.index,
       questionID: state.questions.questions[ownProps.index]._id


  }
}

function mapDispatchToProps(dispatch){
  return{
      refreshVotes:(id,index)=>{return dispatch(refreshVotes(id,index))}
  }

}



const VoteResultsCont = connect(
        mapStateToProps,
        mapDispatchToProps
      )(VoteResults)


export default VoteResultsCont;
