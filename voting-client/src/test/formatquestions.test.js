import {formatQuestions} from '../actions/actions';

describe('test for the formatQuestions function',()=>{


  it('it takes in question data from the api and formats it correctly to go into the reducer',()=>{
     const mockJSON=[{id:'fiafdsa',question:'nate hero'}, {id:'fiass2t', question:'color?'}]

      let questionJSON = formatQuestions(mockJSON);

      expect(questionJSON).toEqual([{id:'fiafdsa',question:'nate hero', answers:[], show:false},
                                     {id:'fiass2t', question:'color?', answers:[], show:false}])



  })


})
