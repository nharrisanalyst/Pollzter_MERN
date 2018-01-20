import { push } from 'react-router-redux';

//actions

const USER_LOGGING_IN='USER_LOGGING_IN',
      USER_LOGGED_IN = 'USER_LOGGED_IN',
      USER_LOGGED_OUT = 'USER_LOGGED_OUT',
      LOG_OUT_USER='LOG_OUT',
      SET_NEW_POLL ='SET_NEW_POLL',
      USER_REGISTERING = 'USER_REGISTERING',
      USER_REGISTERED = 'USER_REGISTERED',
      INSERT_QUESTIONS = 'INSERT_QUESTIONS',
      GETTING_QUESTIONS = 'GETTING_QUESTIONS',
      ADD_ANOTHER_QUESTION = 'ADD_ANOTHER_QUESTION',
      DELETE_A_QUESTION = 'DELETE_A_QUESTION',
      SET_USER = 'SET_USER',
      CREATING_QUESTION='CREATING_QUESTION',
      SHOW_HIDE_ANSWERS ='SHOW_HIDE_ANSWERS',
      INSERT_POLL = 'INSERT_POLL',
      VOTE='VOTE',
      USER_VOTED='USER_VOTED',
      SET_QUESTION_ID='SET_QUESTION_ID',
      UPDATE_VOTES = 'UPDATE_VOTES',
      SET_VOTE = 'SET_VOTE',
      SET_UNAUTHORIZED = 'SET_UNAUTHORIZED';






//action creators
function  userRegistering(){
   return{
     type:USER_REGISTERING
   }

}

function userRegistered(username, userData){
  return{
    type: USER_REGISTERED,
    username,
    userData
  }
}

function userLoggingIn(){
  return{
    type: USER_LOGGING_IN
  }
}

function userLoggedIn(username,userData){
    return{
      type: USER_LOGGED_IN,
      username,
      userData
    }
}
function userLoggedOut(){
  return{
    type: USER_LOGGED_OUT
  }
}

function setUnauthorized(message){
  return{
    type:SET_UNAUTHORIZED,
    message
  }
}



function insertQuestions(questionsJSON){
     return{
       type: INSERT_QUESTIONS,
       questionsJSON
     }

}

function gettingQuestions(){
  return{
    type: GETTING_QUESTIONS
  }
}

function addAnotherQuestion(){
  return{
    type:ADD_ANOTHER_QUESTION
  }
}

function deleteAQuestion(){
  return{
    type:DELETE_A_QUESTION
  }
}


function creatingQuestion(){
  return{ type: CREATING_QUESTION
  }
}

function showHideAnswers(index){
  return{
    type: SHOW_HIDE_ANSWERS,
    index
  }
}


function insertPoll(question,answers){
  return{
    type:INSERT_POLL,
    question,
    answers
  }
}

function vote(index){
  return{
    type: VOTE,
    index
  }
}

function userVoted(){
  return{
    type:USER_VOTED
  }
}

function setQuestionID(questionID){
  return{
    type:SET_QUESTION_ID,
    questionID
  }
}

function updateVotes(index,answer){
  return{
    type:UPDATE_VOTES,
    index,
    answer
  }
}

function setVote(){
  return{
    type:SET_VOTE
  }
}

//thunks // actions dispatched userLoggingIn, userLoggedIn, push

function logInUser({email,password}){
  return (dispatch, getState) =>{
    dispatch(userLoggingIn())
    let data = {email,
      password
        };


    let method = 'post';

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    let params ={
      method,
      body:JSON.stringify(data),
      headers
    }
    let userData=null;
    return fetch('/login',params).then(
      res => res,
      error=> console.log('there was an error: '+ error)

    ).then(res=>{
        console.log('status')
        console.log(res.status)
      if(res.status === 401 || res.status === 400){dispatch(setUnauthorized('')); return {}}
       return res.json();
       }

    ).then(res =>{
        const userName = res.userName;
        const name=res.name;
        console.log('res')
        console.log(res)
      if(res.success){
          console.log(userName);
          sessionStorage.setItem('JWT', res.token)
          const data ={
            userName,
            name
          }

         dispatch(userLoggedIn(userName,data))
         dispatch(push(`/dashboard/${userName}`))
      }})
  }
}



//register
function registerUser ({email, password, username, firstname,lastname}){

    return (dispatch, getState) =>{
    dispatch(userRegistering())
    let data={
      email,
      password,
      username,
      firstname,
      lastname
    }

    let method = 'post';

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    let params ={
      method,
      body:JSON.stringify(data),
      headers
    }
    console.log(params.body)
    return fetch('/register', params).then(
      res => res.json(),
      error => console.log('there was an error' + error)
    ).then(
       res=>{
          if(res.err){
         console.log(res.err);
          dispatch(setUnauthorized(res.err))
         return {};
       }
         return res;
       }).then(res =>{
      console.log(res)
      if(res.success){ sessionStorage.setItem('JWT', res.token)
      dispatch(userRegistered(data.username,data))
      dispatch(push(`/dashboard/${data.username}`))
      console.log('finished');
       }
      }
    )

 }

}
//creating a new question with vote answers
function createVoteAction(ev){
   console.log('working')

}


//thunk for loggingOut
function logOutThunk(){
  return function(dispatch){
    sessionStorage.removeItem('JWT')
    dispatch(userLoggedOut())
    dispatch(push('/login'))
  }
}

//function for formating question so I cna put answers in them and other mockQuestionData

function formatQuestions(quest){

   quest = quest.map((val,i)=>{
     val.show=false;
     return val;
   })

  return quest;
}

//thunk to get getQuestions

function getQuestions(){
  return function(dispatch, getState){
    dispatch(gettingQuestions())

    let method='get';

    let token = sessionStorage.getItem('JWT')
    let user = getState().loggedIn.userName;
    let data={
      user,
    }

    let authorization = 'Bearer '+token;
    let headers = {
      'Authorization': authorization
    }

    let params ={
      method,
      headers
    }

    let url = '/api/questions?user='+user;

    return fetch(url,params).then(
      res=> res.json(),
      error=>console.log('error: '+error)
          ).then(
            res=>{
              console.log('here')
              console.log(formatQuestions(res.questions))
              if(res.success){dispatch(insertQuestions(formatQuestions(res.questions)))}
            }
          )


  }
}

//thunk for registering questions and answers
// {
//   loggedIn: {loggedIn: false, loggingIn:false},
//   register:{registering:false},
//   questions:{questions:[], gettingQuestions:false, gotQuestion:false},
//   poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
//   makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
//   router:{location:null}
// }

function newQuestionWAnswers({question,answers, path}){
  return function(dispatch,getState){
      // const question = getState().makePoll.question;
      //
      // const answers = getState().answers;
      const user = getState().loggedIn.userName;
      dispatch(creatingQuestion())
      let token = sessionStorage.getItem('JWT')

      let authorization = 'Bearer '+token;
      let data ={
        question,
        answers
      }
      let method ="POST"
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authorization

      }

      let params ={
        method,
        body:JSON.stringify(data),
        headers
      }

      fetch('api/createvote', params).then(
        res=> res.json(),
        err=>console.log(err)
      ).then(res=>{
        console.log(res)
        if(res.success && !path.includes('dashboard')){dispatch(push(`/dashboard/${user}`))}
        if(res.success && path.includes('dashboard')){dispatch(getQuestions())}
      }
      )



  }

}




function getPoll(id){
  return function(dispatch,getState){
    dispatch(setQuestionID(id))

    let method='GET';

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    let params ={
      method,
      headers
    }

  let url = 'api/getpoll?id='+id;

  return fetch(url,params).then(
    res=> res.json(),
    error=> console.log('there was an error: '+error)
  ).then(res=>{
    if(res.success){
      let question = res.question.question;
      let answers = res.question.answers;
      dispatch( insertPoll(question,answers))

  }})



  }
}


function getAnswers(questionID, index){
  return function(dispatch, getState){

     console.log('here')
    let method = 'GET';
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

     let url = '/api/answers?questionID='+questionID;
    let params={
      method,
      headers
      }
  return fetch(url,params).then(res=>res.json()).then(res=>{console.log(res.success)})
    console.log('here')
  }

}





function voteThunk(index){
  return function(dispatch, getState){
   console.log('working')
   dispatch(vote(index))

   let answerID = getState().poll.answers[index]._id;
   let questionID = getState().poll.questionID

   let method = 'POST';
   let data ={
     answerID,
     questionID
   }

   let headers={
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }

   let params = {
     method,
     body:JSON.stringify(data),
     headers
   }

   fetch('api/vote',params).then(res=> res.json()).then(res=>{if(res.success){
          dispatch(userVoted())
        }
   })
  }
}


function refreshVotes(id,index){
  return function(dispatch,getState){
    let method='GET';
    console.log(id);
    console.log(index);

     let url = 'poll/api/getpoll?id='+id;

     let params = {
       method
     }

  return fetch(url ,params).then(res=>res.json()).then(res=>{ if(res.success){
               console.log(res);
               let answer = res.question
              dispatch(updateVotes(index,answer))


               }
   })
  }
}

export {registerUser, createVoteAction, logOutThunk, userLoggedIn, userLoggedOut, userRegistering, userRegistered, logInUser, userLoggingIn, insertQuestions, gettingQuestions, getQuestions, addAnotherQuestion, deleteAQuestion,newQuestionWAnswers, creatingQuestion,getPoll, formatQuestions ,showHideAnswers, getAnswers, voteThunk, refreshVotes, setVote}
