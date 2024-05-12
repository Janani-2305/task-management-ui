import React, { useCallback, useEffect, useRef } from 'react';
import Chart, { CategoryScale } from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


export const LineChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ['week1', 'week2', 'week3', 'week4', 'week5'],
                datasets: [{
                    label: "Work Completed",
                    data: [1, 2, 2, 4, 3],
                    fill: false,
                    borderColor: 'rgb(75,192,192)',
                    borderWidth: 2
                }]
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    const downloadImage = useCallback(() => {
        html2canvas(chartRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 308;
            const pageHeight = 395;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save("chart.pdf");
        });
    }, []);

    Chart.register(CategoryScale);

    return (
        <div style={{ textAlign: 'center' }}>
            <button type='button' onClick={downloadImage}>
                <FontAwesomeIcon icon={faDownload} size="1x" />
                <br />
               
            </button>
            <canvas ref={chartRef} style={{ width: "100px", height: "100px", marginTop: '20px' }}></canvas>
        </div>
    );
};
export default LineChart;