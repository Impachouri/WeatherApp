import { LineChart } from '@mui/x-charts/LineChart';

export default function Tempchart({ timeData, tempData }) {
    console.log("tempData - ", tempData)
    console.log(" timedata ", timeData)
    return (
        <LineChart
            xAxis={[{ data: timeData }]}
            series={[
                {
                    data: tempData
                },
            ]}
            width={500}
            height={300}
        />
    );
}