import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import {useHistory, useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

const toK= (number) => {
  if(number<1000) return number;
  return `${(number/1000).toFixed(1)}k`;
}

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
});

const Header = ({repository}) => {
  return (
    <View style={cardHeaderStyles.container} testID={`${repository.id}/header`}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{uri: repository.ownerAvatarUrl}} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
        <Text color="textSecondary">{repository.description}</Text>
      </View>
    </View>
  );
};

const languageStyles = StyleSheet.create({
  container : {
    backgroundColor: theme.colors.primary,
    width: 73,
    borderWidth: 3
  }
})

const buttonStyles = StyleSheet.create({
  container : {
    backgroundColor: theme.colors.primary,
    width: 110,
    borderWidth: 3
  }
})

const infoStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
})

const GitHubButton = ({url}) => {

  const goToPage = () => {
    Linking.openURL(url);
  }

  return(
  <Pressable style={buttonStyles.container} onPressIn={goToPage}>
    <Text>
      Open In GitHub
    </Text>
  </Pressable>
  )

}

const RepositoryItem = ({repository}) => {
  const history = useHistory();
  return(
    <Pressable onPressIn={() => history.push(`/repositories/${repository.id}`)}>
      <View style= {{backgroundColor: '#ffffff'}} testID={repository.id} >
      <Header repository={repository}/>
      <View style={languageStyles.container}>
        <Text>{repository.language}</Text>
      </View>
      <View style={infoStyles.container}>
        <Text fontWeight='bold' style={{paddingRight: 5}} >{toK(repository.stargazersCount)}</Text>
        <Text fontWeight='bold' style={{paddingRight: 20}} >{toK(repository.forksCount)}</Text>
        <Text fontWeight='bold' style={{paddingRight: 35}} >{toK(repository.reviewCount)}</Text>
        <Text fontWeight='bold' style={{paddingRight: 5}} >{toK(repository.ratingAverage)}</Text>
      </View>
      <View style={infoStyles.container}>
        <Text color="textSecondary"  style={{paddingRight: 5}} >stars</Text>
        <Text  color="textSecondary" style={{paddingRight: 5}}>forks</Text>
        <Text  color="textSecondary" style={{paddingRight: 5}}>Reviews</Text>
        <Text  color="textSecondary" style={{paddingRight: 5}}>Rating</Text>
      </View>
      <View>
        {repository.url ? <GitHubButton url={repository.url}></GitHubButton> : null}
      </View>
      </View>
    </Pressable>
  )
}

export default RepositoryItem;