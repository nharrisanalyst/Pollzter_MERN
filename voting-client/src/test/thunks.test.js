import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/actions';
import fetchMock from 'fetch-mock';


const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('logging in thunk',()=>{

    afterEach(()=>{
     fetchMock.reset(),
     fetchMock.restore()
      })

    it('redux logging in ', ()=>{
      let data = {email:'testemail@gmail.com',passsword:'mockpassword'};

      const responseBody = {success: true, token:'fkavcndkajiodsacdksa2389742934'};

      fetchMock.once('/login', {
        status: 200,
        body: JSON.stringify(responseBody),
        statusText: 'OK',
        headers: {'Content-Type': 'application/json'},
        sendAsJson: false
      }, {method: 'POST'});


      const expectedActions = [
       {type: 'USER_LOGGING_IN'},
       { type: 'USER_LOGGED_IN', json: undefined },
       { type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ["/dashboard"] } }
      ]


   const store = mockStore({
     loggedIn: {loggedIn: false, loggingIn:false},
     register:{registering:false},
     questions:{questions:[], gettingQuestions:false, gotQuestion:false},
     poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
     makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
     router:{location:null}
   })
   return store.dispatch(actions.logInUser(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('register thunk registers and redirects with success', ()=>{
    let data ={email:'testemail@gmail.com', password:'mockpasword',username:'fake12345',firstname:'me', lastname:'smith'}
    let responseBody={success:true, token:'fndjksh38ryucbeqtr3qfge78c8cyds87acda78'}

    fetchMock.once('/register',{
      status:200,
      body:JSON.stringify(responseBody),
      statusText:'OK',
      headers: {'Content-Type': 'application/json'},
      sendAsJson:false},{method:'POST'});

    const expectedActions =[
      {type: 'USER_REGISTERING' },
      {type: 'USER_REGISTERED' },
      { type: '@@router/CALL_HISTORY_METHOD',
         payload: { method: 'push', args: ["/dashboard"] } }
      ]

      const store = mockStore({
        loggedIn: {loggedIn: false, loggingIn:false},
        register:{registering:false},
        questions:{questions:[], gettingQuestions:false, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      })

      return store.dispatch(actions.registerUser(data)).then(()=>{
        expect(store.getActions()).toEqual(expectedActions)
      })
    }),

  it('logs a person out and removes JWT from session storage',()=>{

      const expectedActions=[
        {type: 'USER_LOGGED_OUT'}
      ]

      const store = mockStore({
        loggedIn: {loggedIn: true, loggingIn:false},
        register:{registering:false},
        questions:{questions:[], gettingQuestions:false, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      })

      store.dispatch(actions.logOutThunk());

      expect(store.getActions()).toEqual(expectedActions)
      expect(sessionStorage.getItem('JWT')).toBe(null)
  }),

  it('gets questions from the api and assigns them to state questions', ()=>{
    let mockQuestionData =['what is a duck?', 'how old are you?','do you like sushi'];
    let responseBody = {success:true, question:mockQuestionData};

    fetchMock.once('/questions',{
      status:200,
      body: JSON.stringify(responseBody),
      statusText:'OK',
      headers: {'Content-Type': 'application/json'},
      sendAsJson:false},{method:'GET'});

      const store = mockStore({
        loggedIn: {loggedIn: true, loggingIn:false},
        register:{registering:false},
        questions:{questions:[], gettingQuestions:false, gotQuestion:false},
        poll:{question:'', answers:[], showPoll:false, gettingPoll:false},
        makePoll:{question:'', answers:[null,null,null], makingPoll:false, madePoll:false},
        router:{location:null}
      })

      let expectedActions = [
        {type: 'GETTING_QUESTIONS'},
        {type: 'INSERT_QUESTIONS'}
      ]

       return store.dispatch(actions.getQuestions()).then(()=>{
         console.log(store.getState())
         expect(store.getActions()).toEqual(expectedActions)


       })
    })

})
