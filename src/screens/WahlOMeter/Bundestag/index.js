import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

// Components
import PieChart from '../../../components/Charts/PieChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresList from '../VotedProceduresList';

const Wrapper = styled.View`
  background-color: #ffa;
  padding-top: 18;
  flex: 1;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 18;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(400, Dimensions.get('window').width, Dimensions.get('window').height)};
`;

const Bundestag = ({
  chartData,
  totalProcedures,
  votedProceduresCount,
  onProcedureListItemClick,
}) => {
  const data = [
    {
      label: 'Übereinstimmungen',
      percent: chartData.matches / chartData.count,
      value: chartData.matches,
      total: chartData.count,
      color: '#f5a623',
    },
    {
      label: 'Differenzen',
      percent: chartData.diffs / chartData.count,
      value: chartData.diffs,
      total: chartData.count,
      color: '#b1b3b4',
    },
  ];

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <Wrapper
      removeClippedSubviews
      // onScroll={({ nativeEvent }) => {
      //   if (isCloseToBottom(nativeEvent)) {
      //     if (this.procedureList.fetchMore) this.procedureList.fetchMore();
      //   }
      // }}
      scrollEventThrottle={4000}
    >
      {/* <Header totalProcedures={totalProcedures} votedProceduresCount={votedProceduresCount} />
      <ChartWrapper>
        <PieChart
          data={data}
          colorScale={['#EAA844', '#B1B3B4']}
          label="Bundestag"
          subLabel="Wahl-O-Meter"
        />
      </ChartWrapper>
      <ChartLegend data={data} />
      <ChartNote>
        Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten eine inhaltliche Nähe
        zu den Regierungsfraktionen
      </ChartNote> */}
      <VotedProceduresList
        chartData={data}
        onItemClick={onProcedureListItemClick}
        ref={el => (this.procedureList = el)}
      />
    </Wrapper>
  );
};

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
  totalProcedures: PropTypes.number.isRequired,
  votedProceduresCount: PropTypes.number.isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Bundestag;
