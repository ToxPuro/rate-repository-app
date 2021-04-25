import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormitTextInput';
import theme from '../theme';
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp';




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

const SignUpForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="name" placeholder="Username" style={styles.content} testID="usernameField"/>
      <FormikTextInput secureTextEntry name="password" placeholder="Password" style={styles.content} testID="passwordField"/>
      <FormikTextInput secureTextEntry name="passwordConfirmation" placeholder="Password confirmation" style={styles.content} testID="passwordConfirmationField"/>
      <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
        <Text style={{backgroundColor: theme.colors.primary}}>Sign In</Text>
      </Pressable>
    </View>
  );
};




export const SignUpContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, 'Max length 30')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Passwords need to be at least 5 characters long')
      .max(50, 'Password can be only 50 characters long')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], "Passwords don't match")
      .required('Password confirmation is required')
  })

  const initialValues = {
    name: '',
    password: '',
    paswordConfirmation: '',
  };

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} style={styles.form} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
const SignUp = () => {
  const [signUp ] = useSignUp();
  const onSubmit = async({name, password, passwordConfirmation}) => {
    try{
      console.log(name, password, passwordConfirmation);
      await signUp({username: name, password});
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SignUpContainer onSubmit={onSubmit}/>
    </View>

  );
};


export default SignUp;