import "./TabStats.css";
import ChartArea from "../charts/ChartArea";
import CardStats from "../cards/CardStats";

export default function TabStats({
    theme,
    colors,
    width,
    statsData,
    chartVolumeData,
    chartSalesData,
    chartOwnersData,
    chartMintsData,
    chartAvgData,
    chartFeesData
}) {

    return (
        <div className="tab-stats">
            <div className="tab-stats__charts">
                <div className="tab-stats__charts-wrapper">
                    {
                        chartVolumeData?.length > 0 &&
                        <ChartArea
                            title="Volume per day"
                            color={colors[0]}
                            data={chartVolumeData}
                            width={width}
                            type="currency"
                        />
                    }
                    {
                        chartSalesData?.length > 0 &&
                        <ChartArea
                            title="Sales per day"
                            color={colors[1]}
                            data={chartSalesData}
                            width={width}
                            type="number"
                        />
                    }
                    {
                        chartFeesData?.length > 0 &&
                        <ChartArea
                            title="Fees per day"
                            color={colors[2]}
                            data={chartFeesData}
                            width={width}
                            type="currency"
                        />
                    }
                    {
                        chartAvgData?.length > 0 &&
                        <ChartArea
                            title="Average Price per day"
                            color={colors[3]}
                            data={chartAvgData}
                            width={width}
                            type="currency"
                        />
                    }
                    {
                        chartOwnersData?.length > 0 &&
                        <ChartArea
                            title="Owners per day (cumulative)"
                            color={colors[4]}
                            data={chartOwnersData}
                            width={width}
                            type="number"
                        />
                    }
                    {
                        chartMintsData?.length > 0 &&
                        <ChartArea
                            title="Supply per day (cumulative)"
                            color={colors[5]}
                            data={chartMintsData}
                            width={width}
                            type="number"
                        />
                    }

                </div>
            </div>
            <div>
                <CardStats
                    statsData={statsData}
                />
            </div>
        </div>
    );
}
