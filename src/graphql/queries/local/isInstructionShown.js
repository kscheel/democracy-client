import gql from 'graphql-tag';

export default gql`
  query isInstructionsShown {
    isInstructionsShown @client
  }
`;
