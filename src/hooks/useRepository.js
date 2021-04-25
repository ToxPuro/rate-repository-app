
import { useState, useEffect } from 'react';
import { useQuery} from '@apollo/client';
import {GET_REPOSITORY} from '../graphql/queries';

const useRepository = (id) => {
  const variables = {id}
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return{
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
  }
};

export default useRepository;
