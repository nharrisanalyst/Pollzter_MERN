import {connect} from 'react-redux';
import { logOutThunk } from '../actions/actions';
import AppHeader from '../components/AppHeader';


const mapStateToProps =(state)=>{
  return{
    loggedIn:state.loggedIn.loggedIn
  }
}


const mapDispatchToProps =(dispatch) =>{
  return{
     logOut:()=>dispatch(logOutThunk())
  }
}

const AppHeaderCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader)

export default AppHeaderCont;
