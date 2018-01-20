


function poll(state={question:'', questionID:'', answers:[], showPoll:false,gettingPoll:true, voted:false}, action = {type:undefined}){
  switch(action.type){
     case 'INSERT_POLL':
        return Object.assign({},state, {question:action.question, answers: action.answers,gettingPoll:false})
     case 'VOTE':
        return Object.assign({}, state,{answers: state.answers.map((val,i)=>{if(i===action.index){val.votes=val.votes+1; return val} return val })})
     case 'SET_QUESTION_ID':
        return Object.assign({}, state,{questionID:action.questionID})
     case 'USER_VOTED':
         return Object.assign({}, state, {voted:true});
    case 'SET_VOTE':
         return Object.assign({},state,{voted:false});
     default:
      return state;

  }
}












export default poll;
