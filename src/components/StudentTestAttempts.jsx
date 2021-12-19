import React, { useState, useEffect } from 'react';
import testsService from '../services/testsService';
import { useParams, useHistory } from 'react-router-dom';
import LoadingIcon from './LoadingIcon';
import DomToImage from 'dom-to-image';
import jsPDF from 'jspdf';

const StudentTestAttempts = (props) => {
  const { sessionId, studentId } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [averageGrades, setAverageGrades] = useState({});

  const getStudentAverageTestGrade = async () => {
    try {
      const response = await testsService.getStudentSessionAverageGrades(sessionId, studentId);
      
      if (response) {
        setAverageGrades(response.data);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const init = async () => {
      await getStudentAverageTestGrade(sessionId, studentId);
    }

    init();
  }, [sessionId, studentId]);

  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">

      </section>
    </div>
  );
};

export default StudentTestAttempts;
