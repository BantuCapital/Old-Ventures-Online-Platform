import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './reducers/postReducer';


const middleware = [thunk];
const rootReducer= combineReducers({
  posts: postReducer,
});
function saveToLocalStorage(state) {
    try{
    	const serializedState=JSON.stringify(state);
    	localStorage.setItem('posts',serializedState);
    }
    catch(e){
    	console.log(e);
    }
}
function loadFromLocalStorage(){
      try{
       const serializedState=localStorage.getItem('posts');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState) 
      }
      catch(e){
              console.log(e);
        return undefined;
      }
	    	
}
const PersistedState =loadFromLocalStorage();
const store = createStore(
  rootReducer,
  PersistedState,
  compose(
    applyMiddleware(...middleware)
  )
);
store.subscribe(() =>saveToLocalStorage(store.getState()));
export default store;