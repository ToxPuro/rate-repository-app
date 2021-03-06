import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormitTextInput';
import theme from '../theme';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';




const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  form: {
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 4
  },
  content: {
    flexGrow: 0,
    width: 700,
    height: 50,
    borderWidth: 3,
    margin: 10
  },
  button: {
    borderWidth: 3
  }
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="name" placeholder="Username" style={styles.content} testID="usernameField"/>
      <FormikTextInput secureTextEntry name="password" placeholder="Password" style={styles.content} testID="passwordField"/>
      <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
        <Text style={{backgroundColor: theme.colors.primary}}>Sign In</Text>
      </Pressable>
    </View>
  );
};




export const SignInContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
  })

  const initialValues = {
    name: '',
    password: '',
  };

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} style={styles.form} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
const SignIn = () => {
  const [signIn ] = useSignIn();
  const onSubmit = async({name, password}) => {
    try{
      await signIn({username: name, password});
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInContainer onSubmit={onSubmit}/>
    </View>

  );
};


export default SignIn;