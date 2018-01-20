import {connect} from 'react-redux';
import ShowVotes from '../components/ShowVotes';
import {getAnswers} from '../actions/actions';


function mapStateToProps(state, ownProps){
  return{

        showPoll:state.questions.questions[ownProps.index].show,
        index:ownProps.index

  }
}


function mapDispatchToProps(dispatch){
  return{
      
  }
}


const ShowVotesCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowVotes)


export default ShowVotesCont;
