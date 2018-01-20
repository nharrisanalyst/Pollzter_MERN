
//states array returns one less


// function oneLess(array){
//   array.pop()
//   return array;
// }



function makePoll(state={question:'',answers:[null,null,null], makingPoll:false, madePoll:false}, action={type:undefined}){
  switch(action.type){
    case 'ADD_ANOTHER_QUESTION':
      return Object.assign({},state, {answers:state.answers.concat(null)});
    case 'DELETE_A_QUESTION':
      return Object.assign({},state, {answers:state.answers.slice(0,state.answers.length-1)});
    case 'CREATING_QUESTION':
      return Object.assign({},state,{makingPoll:true});
    default:
      return state;
  }

}


export default makePoll;
