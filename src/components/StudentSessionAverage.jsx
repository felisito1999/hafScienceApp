import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Cell, Pie, PieChart } from 'recharts';
import testsService from '../services/testsService';
import LoadingIcon from './LoadingIcon';
import jsPDF from 'jspdf';
import DomToImage from 'dom-to-image';

const StudentSessionAverage = (props) => {
  const history = useHistory();
  const { sessionId, studentId } = useParams();

  const [averageGrade, setAverageGrade] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getAverageGrades = async () => {
    try {
      const result = await testsService.getStudentSessionAverageGrades(
        sessionId,
        studentId
      );

      if (result) {
        console.log(result);
        const report = [
          {
            name: 'Promedio de calificaciones',
            value: result.data.notaPromedio,
          },
        ];

        if (result.data.notaPromedio < 100) {
          report.push({
            name: 'restante',
            value: 100 - result.data.notaPromedio,
          });
        }

        setAverageGrade(report);
      }
      console.log(result);
    } catch (error) {
      setIsError(true);
    }
  };

  const pieColors = ['#4DB6AC', '#DC3545'];

  const radian = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * radian);
    const y = cy + radius * Math.sin(-midAngle * radian);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleCreateReport = async () => {
    const input = document.getElementById('report');
        const pdf = new jsPDF('p', 'pt', 'letter');

        if (pdf) {
          // pdf.html(input.innerHTML);
          // pdf.save('test');
          DomToImage.toJpeg(input, {quality: 1.0})
            .then(imgData => {
              const imageProps = pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save('reporte-promedio-calificaciones.pdf');
            });
        }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await getAverageGrades(sessionId, studentId);
      setIsLoading(false);
    };
    init();
  }, [sessionId, studentId]);

  return (
    <div className="component-wrapper">
      <section className="container banner-bg rounded-3 shadow py-3 my-5">
        {isLoading ? (
          <LoadingIcon />
        ) : isError ? (
          <h1>Ha ocurrido un error y no se pudo mostrar el reporte</h1>
        ) : (
          <article>
            <button
              className="w-100 btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleCreateReport();
              }}
            >
              Exportar reporte
            </button>
            <div id="report" className="bg-light">
              <div>
                <p className="fw-bold">Leyenda</p>
                <p>
                  <span className="text-success">&#9632;</span> Respuestas
                  correctas
                </p>
                <p>
                  <span className="text-danger">&#9632;</span> Respuestas
                  incorrectas
                </p>
              </div>
              <PieChart width={750} height={350}>
                <Pie
                  data={averageGrade}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {averageGrade.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </article>
        )}
      </section>
    </div>
  );
};

export default StudentSessionAverage;
