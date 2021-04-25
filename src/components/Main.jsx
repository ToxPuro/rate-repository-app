import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Review from './Review';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/reviews"> 
          <UserReviews/>
        </Route>
        <Route path="/signUp">
          <SignUp/>
        </Route>
        <Route path='/review'>
          <Review/>
        </Route>
        <Route path='/repositories/:id'>
          <SingleRepository/>
        </Route>
        <Route path="/signIn" exact>
          <SignIn/>
        </Route>
        <Route path="/" exact>
          <RepositoryList/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;