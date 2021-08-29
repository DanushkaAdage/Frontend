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
import LoginConfirm from './pages/confirmation/LoginConfirm';
import Dash from './pages/Dash';
import Footer from './pages/components/Footer';
import AdminRoute from './pages/routes/AdminRoute';
import CollectorRoute from './pages/routes/CollectorRoute';
// import axios from 'axios';
// import ProtectedRoute from './pages/routes/ProtectedRoute';

function App() {

  return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dash" exact component={Dash} />
            <CollectorRoute path="/collectionform" exact component={CollectionForm} isAuth={sessionStorage.getItem("isAuth")} acctype={sessionStorage.getItem("acctype")}  />
            <AdminRoute path="/reviewform" component={ReviewForm} isAuth={sessionStorage.getItem("isAuth")} acctype={sessionStorage.getItem("acctype")} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/passwordconfirm" exact component={PasswordConfirm} />
            <Route path="/signupconfirm" exact component={SignupConfirm} />
            <Route path="/loginconfirm" exact component={LoginConfirm} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>

        <Footer />
      </div>
  );
}

export default App;
