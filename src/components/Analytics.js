import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';

// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,    // This is the missing scale ("category")
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ selectedYear }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    fetch('/salaries.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results) => {
            setSalaryData(results.data);
          },
        });
      })
      .catch((error) => console.error('Error loading CSV data:', error)); // Error handling
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const filteredData = salaryData.filter((row) => row.work_year === selectedYear);
      const jobCounts = filteredData.reduce((acc, row) => {
        acc[row.job_title] = (acc[row.job_title] || 0) + 1;
        return acc;
      }, {});

      const jobDetailsArray = Object.keys(jobCounts).map((jobTitle) => ({
        title: jobTitle,
        count: jobCounts[jobTitle],
      }));

      setJobDetails(jobDetailsArray);
    }
  }, [selectedYear, salaryData]);

  const lineChartData = {
    labels: [...new Set(salaryData.map((row) => row.work_year))],
    datasets: [
      {
        label: 'Total Jobs',
        data: salaryData.reduce((acc, row) => {
          const year = row.work_year;
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {}),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Average Salary (USD)',
        data: salaryData.reduce((acc, row) => {
          const year = row.work_year;
          acc[year] = acc[year]
            ? acc[year] + parseFloat(row.salary_in_usd)
            : parseFloat(row.salary_in_usd);
          return acc;
        }, {}),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Job Analytics</h2>
      <Line data={lineChartData} />

      {selectedYear && (
        <div>
          <h3>Job Titles for {selectedYear}</h3>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Number of Jobs</th>
              </tr>
            </thead>
            <tbody>
              {jobDetails.map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{job.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Analytics;
