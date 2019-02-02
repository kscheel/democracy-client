import gql from 'graphql-tag';

export default gql`
  query filters {
    filters @client {
      filters
    }
  }
`;
