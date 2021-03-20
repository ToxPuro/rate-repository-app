import {useMutation} from '@apollo/client';
import { SIGN_IN} from '../graphql/mutations'
import {useHistory } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const history = useHistory();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const {data}= await mutate({variables: {username,password}});
    console.log('authorize token');
    console.log(data.authorize.accessToken);
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    history.push('/');
    return data;
  };

  return [signIn, result];
};

export default useSignIn;