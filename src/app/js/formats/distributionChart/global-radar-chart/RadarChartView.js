import React from 'react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarAngleAxis,
    PolarRadiusAxis,
    PolarGrid,
} from 'recharts';
import get from 'lodash.get';
import compose from 'recompose/compose';

import { field as fieldPropTypes } from '../../../propTypes';
import injectData from '../../injectData';
import exportableToPng from '../../exportableToPng';

const styles = {
    container: {
        fontSize: '1.5rem',
    },
};

const RadarChartView = ({ formatData = [], colorSet, field }) => {
    const color = colorSet[0];
    const axisRoundValue = get(field, 'format.args.axisRoundValue');
    const scale = get(field, 'format.args.scale');
    const max = Math.max(...formatData.map(({ value }) => value));
    return (
        <div style={styles.container}>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={formatData}>
                    <Radar
                        dataKey="value"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.6}
                    />
                    <PolarGrid />
                    <PolarAngleAxis dataKey="_id" />
                    <PolarRadiusAxis
                        scale={scale}
                        domain={
                            scale === 'log' ? ['auto', 'auto'] : [0, 'auto']
                        } // log scale won't work with a domain starting at 0 (`auto` detect the boudaries and ensure it is readable)
                        tickCount={
                            axisRoundValue ? (max < 5 ? max + 1 : 5) : null
                        }
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

RadarChartView.propTypes = {
    field: fieldPropTypes.isRequired,
    linkedResource: PropTypes.object,
    resource: PropTypes.object.isRequired,
    formatData: PropTypes.array,
    colorSet: PropTypes.arrayOf(PropTypes.string),
};

RadarChartView.defaultProps = {
    className: null,
};

export default compose(injectData(), exportableToPng)(RadarChartView);
