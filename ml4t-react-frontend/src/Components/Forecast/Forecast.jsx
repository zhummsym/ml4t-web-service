import React, { useEffect, useState, useRef } from "react";
import "chartjs-adapter-date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart, { Tooltip } from "chart.js/auto";
import { format } from "date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import { API_BASE_URL } from "../../config";
Chart.register(annotationPlugin);

export const Forecast = () => {
  const [ticker, setTicker] = useState("");
  const [resultData, setResultData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartChecked, setChartChecked] = useState(false);
  const [tableChecked, setTableChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    setResultData(null);
    setTableData(null);
    setChartData(null);

    setError("");
    if (!ticker) {
      setError("Stock ticker is required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/forecast?ticker=${ticker}`
      );

      const data = response.data;

      let holding = 0;
      const orders = JSON.parse(data.orders);
      const orderDates = Object.keys(orders).map(
        (dateString) => new Date(parseInt(dateString, 10))
      );
      for (let date in orders) {
        holding += orders[date];
      }
      setResultData(holding);

      if (chartChecked) {
        const labels = Object.keys(JSON.parse(data.normed)).map(
          (dateString) => new Date(parseInt(dateString, 10))
        );
        const strategyData = Object.values(JSON.parse(data.normed));
        const benchmarkData = Object.values(JSON.parse(data.normed_benchmark));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Strategy Learner",
              data: strategyData,
              fill: false,
              borderColor: "blue",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Benchmark",
              data: benchmarkData,
              fill: false,
              borderColor: "black",
              pointRadius: 0,
              borderWidth: 1,
            },
          ],
          orders: JSON.parse(data.orders),
          orderDates: orderDates,
        });
      }

      if (tableChecked) {
        setTableData({
          strategy_cr: data.strategy_cr,
          strategy_sdr: data.strategy_sdr,
          strategy_adr: data.strategy_adr,
          benchmark_cr: data.benchmark_cr,
          benchmark_sdr: data.benchmark_sdr,
          benchmark_adr: data.benchmark_adr,
        });
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const mapResult = (value) => {
    if (value === 0) return "OUT";
    if (value === -1000) return "SHORT";
    if (value === 1000) return "LONG";
    return "";
  };

  useEffect(() => {
    if (chartData) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const annotations = chartData.orderDates.map((date) => {
        const orderValue = chartData.orders[date.getTime()];
        const borderColor = orderValue > 0 ? "green" : "red";
        return {
          type: "line",
          mode: "vertical",
          scaleID: "x",
          value: date,
          borderColor: borderColor,
          borderWidth: 2,
          label: {
            content: mapResult(orderValue),
            enabled: true,
            position: "top",
          },
        };
      });

      const config = {
        type: "line",
        data: chartData,
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "month",
                displayFormats: {
                  day: "MMM yyyy",
                },
                stepSize: 1,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Strategy Performance",
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.parsed.y;
                  return `${label}: ${value}`;
                },
                title: (tooltipItems) => {
                  const date = tooltipItems[0].parsed.x;
                  return format(new Date(date), "yyyy-MM-dd");
                },
              },
            },
            // annotation: {
            //   annotations: annotations,
            // },
          },
        },
      };

      chartInstanceRef.current = new Chart(chartRef.current, config);
    }
  }, [chartData]);

  const handleChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  };

  const handleCheckboxChange = (e) => {
    if (e.target.name === "chart") {
      setChartChecked(!chartChecked);
    } else if (e.target.name === "table") {
      setTableChecked(!tableChecked);
    }
  };

  return (
    <div>
      <h1>Forecast</h1>
      <form className="form mb-3">
        <label className="form-label">Enter a stock ticker:</label>
        <div className="input-group w-25">
          <input
            name="ticker"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={ticker}
            required
          />

          <button className="btn btn-primary" onClick={handleClick}>
            Analyze
          </button>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="chart"
            checked={chartChecked}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label className="form-check-label">Chart</label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="table"
            checked={tableChecked}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label className="form-check-label">Table</label>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {resultData != null ? (
        <span>
          The recommended position of {ticker.toUpperCase()} is{" "}
          {mapResult(resultData)}.
        </span>
      ) : null}
      {chartData != null ? <canvas ref={chartRef} /> : null}
      {tableData != null ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Strategy Learner</th>
              <th>Benchmark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cumulative Return</th>
              <td>{tableData.strategy_cr}</td>
              <td>{tableData.benchmark_cr}</td>
            </tr>
            <tr>
              <th>Standard Deviation</th>
              <td>{tableData.strategy_sdr}</td>
              <td>{tableData.benchmark_sdr}</td>
            </tr>
            <tr>
              <th>Average Daily Return</th>
              <td>{tableData.strategy_adr}</td>
              <td>{tableData.benchmark_adr}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
