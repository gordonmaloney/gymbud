import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers/CombineReducers";
import { Main } from "./components/Main";

import { SignUp } from './components/auth/SignUp'
import { GetUsers } from "./components/auth/GetUsers";
import { GetUser } from './components/auth/GetUser'
import { AddExerciseComponent } from './components/auth/AddExercise'
import { AddTargetComponent } from "./components/auth/AddTargetComponent";
import { UpdateExerciseComponent } from "./components/auth/UpdateExercise";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      {/*<Main />
      */}


      <SignUp />
      <GetUsers />

      <AddExerciseComponent />

      <AddTargetComponent />

      <UpdateExerciseComponent />


    </Provider>
  );
}

export default App;
