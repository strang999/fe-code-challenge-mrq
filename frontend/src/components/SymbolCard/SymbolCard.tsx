import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import DownIcon from '@/assets/down.png';
import UpIcon from '@/assets/up.png';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { memo, useEffect, useState } from 'react';
import { formatCurrency, formatLargeNumber } from '@/lib/utils';
import { selectActiveSymbol, setActiveSymbol } from '@/store/dashboardOptionsSlice';

const CardInfo = memo(
  ({
    companyName,
    industry,
    marketCap
  }: {
    companyName: string;
    industry: string;
    marketCap: number;
  }) => (
    <>
      <ListItem Icon={<CompanyIcon />} label={companyName} />
      <ListItem Icon={<IndustryIcon />} label={industry} />
      <ListItem Icon={<MarketCapIcon />} label={formatLargeNumber(marketCap)} />
    </>
  )
);

type SymbolCardProps = {
  id: string;
  price: number;
  isSelected?: boolean;
  showCardInfo: boolean;
  hasSelectedCard: boolean;
};

const SymbolCard = memo(
  ({ id, price, isSelected = false, showCardInfo, hasSelectedCard }: SymbolCardProps) => {
    const dispatch = useAppDispatch();
    const [displayPrice, setDisplayPrice] = useState(price);
    const [shouldShake, setShouldShake] = useState(false);
    const [glowClass, setGlowClass] = useState('');

    const stockData = useAppSelector((state) => state.stocks.entities[id]);
    const activeSymbol = useAppSelector(selectActiveSymbol);

    useEffect(() => {
      if (price === displayPrice) return;

      const priceChange = Math.abs(price - displayPrice) / displayPrice;
      const isIncrease = price > displayPrice;

      setGlowClass(isIncrease ? 'symbolCard__glow-green' : 'symbolCard__glow-red');

      if (priceChange > 0.25) {
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 620);
      }

      setTimeout(() => setGlowClass(''), 1000);
      setDisplayPrice(price);
    }, [price, displayPrice]);

    const cardClasses = [
      'symbolCard',
      showCardInfo ? 'symbolCard--show-info' : '',
      isSelected ? 'symbolCard__selected symbolCard__shadow-black' : '',
      !isSelected && hasSelectedCard ? 'symbolCard__unselected' : '',
      shouldShake ? 'symbolCard__shake' : '',
      glowClass
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        onClick={() => dispatch(setActiveSymbol(id === activeSymbol ? null : id))}
        className={cardClasses}
      >
        <div className="symbolCard__header">
          <span className="symbolCard__symbol">{id}</span>
          {stockData.trend != null && (
            <span
              className={`symbolCard__trend symbolCard__trend--${stockData.trend.toLowerCase()}`}
            >
              <img src={stockData.trend === 'UP' ? UpIcon : DownIcon} alt={stockData.trend} />
            </span>
          )}
        </div>

        <div className="symbolCard__content">
          <div className="symbolCard__price">
            <div className="symbolCard__label">Price:</div>
            <div className="symbolCard__value">{formatCurrency(displayPrice) || '--'}</div>
          </div>

          <div className={`symbolCard__info ${!showCardInfo ? 'symbolCard__info--hidden' : ''}`}>
            {showCardInfo && (
              <CardInfo
                companyName={stockData.companyName}
                industry={stockData.industry}
                marketCap={stockData.marketCap}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default SymbolCard;
