import { memo } from 'react';
import './performanceCard.css';
import PerformanceInfo from './src/PerformanceInfo';
import TrendLabel from './src/VolumeLabel';

type PerformanceCardProps = {
  title: string;
  volume: number;
  change: number;
  onClick?: () => void;
};

const PerformanceCard = ({ title, volume, change, onClick }: PerformanceCardProps) => {
  return (
    <div className="performanceCard" onClick={onClick}>
      <PerformanceInfo label={title} change={change} />
      <TrendLabel change={change} volume={volume} />
    </div>
  );
};
export default memo(PerformanceCard);
