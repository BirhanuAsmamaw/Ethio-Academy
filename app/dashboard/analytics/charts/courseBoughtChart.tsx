"use client"

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, YAxis, XAxis, Rectangle, ResponsiveContainer } from 'recharts';

interface MonthlyData {
  name: string;
  courses: number;
}

interface CoursesBoughtChartProps {
  coursesData: any;
}

const CoursesBoughtChart: React.FC<CoursesBoughtChartProps> = ({ coursesData }) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const monthlyData: MonthlyData[] = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = index + 1;
      const monthName = new Date(2024, monthIndex - 1, 1).toLocaleString('default', { month: 'short' });

      const coursesInMonth = coursesData.filter((course: any) => {
        const courseMonth = new Date(course.createdAt).getUTCMonth() + 1;
        return courseMonth === monthIndex;
      });

      const totalCourses = coursesInMonth.length;

      return { name: monthName, courses: totalCourses };
    });

    setMonthlyData(monthlyData);
  }, [coursesData]);

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
        <Bar dataKey="courses" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <YAxis />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CoursesBoughtChart;
