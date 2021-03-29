import { EChartsOption } from 'echarts/types/dist/option';

export const BarOption = (xAxisData: string[], seriesData: number[]): EChartsOption => ({
    title: {
        text: '统计每月被查看量',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    xAxis: {
        type: 'category',
        data: xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: seriesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
})

export const lineOptions = (xAxisData: string[], seriesDatanOne: number[], seriesDatanTwo: number[]): EChartsOption => ({
    title: {
        text: '统计每月阅读量和喜欢量',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        // align
        data: ['喜欢量', '查看量'],
        orient: 'horizontal',
        bottom: '2%',
    },
    xAxis: {
        type: 'category',
        data: xAxisData
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '查看量',
        type: 'line',
        stack: '查看量',
        data: seriesDatanOne
    },
    {
        name: '喜欢量',
        type: 'line',
        stack: '喜欢量',
        color: 'red',
        data: seriesDatanTwo
    },
    ]
})


export const pieOptions = (seriesData: { vlaue: number, name: string }[]): EChartsOption => ({
    title: {
        text: '博客的前5的博客占比',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'horizontal',
        bottom: '2%',
    },
    series: [
        {
            type: 'pie',
            radius: '50%',
            data: seriesData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})
