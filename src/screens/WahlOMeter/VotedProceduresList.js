import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

// Components
import ListItem from '../VoteList/ListItem';
import ListSectionHeader from '../../components/ListSectionHeader';
import PieChart from '../../components/Charts/PieChart';
import ChartLegend from '../../components/Charts/ChartLegend';
import Header from './Header';
import ChartNote from './ChartNote';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

const ActivityIndicator = styled.ActivityIndicator`
  height: 36;
  padding-bottom: 18;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 18;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(400, Dimensions.get('window').width, Dimensions.get('window').height)};
`;

const ProcedureList = styled.FlatList`
  padding-bottom: 18;
`;

class VotedProceduresList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    hasMore: true,
  };

  render() {
    const { onItemClick, chartData } = this.props;
    const { hasMore } = this.state;
    return (
      <Query
        query={PROCEDURES_WITH_VOTE_RESULTS}
        variables={{ procedureIds: null, offset: 0, limit: 10 }}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore }) => {
          if (!data || !data.proceduresByIdHavingVoteResults) {
            return <ActivityIndicator />;
          }

          this.fetchMore = () => {
            fetchMore({
              variables: {
                offset: data.proceduresByIdHavingVoteResults.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (
                  hasMore &&
                  fetchMoreResult.proceduresByIdHavingVoteResults.procedures.length === 0
                )
                  this.setState({ hasMore: false });

                prev.proceduresByIdHavingVoteResults.procedures;
                return Object.assign({}, prev, {
                  proceduresByIdHavingVoteResults: {
                    ...prev.proceduresByIdHavingVoteResults,
                    procedures: [
                      ...prev.proceduresByIdHavingVoteResults.procedures,
                      ...fetchMoreResult.proceduresByIdHavingVoteResults.procedures,
                    ],
                  },
                });
              },
            });
          };

          return (
            <ProcedureList
              ref={this.myRef}
              data={[{ key: 123 }, ...data.proceduresByIdHavingVoteResults.procedures]}
              renderItem={({ item }) => {
                if (item.key) {
                  return (
                    <>
                      <ChartWrapper>
                        <PieChart
                          data={chartData}
                          colorScale={['#EAA844', '#B1B3B4']}
                          label="Bundestag"
                          subLabel="Wahl-O-Meter"
                        />
                      </ChartWrapper>
                      <ChartLegend data={chartData} />
                      <ChartNote>
                        Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten eine
                        inhaltliche Nähe zu den Regierungsfraktionen
                      </ChartNote>
                    </>
                  );
                }
                return (
                  <ListItem
                    key={item.procedureId}
                    item={item}
                    onClick={() => onItemClick({ item })}
                  />
                );
              }}
            />
          );
        }}
      </Query>
    );
  }
}

VotedProceduresList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default VotedProceduresList;
