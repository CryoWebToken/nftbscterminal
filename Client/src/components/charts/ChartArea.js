import { useRef, useEffect, useState } from "react";
import "./ChartArea.css";
import { createChart } from "lightweight-charts";
import { CHART_OPTIONS } from "../../helpers/constants";
import { intlNumFormatMaxDecimals, intlCurrNumFormat } from "../../helpers/functions";
import BtnSwitchScale from "../buttons/BtnSwitchScale";

export default function ChartArea({
    type,
    title,
    color,
    width,
    data,
}) {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        if(!width) return;
        if(data?.length === 0) return;

        const chart = createChart(canvasRef.current, {
            width: width > 803 ? (width * 0.66 - 10) : width,
            height: 360
        });

        const areaSeries = chart.addAreaSeries();
        chart.applyOptions(CHART_OPTIONS);

        areaSeries.applyOptions({
            topColor: `rgba(${color}, 0.15)`,
            bottomColor: `rgba(${color}, 0)`,
            lineColor: `rgba(${color}, 1)`,
            lineStyle: 0,
            lineWidth: 2,
        });

        if(type === "currency") {
            areaSeries.applyOptions({
                priceFormat: {
                    type: 'custom',
                    formatter: price => intlCurrNumFormat(price, 'BNB'),
                },
            });
        } else {
            areaSeries.applyOptions({
                priceFormat: {
                    type: 'custom',
                    formatter: price => intlNumFormatMaxDecimals(price, 0),
                },
            });
        }
        chart.applyOptions({
            priceScale: {
                mode: scale
            }
        });
        areaSeries.setData(data);
        chart.timeScale().fitContent();

        return () => {
            if (canvas && canvas.firstChild) {
                canvas.removeChild(canvas.firstChild);
            }
        }
    }, [data, width, color, type, scale]);

    return (
        <div>
            <div className="chart-title">
                <h2>{title}</h2>
                <BtnSwitchScale
                    scale={scale}
                    setScale={setScale}
                />
            </div>
            <div ref={canvasRef} className="chart-area"></div>
        </div>
    );
}
