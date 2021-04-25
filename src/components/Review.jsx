import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormitTextInput';
import theme from '../theme';
import {useHistory } from 'react-router-native';
import * as yup from 'yup'
import {useMutation} from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';



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

const ReviewForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.content} testID="repositoryOwnerField"/>
      <FormikTextInput name="repositoryName" placeholder="Repository" style={styles.content} testID="repositoryNameField"/>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.content} testID="ratingField"/>
      <FormikTextInput name="text" placeholder="Review" style={styles.content} testID="reviewField"/>
      <Pressable onPress={onSubmit} style={styles.button} testID="submitButton">
        <Text style={{backgroundColor: theme.colors.primary}}>Create a review</Text>
      </Pressable>
    </View>
  );
};




export const ReviewContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .typeError('Please enter a number')
      .min(0, 'number needs to be between 0 and 100')
      .max(100, 'number needs to be between 0 and 100')
      .required('Rating is required')
  })

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} style={styles.form} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
const Review = () => {
  const [mutate, result] = useMutation(ADD_REVIEW, {onError: (error) => {
    console.log(error.graphQLErrors[0].message)
  }});
  const history = useHistory();
  const onSubmit = async({ownerName, repositoryName, rating, text}) => {
    console.log(ownerName, repositoryName, rating, text);
    try{
      const { data } = await mutate({variables: {ownerName, repositoryName, rating: Number(rating), text}});
      history.push('/')
    } catch(e){
      console.log(e.message);
    }

  };

  return (
    <View style={styles.container}>
      <ReviewContainer onSubmit={onSubmit}/>
    </View>

  );
};


export default Review;