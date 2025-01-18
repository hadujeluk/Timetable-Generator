import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FiDownload, FiPrinter } from 'react-icons/fi';

const Timetable = ({ teacherName }) => {
  const times = [
    '08:10 a.m. - 08:50 a.m.',
    '08:50 a.m. - 09:30 a.m.',
    '09:30 a.m. - 09:40 a.m. (short-Break)',
    '09:40 a.m. - 10:20 a.m.',
    '10:20 a.m. - 11:00 a.m.',
    '11:00 a.m. - 11:20 a.m. (Tea Break)',
    '11:20 a.m. - 12:00 noon',
    '12:00 noon - 12:40 p.m.',
    '12:40 p.m. - 01:20 p.m.',
    '01:20 p.m. - 02:00 p.m. (Lunch)',
    '02:00 p.m. - 02:40 p.m.',
    '02:40 p.m. - 03:20 p.m.',
    '03:20 p.m. - 04:00 p.m.',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const isBreakTime = (time) => time.includes('Break') || time.includes('Lunch');

  const downloadPDF = () => {
    const input = document.getElementById('timetable');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * 180) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, 180, imgHeight);

      if (imgHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, imgHeight);
      }

      pdf.save('timetable.pdf');
    });
  };

  const printTimetable = () => {
    const input = document.getElementById('timetable');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${teacherName}'s Timetable</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ccc;
              text-align: center;
              padding: 8px;
            }
            th {
              background-color: #f4f4f4;
            }
            .break-time {
              background-color: #f0f0f0;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          ${input.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      {/* Download and Print Icons */}
      <div className="absolute top-4 left-4 flex space-x-4">
        <button
          onClick={downloadPDF}
          className="text-red-600 p-2 rounded-full hover:bg-red-100 relative group"
        >
          <FiDownload size={24} />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Download
          </span>
        </button>
        <button
          onClick={printTimetable}
          className="text-green-600 p-2 rounded-full hover:bg-green-100 relative group"
        >
          <FiPrinter size={24} />
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Print
          </span>
        </button>
      </div>

      <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg mt-8 mb-8">
        <div className="text-center font-bold text-xl mb-4">
          {teacherName}'s Timetable
        </div>

        <div className="overflow-x-auto" id="timetable">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                {days.map((day, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{time}</td>
                  {days.map((day, i) => (
                    <td
                      key={i}
                      className={`border border-gray-300 px-4 py-2 text-center ${
                        isBreakTime(time) ? 'bg-gray-200 border-dashed' : ''
                      }`}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
