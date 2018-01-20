import reducer from '../reducer/index';
import { userLoggedIn, userLoggedOut, userRegistering, userRegistered, userLoggingIn, insertQuestions, gettingQuestions, addAnotherQuestion,deleteAQuestion, creatingQuestion } from '../actions/actions';

describe('these are test for my reducer', ()=>{
       //setup for all createStore

    let state = {
      loggedIn: {loggedIn:false, loggingIn:false, userName:null},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    };
    let stateWithUser = {
      loggedIn: {loggedIn:true, loggingIn:false, userName:'me12345'},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    };

  it('initializes with the correct state',()=>{
    let nextState = reducer();

    expect(nextState).toEqual({
      loggedIn: {loggedIn: false, loggingIn:false, userName:null},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    })
  }),

  it('changes loggedIn to true and logging in to false when login with login action', ()=>{
       let mockUserName = 'me12345';
       let startState= {
         loggedIn: {loggedIn: false,loggingIn:true,userName:null},
         register:{registering:false},
         questions:{questions:[], gettingQuestions:false, gotQuestion:false},
         poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
         makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
         router:{location:null}
       }

       let action = userLoggedIn(mockUserName)

       let nextState = reducer(state,action);

       expect(nextState).toEqual({
         loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
         register:{registering:false},
         questions:{questions:[], gettingQuestions:false, gotQuestion:false},
         poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
         makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
         router:{location:null}
       })
    }),

    it('logs a user out: sets loggedIn to false with log out action',()=>{
       let startState = {
         loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
         register:{registering:false},
         questions:{questions:[], gettingQuestions:false, gotQuestion:false},
         poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
         makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
         router:{location:null}
       }

        let action = userLoggedOut();

        let nextState = reducer(state, action);

        expect(nextState).toEqual({
          loggedIn: {loggedIn: false, loggingIn:false, userName:null},
          register:{registering:false},
          questions:{questions:[], gettingQuestions:false, gotQuestion:false},
          poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
          makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
          router:{location:null}
        })
      }),

    it('indicates a user is registering with registering user action',()=>{
         let startState = state;
         let action = userRegistering();
         let nextState = reducer(startState, action);

         expect(nextState).toEqual({
           loggedIn: {loggedIn: false, loggingIn:false,userName:null},
           register:{registering:true},
           questions:{questions:[], gettingQuestions:false, gotQuestion:false},
           poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
           makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
           router:{location:null}
         })
       })

   it('from registering state goes to registering false  and logged in true',()=>{
     let mockUserName = 'me12345';
      let startState = {
        loggedIn: {loggedIn: false, loggingIn:false, userName:null},
        register:{registering:true},
        questions:{questions:[], gettingQuestions:false, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      }

      let action = userRegistered(mockUserName);
      let nextState = reducer(state,action);

      expect(nextState).toEqual({
        loggedIn: {loggedIn: true,loggingIn:false, userName:'me12345'},
        register:{registering:false},
        questions:{questions:[], gettingQuestions:false, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      })
  }),

  it('indicates that a user is logging in with userLoggingIn action',()=>{
    let startState = state;
    let action = userLoggingIn()
    let nextState = reducer(state,action);

    expect(nextState).toEqual({
      loggedIn: {loggedIn: false,loggingIn:true, userName:null},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    })
  }),

  it('creates it put questions into state when with add question action', ()=>{

  let startState ={
    loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
    register:{registering:false},
    questions:{questions:[], gettingQuestions:true, gotQuestion:true},
    poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
    makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
    router:{location:null}
  }

  let mockQuestionData =['what is a duck?', 'how old are you?','do you like sushi']

  let action = insertQuestions(mockQuestionData);
  let nextState = reducer(startState,action);

  expect(nextState).toEqual({
    loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
    register:{registering:false},
    questions:{questions:['what is a duck?', 'how old are you?','do you like sushi'], gettingQuestions:false, gotQuestion:true},
    poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
    makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
    router:{location:null}
    })
  }),

  it('indacates that questions are being getting called with action',()=>{
       let startState = stateWithUser;
       let action = gettingQuestions()

       let nextState = reducer(startState, action);

      expect(nextState).toEqual({
        loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
        register:{registering:false},
        questions:{questions:[], gettingQuestions:true, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      })


  }),

  it('adds an additional answer to a question', ()=>{
    let startState = stateWithUser;
    let action =addAnotherQuestion();

    let nextState = reducer(startState,action)

    expect(nextState).toEqual({
      loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null,null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    })
  }),
  it('remove one answer to a question', ()=>{


    let startState = stateWithUser;
    let action =deleteAQuestion()
    let nextState = reducer(startState,action)

    expect(nextState).toEqual({
      loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
      register:{registering:false},
      questions:{questions:[], gettingQuestions:false, gotQuestion:false},
      poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
      makePoll:{question:'', answers:[null,null], makingPoll:false, madePoll:false},
      router:{location:null}
    })

  }),

  it('changes state to indicate a question is being created',()=>{
     const startState = {
       loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
       register:{registering:false},
       questions:{questions:[], gettingQuestions:false, gotQuestion:false},
       poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
       makePoll:{question:'', answers:[null,null,null,null], makingPoll:false, madePoll:false},
       router:{location:null}
     }

     const action = creatingQuestion();
     const nextState = reducer(startState,action);

     expect(nextState).toEqual({
       loggedIn: {loggedIn: true, loggingIn:false, userName:'me12345'},
       register:{registering:false},
       questions:{questions:[], gettingQuestions:false, gotQuestion:false},
       poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
       makePoll:{question:'', answers:[null,null,null,null], makingPoll:true, madePoll:false},
       router:{location:null}
     })


  })


})
