import React from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import compose from 'recompose/compose';

import {
    field as fieldPropTypes,
    polyglot as polyglotPropTypes,
} from '../../../propTypes';
import CustomizedLabel from './CustomizedLabel';
import injectData from '../../injectData';

const PieChartView = ({ chartData, colorSet, p: polyglot }) => {
    if (!chartData) {
        return <p>{polyglot.t('no_data')}</p>;
    }
    return (
        <ResponsiveContainer className="lodex-chart" width="100%" height={300}>
            <PieChart>
                <Legend
                    verticalAlign="middle"
                    layout="vertical"
                    align="right"
                />
                <Pie
                    cx={155}
                    data={chartData}
                    fill="#8884d8"
                    outerRadius="63%"
                    labelLine
                    label={CustomizedLabel}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={String(index).concat('_cell_pie')}
                            fill={colorSet[index % colorSet.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

PieChartView.propTypes = {
    field: fieldPropTypes.isRequired,
    resource: PropTypes.object.isRequired,
    chartData: PropTypes.array.isRequired,
    colorSet: PropTypes.arrayOf(PropTypes.string),
    p: polyglotPropTypes,
};

PieChartView.defaultProps = {
    className: null,
};

export default compose(translate, injectData)(PieChartView);
