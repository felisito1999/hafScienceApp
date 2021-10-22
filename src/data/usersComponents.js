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
    ],
    studentComponents: [
        TestAttempt.name,
        GameSelector.name,
        PuzzleGameDifficult.name,
        PuzzleGameEasy.name,
        PuzzleSelector.name,
    ]
};

export default usersComponents; 