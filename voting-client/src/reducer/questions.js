

function questions(state={questions:[], gettingQuestions:false, gotQuestion:false}, action={type:undefined}){
  switch(action.type){
    case 'INSERT_QUESTIONS':
      return Object.assign({}, state,{questions:action.questionsJSON,gettingQuestions:false,gotQuestion:true})
    case 'GETTING_QUESTIONS':
      return Object.assign({}, state, {gettingQuestions:true})
    case 'SHOW_HIDE_ANSWERS':
      return Object.assign({}, state, {questions: state.questions.map((val,i)=>{if(i===action.index){val.show=!val.show; return val} return val})})
    case 'UPDATE_VOTES':
     return Object.assign({}, state, {questions: state.questions.map((val,i)=>{if(i===action.index){val= action.answer; val.show=!val.show; return val} console.log(val); return val})})
    default:
      return state;
  }
}















export default questions;
