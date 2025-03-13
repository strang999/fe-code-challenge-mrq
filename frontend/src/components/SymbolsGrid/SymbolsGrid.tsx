import { useEffect, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import './symbolsGrid.css';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';

type SymbolsGridProps = {
  activeSymbol: string | null;
};

const SymbolsGrid = memo(({ activeSymbol }: SymbolsGridProps) => {
  const dispatch = useAppDispatch();
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const showInfo = useAppSelector(selectShowCardInfo);

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id) => (
        <SymbolCard
          key={id}
          id={id}
          price={prices[id]}
          isSelected={activeSymbol === id}
          showCardInfo={showInfo}
          hasSelectedCard={activeSymbol !== null}
        />
      ))}
    </div>
  );
});

export default SymbolsGrid;
