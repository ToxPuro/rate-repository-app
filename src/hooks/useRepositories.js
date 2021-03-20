import { useState, useEffect } from 'react';
import { useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data} = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network'
  })
  const result = loading ? {repositories: null } : {repositories: data.repositories};
  return result;
};

export default useRepositories;