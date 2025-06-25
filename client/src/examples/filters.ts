export const filterOptions = {
  platforms: [
    'Binance',
    'Paxful', 
    'KuCoin',
    'ByBit',
    'Noones',
    'Other'
  ],
  coins: [
    'BTC',
    'USDT', 
    'ETH'
  ],
  status: [
    'Completed',
    'Pending',
    'Failed'
  ],
  types: [
    'Buy',
    'Sell'
  ]
};

export type FilterState = {
  platforms: string[];
  coins: string[];
  status: string[];
  types: string[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
};