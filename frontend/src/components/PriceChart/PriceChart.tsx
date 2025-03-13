import { useEffect, useRef } from 'react';
import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';

type PriceChartProps = { symbolId: string | null };

const PriceChart = ({ symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);
  const latestFetchRef = useRef<any>(null);

  useEffect(() => {
    if (!symbolId) return;
    latestFetchRef.current?.abort();
    latestFetchRef.current = dispatch(fetchPriceHistory(symbolId));
    return () => latestFetchRef.current?.abort();
  }, [dispatch, symbolId]);

  if (!symbolId) return <div className="priceChart">Select stock</div>;
  if (apiState.loading)
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;

  return (
    <div className="priceChart">
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
