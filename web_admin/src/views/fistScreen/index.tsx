import React from 'react'
import './index.scss'
import { EChartsOption } from 'echarts/types/dist/option';
import ReactECharts from 'echarts-for-react';
import { BarOption, pieOptions, LineOptions } from './echartOptions';

import { Card } from 'antd'

interface IFistScreenState {
    barOptions: EChartsOption
    pieOptions: EChartsOption
    LineOptions: EChartsOption
}

class FistScreen extends React.Component<{}, IFistScreenState> {
    state = {
        barOptions: BarOption,
        pieOptions,
        LineOptions
    }
    render() {
        const { barOptions, pieOptions, LineOptions } = this.state

        return <Card className='fistScreen'>
            <div className='barCharts'>
                <ReactECharts
                    option={barOptions}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className='pie'>
                <ReactECharts
                    option={pieOptions}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className='line'>
                <ReactECharts
                    option={LineOptions}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </Card>
    }
}

export default FistScreen