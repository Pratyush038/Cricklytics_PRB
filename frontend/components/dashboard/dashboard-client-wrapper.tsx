'use client';

import PlayerAnalysisForm from './player-analysis-form';

const DashboardClientWrapper = () => {
  const handleAnalysisSubmit = (data: any) => {
    // Handle the analysis submission here
    console.log('Analysis data:', data);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <PlayerAnalysisForm/>
      </div>
    </div>
  );
};

export default DashboardClientWrapper;

