let sessionStorageMock = ()=>{
   let store ={};
    return{
      getItem:function(name){
        return store[name]
      },

     setItem : function(name,item){
       store[name]=item.toString()
     },
     removeItem: function(name){
        store[name]=null
     }
   }
 }

 global.sessionStorage = sessionStorageMock();
