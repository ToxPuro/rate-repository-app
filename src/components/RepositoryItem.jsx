import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

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
    <View style={cardHeaderStyles.container}>
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

const infoStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
})



const RepositoryItem = ({repository}) => {
  return(
    <View style= {{backgroundColor: '#ffffff'}}>
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
    </View>
  )
}

export default RepositoryItem;