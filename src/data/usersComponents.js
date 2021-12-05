import SchoolsDashboard from '../components/SchoolsDashboard';
import UserDetailsModal from '../components/UserDetailsModal';
import UsersDashboard from '../components/UsersDashboard';
import SchoolsDetailsModal from '../components/SchoolDetailsModal';
import PuzzleGameDifficult from '../components/PuzzleGameDifficult';
import PuzzleGameEasy from '../components/PuzzleGameEasy';
import PuzzleSelector from '../components/PuzzleSelector';
import GameSelector from '../components/GameSelector';
import TestAttempt from '../components/TestAttempt';
import TeachersSessionsDashboard from '../components/TeachersSessionsDashboard';
import AddSessionsUsers from '../components/AddSessionsUsers';
import CreateTest from '../components/CreateTest';
import StudentsSessionsDashboard from '../components/StudentsSessionsDashboard';
import StudentSessionDetails from '../components/StudentSessionDetails';

const usersComponents = {
  adminComponents: [
    UsersDashboard.name,
    UserDetailsModal.name,
    SchoolsDashboard.name,
    SchoolsDetailsModal.name,
  ],
  teacherComponents: [
    TeachersSessionsDashboard.name,
    AddSessionsUsers.name,
    CreateTest.name,
  ],
  studentComponents: [
    TestAttempt.name,
    GameSelector.name,
    PuzzleGameDifficult.name,
    PuzzleGameEasy.name,
    PuzzleSelector.name,
    StudentsSessionsDashboard.name,
    StudentSessionDetails.name,
  ],
};

export default usersComponents;
