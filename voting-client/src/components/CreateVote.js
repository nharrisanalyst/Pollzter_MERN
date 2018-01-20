import React, { Component } from 'react';





const CreateVote = ({submit, addQuestion, deleteQuestion, answers}) =>{
    let input = {};
    console.log(answers);

    let answerForm = answers.map((val,i)=>{
        let answerId = 'answer'+i
        let number =i+1;
              return(
               <div key={i}>
                <br/>
               <input  className='input-text' type='text' placeholder={`Answer:${number}`} ref={node=> input[answerId]=node}/>
                </div>
               )})

 return(
   <div className='create-cont'>
    <div className='create-quest'>
   <form id ="createQuestion" onSubmit={ev =>{ ev.preventDefault()
     let answers = []
     for(var i in input){ if(i !='question') answers.push(input[i].value)}

     submit({question:input.question.value, answers:answers})
   }}>
   <br/>
    Question:
    
    <br/>
    <input className='input-text' placeholder='Question:' type= 'text' ref={node => input.question = node}/>
       {answerForm}
   </form>
   <br/>
   <button className='submit-button'  onClick={ev=>{ ev.preventDefault()
                            addQuestion()}}>Add aditional Answer</button> &nbsp;
  <button className='submit-button' onClick={ev=>{ ev.preventDefault()
                           deleteQuestion()}}>Remove Answer</button><br/>
    <br/>
   <input className='submit-button' type="submit" form="createQuestion" />
   </div>
  </div>

 )
}

export default CreateVote;
