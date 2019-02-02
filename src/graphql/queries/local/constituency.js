import gql from 'graphql-tag';

export default gql`
  query constituency {
    constituency @client {
      constituency
    }
  }
`;
