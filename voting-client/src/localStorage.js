const loadState =()=>{
  try{
    const seralizedState=localStorage.getItem('state');
    if(seralizedState===null){
      return undefined;
    }
    return JSON.parse(seralizedState)
  }catch(err){
    return undefined;
  }


}


const saveState =(state)=>{
   try{
     const seralizedState = JSON.stringify(state);
     localStorage.setItem('state',seralizedState);
   }catch(err){
     //ignore write errors
   }
}

export {loadState, saveState}
