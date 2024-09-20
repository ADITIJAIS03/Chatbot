import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const MainTable = ({onRowClick}) => {
    const [tableData, setTableData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'year', direction: 'ascending' });

    useEffect(() => {
        fetch('/salaries.csv') // Make sure you have salaries.csv in the public folder
            .then(response => response.text())
            .then(data => {
                Papa.parse(data, {
                    header: true,
                    complete: (results) => {
                        const processedData = processSalaryData(results.data);
                        setTableData(processedData);
                    }
                });
            });
    }, []);

    const processSalaryData = (data) => {
        const groupedData = data.reduce((acc, row) => {
            const year = row.work_year;
            const salary = parseFloat(row.salary_in_usd);

            if (!acc[year]) {
                acc[year] = { totalJobs: 0, totalSalary: 0 };
            }

            acc[year].totalJobs += 1;
            acc[year].totalSalary += salary;

            return acc;
        }, {});

        return Object.keys(groupedData).map(year => ({
            year,
            totalJobs: groupedData[year].totalJobs,
            avgSalary: (groupedData[year].totalSalary / groupedData[year].totalJobs).toFixed(2),
        }));
    };

    const sortedData = [...tableData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h1>ML Engineer Salary Data (2020-2024)</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('year')}>Year</th>
                        <th onClick={() => requestSort('totalJobs')}>Total Jobs</th>
                        <th onClick={() => requestSort('avgSalary')}>Average Salary (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={index} onClick={() => onRowClick(row.year)}>
                            <td>{row.year}</td>
                            <td>{row.totalJobs}</td>
                            <td>{row.avgSalary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainTable;
