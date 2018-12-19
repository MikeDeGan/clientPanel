import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
//@todo

const firebaseConfig = {
  apiKey: 'AIzaSyBGJH2ptRAdc1l4eK7Mg2uUpMMoJKQGa9E',
  authDomain: 'reactclientpanel-5cefc.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-5cefc.firebaseio.com',
  projectId: 'reactclientpanel-5cefc',
  storageBucket: 'reactclientpanel-5cefc.appspot.com',
  messagingSenderId: '1084660439522'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// set initial state
const initialState = {};

// create store with reducers
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
