import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useQuery} from '@apollo/client';
import { GET_SIGNED_IN_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row"
  },
  // ...
});

const AppBar =() => {
  const { loading, error, data} = useQuery(GET_SIGNED_IN_USER,{fetchPolicy: 'cache-and-network'});
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  console.log('loading AppBar');
  if (!loading && data.authorizedUser){
    return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/"><Text color="primary" fontSize="subheading" fontWeight="bold" style={{paddingRight: 10}} >Repository</Text></Link>
        <Pressable onPressIn={signOut}><Text color="primary" fontSize="subheading" fontWeight="bold" style={{paddingRight: 10}}>Sign Out</Text></Pressable>
      </ScrollView>
    </View>
    )
  }
  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/"><Text color="primary" fontSize="subheading" fontWeight="bold" style={{paddingRight: 10}} >Repository</Text></Link>
        <Link to="/signIn"><Text color="primary" fontSize="subheading" fontWeight="bold" style={{paddingRight: 10}}>Sign In</Text></Link>
      </ScrollView>
    </View>
  ); 
};

export default AppBar;