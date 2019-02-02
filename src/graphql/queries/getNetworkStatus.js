import gql from 'graphql-tag';

export default gql`
  query networkStatus {
    networkStatus @client {
      isConnected
      requestError
    }
  }
`;
