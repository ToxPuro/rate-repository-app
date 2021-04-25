import { useState, useEffect } from 'react';
import { useQuery} from '@apollo/client';
import {GET_REPOSITORIES_BY_DATE, GET_REPOSITORIES_BY_RATING_ASC, GET_REPOSITORIES_BY_RATING_DESC} from '../graphql/queries';

const useRepositories = (sortMethod, keyword) => {
  let query;
  console.log(keyword);
  if(sortMethod==='latest') query = GET_REPOSITORIES_BY_DATE;
  else if(sortMethod==='highest') query= GET_REPOSITORIES_BY_RATING_DESC;
  else if(sortMethod==='lowest') query=GET_REPOSITORIES_BY_RATING_ASC;
  const variables={keyword}

  console.log(sortMethod);
  const { loading, error, data, fetchMore} = useQuery(query,{
    fetchPolicy: 'cache-and-network', variables: variables
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return{
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
  }
};

export default useRepositories;