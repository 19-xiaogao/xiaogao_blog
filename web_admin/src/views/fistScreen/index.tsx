import React from 'react'
import './index.scss'
import ReactECharts from 'echarts-for-react';
import { BarOption, pieOptions, lineOptions } from './echartOptions';

import moment from 'moment'

import { IBlog } from '../../types/response'
import { Card, message } from 'antd'

import { httpGetAllBlog } from '../../api/api'



interface IFistScreenState {
    barVariableOptions: {
        xAxisData: string[]
        seriesData: number[]
    }
    lineVariableOptions: {
        xAxisData: string[],
        seriesDataOne: number[],
        seriesDataThrow: number[]
    }
    pieVariableOptions: {
        seriesData: { value: number, name: string }[]
    }
}

class FistScreen extends React.Component<{}, IFistScreenState> {
    
    state = {
        barVariableOptions: {
            xAxisData: [],
            seriesData: []
        },
        lineVariableOptions: {
            xAxisData: [],
            seriesDataOne: [],
            seriesDataThrow: []
        },
        pieVariableOptions: {
            seriesData: []
        }
    }

    componentDidMount() {
        this.initData()
    }

    private async initData() {

        const { success, data } = await httpGetAllBlog()

        if (!success) return message.error('服务器错误')

        const mapData = data.map((item: IBlog) => ({ ...item, createDate: moment(item.createDate).format('YYYY-MM') }))

        this.disposeBar(mapData)
        this.disposePie(mapData)
    }

    // 处理柱状图and折线图的数据
    private disposeBar(arr: IBlog[]) {

        const classify = arr.reduce((last: any, item: IBlog) => {
            if (last[item.createDate]) {
                last[item.createDate].push(item)
            } else {
                last[item.createDate] = [item]
            }
            return last
        }, {})

        const AxisData = Object.keys(classify)

        let seriesData = []
        let seriesDataTow = []
        for (let k in classify) {

            let count = 0
            let countLike = 0
            classify[k].forEach((item: IBlog) => {
                count += item.viewCount
                countLike += item.likeCount
            });

            seriesData.push(count)
            seriesDataTow.push(countLike)
        }

        this.setState({
            barVariableOptions: { xAxisData: AxisData, seriesData },
            lineVariableOptions: { xAxisData: AxisData, seriesDataOne: seriesData, seriesDataThrow: seriesDataTow }
        })

    }
    private disposePie(arr: IBlog[]) {
        let seriesData: any[] = []
        if (arr.length < 5) {
            seriesData = arr.map(item => ({ value: item.likeCount, name: item.title }))
        } else {
            seriesData = arr.splice(0, 5).map(item => ({ value: item.likeCount, name: item.title }))
        }
        this.setState({ pieVariableOptions: { seriesData } })
    }

    render() {

        const { barVariableOptions, lineVariableOptions, pieVariableOptions } = this.state

        return <Card className='fistScreen'>

            <div className='barCharts'>
                <ReactECharts
                    option={BarOption(barVariableOptions.xAxisData, barVariableOptions.seriesData)}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className='pie'>
                <ReactECharts
                    option={pieOptions(pieVariableOptions.seriesData)}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className='line'>
                <ReactECharts
                    option={lineOptions(lineVariableOptions.xAxisData, lineVariableOptions.seriesDataOne, lineVariableOptions.seriesDataThrow)}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </Card>
    }
}

export default FistScreen