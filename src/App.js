import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CollectionForm from './pages/CollectionForm';
import ReviewForm from './pages/ReviewForm';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PasswordConfirm from './pages/confirmation/PasswordConfirm';
import SignupConfirm from './pages/confirmation/SignupConfirm';
import Analytics from './pages/Analytics';
import ReviewTable from './pages/ReviewTable';
import LoginConfirm from './pages/confirmation/LoginConfirm';
import Dash from './pages/Dash';
import AdminRoute from './pages/routes/AdminRoute';
import CollectorRoute from './pages/routes/CollectorRoute';
import AlreadyLoggedin from './pages/confirmation/AlreadyLoggedin';

function App() {

  return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dash" exact component={Dash} />
            <CollectorRoute path="/collectionform" exact component={CollectionForm} />
            <AdminRoute path="/reviewform" component={ReviewForm} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/passwordconfirm" exact component={PasswordConfirm} />
            <Route path="/signupconfirm" exact component={SignupConfirm} />
            <Route path="/loginconfirm" exact component={LoginConfirm} />
            <Route path="/alreadyloggedin" exact component={AlreadyLoggedin} />
            <Route path="/login" exact component={Login} />
            <Route path="/analytics" exact component={Analytics} />
            <Route path="/reviewtable" exact component={ReviewTable} />
          </Switch>
        </Router>

        {/* <Footer /> */}
      </div>
  );
}

export default App;
