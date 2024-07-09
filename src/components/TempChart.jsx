import ReactApexChart from 'react-apexcharts';

const TempChart = ({ timeData, tempData }) => {
    const chartData = {
        series: [{
            name: "Temperature",
            data: tempData
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                colors: ['#6A0DAD']
            },
            xaxis: {
                categories: timeData
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false
            },

            title: {
                text: 'Temperature in Celsius over Time',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 1,
                    gradientToColors: ['#E0BBE4'],
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100]
                }
            }
        }
    };

    return (
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={200} width={650} />
    );
};

export default TempChart;
