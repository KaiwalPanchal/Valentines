import { GameProvider, useGame } from './context/GameContext';
import { AudioControl } from './components/AudioControl';
import { Page0_Loading } from './pages/Page0_Loading';
import { Page1_Scratch } from './pages/Page1_Scratch';
import { Page2_Suspect } from './pages/Page2_Suspect';
import { Page3_Evidence } from './pages/Page3_Evidence';
import { Page4_Quiz } from './pages/Page4_Quiz';
import { Page5_Hidden } from './pages/Page5_Hidden';
import { Page6_Puzzle } from './pages/Page6_Puzzle';
import { Page7_Verdict } from './pages/Page7_Verdict';
import { Page8_Ask } from './pages/Page8_Ask';
import { Page9_Celebration } from './pages/Page9_Celebration';
import { PageTransition } from './components/PageTransition';

const PageContent = () => {
  const { currentPage } = useGame();

  switch (currentPage) {
    case 0:
      return <Page0_Loading />;
    case 1:
      return <Page1_Scratch />;
    case 2:
      return <Page2_Suspect />;
    case 3:
      return <Page3_Evidence />;
    case 4:
      return <Page4_Quiz />;
    case 5:
      return <Page5_Hidden />;
    case 6:
      return <Page6_Puzzle />;
    case 7:
      return <Page7_Verdict />;
    case 8:
      return <Page8_Ask />;
    case 9:
      return <Page9_Celebration />;
    default:
      return (
        <PageTransition>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            Working on Page {currentPage}...
          </div>
        </PageTransition>
      );
  }
};

function App() {
  return (
    <GameProvider>
      <PageContent />
      <AudioControl />
    </GameProvider>
  );
}

export default App;
