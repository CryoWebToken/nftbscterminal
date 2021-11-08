import React, { useRef, useEffect } from "react";
import "./ChartSankey.css";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { intlNumFormat } from "../../helpers/functions";

export default function ChartSankey({
    state,
    width,
    data
}) {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if(!width) return;
        if(!svgRef.current) return;
        if(data?.length === 0) return;

        // Compute keys and colors for updated dnd data
        const rowIds = state.dndData.columns["column-1"].rowIds;
        if(rowIds.length === 0) return;

        const keys = [];
        const colors = [];
        rowIds.forEach(id => {
            keys.push(state.dndData.rows[id].key);
            colors.push(state.dndData.rows[id].color);
        });
        const canvas = svgRef.current;
        const margin = { top: 0, right: 0, bottom: 0, left: 0 };
        const minWidth = 600;
        const outerWidth = width > minWidth ? width - 40 : minWidth - 20;
        const outerHeight = 500;
        const innerWidth = outerWidth - margin.left - margin.right;
        const innerHeight = outerHeight - margin.top - margin.bottom;

        // Render chart
        const chart = sankey()
            .nodeWidth(10)
            .nodePadding(40)
            .extent([[0, 0], [innerWidth, innerHeight]]);  

        const graph = computeGraph();

        const { nodes, links } = chart({
            nodes: graph.nodes.map(d => Object.assign({}, d)),
            links: graph.links.map(d => Object.assign({}, d))
        });

        const svg = select(svgRef.current)
            .data([null])
            .join("svg")
            .classed("chart-sankey__svg", true)
            .attr("width", outerWidth)
            .attr("height", outerHeight)
            .attr("viewBox", [0, 0, outerWidth, outerHeight]);

        const tooltip = select(tooltipRef.current)
            .style("opacity", 0);

        const chartLabels = svg
            .selectAll(".chart__label--name")
            .data(nodes)
            .join("text")
            .classed("chart__label--name", true)       
            .attr("id", (d,i) => `chart__label--name${i}`)
            .attr("x", d => {
                return d.x0 < innerWidth / 2
                    ? d.x1 + 6
                    : d.x0 - 6;
            })
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", 0)
            .attr("text-anchor", d => {
                return d.x0 < innerWidth / 2
                    ? "start"
                    : "end";
            })
            .text((d, i) => {
                const output = `${d["name"]}`;
                return output;
            });

        const chartValues = svg
            .selectAll(".chart__label--value")
            .data(nodes)
            .join("text")
            .classed("chart__label--value", true)       
            .attr("id", (d,i) => `chart__label--value${i}`)
            .attr("x", d => {
                return d.x0 < innerWidth / 2
                    ? d.x1 + 6
                    : d.x0 - 6;
            })
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", 16)
            .attr("text-anchor", d => {
                return d.x0 < innerWidth / 2
                    ? "start"
                    : "end";
            })
            .text(d => {
                return `owners: ${intlNumFormat(d["value"])}`;
            });

        const gNodes = svg
            .selectAll(".g-nodes")
            .data([null])
            .join("g")
            .classed("g-nodes", true);

        const gNodesRect = gNodes
            .selectAll(".g-nodes__rect")
            .data(nodes)
            .join("rect")
            .classed("g-nodes__rect", true)
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .call(drag()
                .subject(d => d)
                .on("drag", onDragMove))
            .style("fill", (d, i) => colors[d["layer"]]);

        const gLinks = svg
            .selectAll(".g-links")
            .data([null])
            .join("g")
            .classed("g-links", true);

        const gLinksPath = gLinks
            .selectAll(".g-links__path")
            .data(links)
            .join("path")
            .classed("g-links__path", true)
            .attr("d", sankeyLinkHorizontal())
            .style("stroke", (d, i) => colors[d.source["layer"]])
            .style("stroke-width", d => d.width)
            .style("opacity", 0.3)
            .on("mouseover", onMouseOver)
            .on("mousemove", onMouseMove)
            .on("mouseout", onMouseOut);

        function onDragMove(e, d) {
            const rectY = Number(select(this).attr("y"));
            d.y0 = d.y0 + e.dy;
            const yTranslate = d.y0 - rectY;

            select(this)
                .attr("transform", `translate(0,${yTranslate})`);

            select(`#chart__label--name${d.index}`)
                .attr("transform", `translate(0,${yTranslate})`);

            select(`#chart__label--value${d.index}`)
                .attr("transform", `translate(0,${yTranslate})`);
    
            sankey()
                .update({nodes, links});
            
            gLinksPath
                .attr("d", sankeyLinkHorizontal());
        }

        function onMouseOver(e) {
            select(this)
                .style("opacity", 0.8);

            tooltip
                .style("opacity", 1);
        }

        function onMouseMove(e, d) {
            const node = d;
            const xPos = e.layerX;
            const yPos = e.layerY;

            tooltip
                .style("top", `${yPos + 20}px`)
                .style("left", `${xPos + 20}px`)
                .style("transform", (d,i) => {
                    const newXPos = (width - xPos) > width / 2 ? 0 : "calc(-100% - 20px)";
                    const newYPos = yPos < 400 ? 0 : "calc(-100% - 20px)";
                    return `translate(${newXPos}, ${newYPos})`;
                });

            tooltip
                .selectAll(".tooltip__value")
                .html((d, i) => {
                    return i === 0 
                        ? `${node.source.name} → ${node.target.name}`
                        : intlNumFormat(node.value); 
            });
        }

        function onMouseOut(e) {
            select(this)
                .style("opacity", 0.3);

            tooltip
                .style("opacity", 0);
        }

        function computeGraph() {
            let index = -1;
            const nodes = [];
            const nodeByKey = new Map();
            const indexByKey = new Map();
            const links = [];

            for (const k of keys) {
                for (const d of data) {
                    const key = JSON.stringify([k, d[k]]);
                    if (nodeByKey.has(key)) continue;
                    const node = {name: d[k]};
                    nodes.push(node);
                    nodeByKey.set(key, node);
                    indexByKey.set(key, ++index);
                }
            }

                for (let i = 1; i < keys.length; ++i) {
                    const a = keys[i - 1];
                    const b = keys[i];
                    const prefix = keys.slice(0, i + 1);
                    const linkByKey = new Map();
                    for (const d of data) {
                        const names = prefix.map(k => d[k]);
                        const key = JSON.stringify(names);
                        const value = Number(d.value) || 1;
                        let link = linkByKey.get(key);
                        if (link) { link.value += value; continue; }
                            link = {
                            source: indexByKey.get(JSON.stringify([a, d[a]])),
                            target: indexByKey.get(JSON.stringify([b, d[b]])),
                            names,
                            value
                        };
                        links.push(link);
                        linkByKey.set(key, link);
                    }
                }

            return {nodes, links};
        }

        return () => {
            gNodesRect
                .attr("transform", "translate(0,0)");

            chartLabels
                .attr("transform", `translate(0,0)`);

            chartValues
                .attr("transform", `translate(0,0)`);

            if (canvas) {
                while (canvas.firstChild) {
                    canvas.removeChild(canvas.firstChild);
                }
            }
        }
    }, [state, width, data]);

    return (
        <div className="chart-sankey">
            {
                width && data?.length > 0 &&
                <div className="chart-sankey__tooltip" ref={tooltipRef}>
                    <div>
                        <span className="tooltip__name">Flow:</span>
                        <span className="tooltip__value">0</span>
                    </div>
                    <div>
                        <span className="tooltip__name">Owners:</span>
                        <span className="tooltip__value">0</span>
                    </div>
                </div>
            }
            <svg ref={svgRef}></svg>
        </div>
    );
}
