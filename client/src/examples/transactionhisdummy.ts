export interface Transaction {
  id: string;
  date: string;
  platform: 'Binance' | 'Paxful' | 'KuCoin';
  coin: string;
  type: 'Buy' | 'Sell';
  filled: string;
  rate: number;
  charges: number;
  valueNGN: number;
  totalUSD: number;
  orderNumber: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export const transactionHistoryData: Transaction[] = [
  {
    id: '1',
    date: '2025-05-12 14:30',
    platform: 'Binance',
    coin: 'BTC',
    type: 'Buy',
    filled: 'BTC/USD',
    rate: 37000.00,
    charges: 18.50,
    valueNGN: 1850000,
    totalUSD: 1868.50,
    orderNumber: 'BN2025051201',
    status: 'Completed'
  },
  {
    id: '2',
    date: '2025-05-09 9:15',
    platform: 'Paxful',
    coin: 'BTC',
    type: 'Sell',
    filled: 'BTC/USD',
    rate: 37000.00,
    charges: 7.40,
    valueNGN: 740000,
    totalUSD: 732.60,
    orderNumber: 'PX2025050801',
    status: 'Completed'
  },
  {
    id: '3',
    date: '2025-05-05 6:45',
    platform: 'Binance',
    coin: 'ETH',
    type: 'Buy',
    filled: 'ETH/USD',
    rate: 2100.00,
    charges: 31.50,
    valueNGN: 3150000,
    totalUSD: 3181.50,
    orderNumber: 'BN2025050601',
    status: 'Completed'
  },
  {
    id: '4',
    date: '2025-05-05 11:20',
    platform: 'KuCoin',
    coin: 'USDT',
    type: 'Buy',
    filled: 'USDT/USD',
    rate: 1.00,
    charges: 6.50,
    valueNGN: 500000,
    totalUSD: 506.50,
    orderNumber: 'KC2025050501',
    status: 'Pending'
  },
  {
    id: '5',
    date: '2025-05-14 13:10',
    platform: 'Paxful',
    coin: 'BTC',
    type: 'Sell',
    filled: 'BTC/USD',
    rate: 37000.00,
    charges: 11.10,
    valueNGN: 1110000,
    totalUSD: 1098.90,
    orderNumber: 'PX2025051401',
    status: 'Failed'
  },
  {
    id: '6',
    date: '2025-05-12 14:30',
    platform: 'Binance',
    coin: 'BTC',
    type: 'Buy',
    filled: 'ETH/USD',
    rate: 2100.00,
    charges: 44.10,
    valueNGN: 1850000,
    totalUSD: 4454.10,
    orderNumber: 'BP2025051001',
    status: 'Completed'
  },
  {
    id: '7',
    date: '2025-05-09 9:15',
    platform: 'Paxful',
    coin: 'BTC',
    type: 'Sell',
    filled: 'USDT/USD',
    rate: 1.00,
    charges: 13.00,
    valueNGN: 740000,
    totalUSD: 1287.00,
    orderNumber: 'KC2025050301',
    status: 'Completed'
  },
  {
    id: '8',
    date: '2025-05-05 6:45',
    platform: 'Binance',
    coin: 'ETH',
    type: 'Buy',
    filled: 'BTC/USD',
    rate: 37000.00,
    charges: 29.60,
    valueNGN: 3150000,
    totalUSD: 2989.60,
    orderNumber: 'BN2025050101',
    status: 'Completed'
  }
];
