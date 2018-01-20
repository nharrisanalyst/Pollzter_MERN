import {connect} from 'react-redux';
import User from '../components/User';


function mapStateToProps(state){
  return{
        userName: state.loggedIn.userName,
        name: state.loggedIn.name,
        numberPolls: state.questions.questions.length
  }
}


function mapDispatchToProps(dispatch){
  return{

  }
}



const UserCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)


export default UserCont;
