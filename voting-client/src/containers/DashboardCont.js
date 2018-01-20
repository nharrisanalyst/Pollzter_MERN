import {connect} from 'react-redux';
import DashBoard from '../components/DashBoard';
import {getQuestions, showHideAnswers } from '../actions/actions';



function mapStateToProps(state, ownProps) {
  return {
    user: ownProps.match.params.user,
    questions:state.questions.questions,
    gettingQuestions: state.questions.gettingQuestions,
    gotQuestions: state.questions.gotQuestion,
    path:ownProps.match.path
  };
}



function mapDispatchToProps(dispatch){
   return{
    setUp: user=>{dispatch(getQuestions(user))},
    showResults: index=>{dispatch(showHideAnswers(index))}
   }

}



const DashBoardCont=connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard)


export default DashBoardCont;
