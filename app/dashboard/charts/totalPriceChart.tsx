"use client"

import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, Rectangle, CartesianGrid, Tooltip, Legend, YAxis, XAxis } from "recharts";

interface MonthlyData {
  name: string;
  totalPrices: number;
}

interface TotalPricesInMonthProps {
  coursesData: any;
}

const TotalPricesInMonth: React.FC<TotalPricesInMonthProps> = ({ coursesData }) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const monthlyData: MonthlyData[] = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = index + 1;
      const monthName = new Date(2024, monthIndex - 1, 1).toLocaleString('default', { month: 'short' });

      const coursesInMonth = coursesData.filter(
        (course: any) => new Date(course.createdAt).getUTCMonth() + 1 === monthIndex
      );

      const totalPrices = coursesInMonth.reduce((sum: any, course: any) => sum + course.price, 0);

      return { name: monthName, totalPrices };
    });

    setMonthlyData(monthlyData);
  }, [coursesData]); // Include coursesData as a dependency to trigger the effect when the data changes.

  return (
    <ResponsiveContainer minWidth={800} height={500}>
      <BarChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        width={1000}
        height={500}
        data={monthlyData}
      >
        <Tooltip />
        <Bar dataKey="totalPrices" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <YAxis />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalPricesInMonth;
