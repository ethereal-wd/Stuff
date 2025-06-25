import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionHistoryData, type Transaction } from "@/examples/transactionhisdummy";

const getPlatformBadgeColor = (platform: Transaction['platform']) => {
  switch (platform) {
    case 'Binance':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Paxful':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'KuCoin':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusBadgeColor = (status: Transaction['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Failed':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getTypeColor = (type: Transaction['type']) => {
  return type === 'Buy' ? 'text-green-600' : 'text-red-600';
};

const formatCurrency = (amount: number, currency: 'USD' | 'NGN' = 'USD') => {
  if (currency === 'NGN') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactionHistoryData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = transactionHistoryData.filter(
      (transaction) =>
        transaction.orderNumber.toLowerCase().includes(value.toLowerCase()) ||
        transaction.platform.toLowerCase().includes(value.toLowerCase()) ||
        transaction.coin.toLowerCase().includes(value.toLowerCase()) ||
        transaction.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleFilter = () => {
    // TODO: Implement filter modal
    console.log('Filter clicked');
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    console.log('Export CSV clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search trades, order numbers..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={handleFilter}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              {/* Export CSV Button */}
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Platform</TableHead>
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Coin</TableHead>
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Type</TableHead>
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Filled</TableHead>
                  <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Rate</TableHead>
                  <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Charges</TableHead>
                  <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Value (NGN)</TableHead>
                  <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Total (USD)</TableHead>
                  <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider">Order Number</TableHead>
                  <TableHead className="text-center font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="text-sm text-gray-900">{transaction.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getPlatformBadgeColor(transaction.platform)} border-0`}
                      >
                        {transaction.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900">{transaction.coin}</TableCell>
                    <TableCell>
                      <span className={`font-medium text-sm ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{transaction.filled}</TableCell>
                    <TableCell className="text-sm text-gray-900 text-right">
                      {formatCurrency(transaction.rate)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 text-right">
                      {formatCurrency(transaction.charges)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 text-right">
                      {formatCurrency(transaction.valueNGN, 'NGN')}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(transaction.totalUSD)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{transaction.orderNumber}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusBadgeColor(transaction.status)} border-0`}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
