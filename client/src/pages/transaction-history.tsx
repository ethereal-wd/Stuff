import { useState } from "react";
import { Search, Filter, Download, Calendar, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { transactionHistoryData, type Transaction } from "@/examples/transactionhisdummy";
import { filterOptions, type FilterState } from "@/examples/filters";
import { format } from "date-fns";

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
  const [filters, setFilters] = useState<FilterState>({
    platforms: [],
    coins: [],
    status: [],
    types: [],
    dateRange: { from: null, to: null }
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const applyFilters = (search: string = searchTerm, currentFilters: FilterState = filters) => {
    let filtered = transactionHistoryData;

    // Apply search
    if (search.trim()) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          transaction.platform.toLowerCase().includes(search.toLowerCase()) ||
          transaction.coin.toLowerCase().includes(search.toLowerCase()) ||
          transaction.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filters
    if (currentFilters.platforms.length > 0) {
      filtered = filtered.filter(t => currentFilters.platforms.includes(t.platform));
    }
    if (currentFilters.coins.length > 0) {
      filtered = filtered.filter(t => currentFilters.coins.includes(t.coin));
    }
    if (currentFilters.status.length > 0) {
      filtered = filtered.filter(t => currentFilters.status.includes(t.status));
    }
    if (currentFilters.types.length > 0) {
      filtered = filtered.filter(t => currentFilters.types.includes(t.type));
    }
    if (currentFilters.dateRange.from || currentFilters.dateRange.to) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const fromCheck = !currentFilters.dateRange.from || transactionDate >= currentFilters.dateRange.from;
        const toCheck = !currentFilters.dateRange.to || transactionDate <= currentFilters.dateRange.to;
        return fromCheck && toCheck;
      });
    }

    setFilteredTransactions(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, filters);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string | Date | null, action: 'add' | 'remove' | 'set' = 'add') => {
    const newFilters = { ...filters };
    
    if (filterType === 'dateRange') {
      if (typeof value === 'object' && value instanceof Date) {
        if (action === 'set') {
          newFilters.dateRange.from = value;
        } else {
          newFilters.dateRange.to = value;
        }
      }
    } else if (typeof value === 'string') {
      if (filterType === 'platforms') {
        const currentArray = newFilters.platforms;
        if (action === 'add' && !currentArray.includes(value)) {
          newFilters.platforms = [...currentArray, value];
        } else if (action === 'remove') {
          newFilters.platforms = currentArray.filter(item => item !== value);
        }
      } else if (filterType === 'coins') {
        const currentArray = newFilters.coins;
        if (action === 'add' && !currentArray.includes(value)) {
          newFilters.coins = [...currentArray, value];
        } else if (action === 'remove') {
          newFilters.coins = currentArray.filter(item => item !== value);
        }
      } else if (filterType === 'status') {
        const currentArray = newFilters.status;
        if (action === 'add' && !currentArray.includes(value)) {
          newFilters.status = [...currentArray, value];
        } else if (action === 'remove') {
          newFilters.status = currentArray.filter(item => item !== value);
        }
      } else if (filterType === 'types') {
        const currentArray = newFilters.types;
        if (action === 'add' && !currentArray.includes(value)) {
          newFilters.types = [...currentArray, value];
        } else if (action === 'remove') {
          newFilters.types = currentArray.filter(item => item !== value);
        }
      }
    }
    
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      platforms: [],
      coins: [],
      status: [],
      types: [],
      dateRange: { from: null, to: null }
    };
    setFilters(clearedFilters);
    applyFilters(searchTerm, clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.platforms.length + filters.coins.length + filters.status.length + filters.types.length + 
           (filters.dateRange.from ? 1 : 0) + (filters.dateRange.to ? 1 : 0);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Platform', 'Coin', 'Type', 'Filled', 'Rate', 'Charges', 'Value (NGN)', 'Total (USD)', 'Order Number', 'Status'],
      ...filteredTransactions.map(t => [
        t.date, t.platform, t.coin, t.type, t.filled, 
        t.rate.toString(), t.charges.toString(), t.valueNGN.toString(), 
        t.totalUSD.toString(), t.orderNumber, t.status
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Transaction History</h1>
            </div>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search Bar */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search trades, order numbers..."
                  className="pl-10 w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2 sm:space-x-4">
                {/* Filter Button */}
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 relative"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                      {getActiveFiltersCount() > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Filters</h3>
                        {getActiveFiltersCount() > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-sm text-gray-500"
                          >
                            Clear all
                          </Button>
                        )}
                      </div>
                      
                      <ScrollArea className="h-96">
                        <div className="space-y-6">
                          {/* Platforms */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-3">Platform</h4>
                            <div className="space-y-2">
                              {filterOptions.platforms.map((platform) => (
                                <div key={platform} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`platform-${platform}`}
                                    checked={filters.platforms.includes(platform)}
                                    onCheckedChange={(checked) => {
                                      handleFilterChange('platforms', platform, checked ? 'add' : 'remove');
                                    }}
                                  />
                                  <label
                                    htmlFor={`platform-${platform}`}
                                    className="text-sm text-gray-600 cursor-pointer"
                                  >
                                    {platform}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Coins */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-3">Coin</h4>
                            <div className="space-y-2">
                              {filterOptions.coins.map((coin) => (
                                <div key={coin} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`coin-${coin}`}
                                    checked={filters.coins.includes(coin)}
                                    onCheckedChange={(checked) => {
                                      handleFilterChange('coins', coin, checked ? 'add' : 'remove');
                                    }}
                                  />
                                  <label
                                    htmlFor={`coin-${coin}`}
                                    className="text-sm text-gray-600 cursor-pointer"
                                  >
                                    {coin}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Status */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-3">Status</h4>
                            <div className="space-y-2">
                              {filterOptions.status.map((status) => (
                                <div key={status} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`status-${status}`}
                                    checked={filters.status.includes(status)}
                                    onCheckedChange={(checked) => {
                                      handleFilterChange('status', status, checked ? 'add' : 'remove');
                                    }}
                                  />
                                  <label
                                    htmlFor={`status-${status}`}
                                    className="text-sm text-gray-600 cursor-pointer"
                                  >
                                    {status}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Types */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-3">Type</h4>
                            <div className="space-y-2">
                              {filterOptions.types.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`type-${type}`}
                                    checked={filters.types.includes(type)}
                                    onCheckedChange={(checked) => {
                                      handleFilterChange('types', type, checked ? 'add' : 'remove');
                                    }}
                                  />
                                  <label
                                    htmlFor={`type-${type}`}
                                    className="text-sm text-gray-600 cursor-pointer"
                                  >
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Date Range */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-3">Date Range</h4>
                            <div className="space-y-3">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {filters.dateRange.from ? (
                                      format(filters.dateRange.from, "PPP")
                                    ) : (
                                      <span className="text-gray-500">Pick a start date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={filters.dateRange.from || undefined}
                                    onSelect={(date) => handleFilterChange('dateRange', date, 'set')}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {filters.dateRange.to ? (
                                      format(filters.dateRange.to, "PPP")
                                    ) : (
                                      <span className="text-gray-500">Pick an end date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={filters.dateRange.to || undefined}
                                    onSelect={(date) => handleFilterChange('dateRange', date, 'remove')}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Export CSV Button */}
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredTransactions.length} of {transactionHistoryData.length} transactions
          </p>
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              <Badge variant="secondary" className="text-xs">
                {getActiveFiltersCount()} applied
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Date</TableHead>
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Platform</TableHead>
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Coin</TableHead>
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Type</TableHead>
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Filled</TableHead>
                    <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider text-xs">Rate</TableHead>
                    <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider text-xs">Charges</TableHead>
                    <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider text-xs">Value (NGN)</TableHead>
                    <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider text-xs">Total (USD)</TableHead>
                    <TableHead className="text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Order Number</TableHead>
                    <TableHead className="text-center font-medium text-gray-500 uppercase tracking-wider text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="text-sm text-gray-900 whitespace-nowrap">{transaction.date}</TableCell>
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
                      <TableCell className="text-sm text-gray-900 text-right whitespace-nowrap">
                        {formatCurrency(transaction.rate)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900 text-right whitespace-nowrap">
                        {formatCurrency(transaction.charges)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900 text-right whitespace-nowrap">
                        {formatCurrency(transaction.valueNGN, 'NGN')}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-gray-900 text-right whitespace-nowrap">
                        {formatCurrency(transaction.totalUSD)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 font-mono">{transaction.orderNumber}</TableCell>
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

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`${getPlatformBadgeColor(transaction.platform)} border-0`}
                      >
                        {transaction.platform}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">{transaction.coin}</span>
                      <span className={`font-medium text-sm ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusBadgeColor(transaction.status)} border-0`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                      <p className="text-gray-900 font-medium">{transaction.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Filled</p>
                      <p className="text-gray-900">{transaction.filled}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Rate</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(transaction.rate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Charges</p>
                      <p className="text-gray-900">{formatCurrency(transaction.charges)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Value (NGN)</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(transaction.valueNGN, 'NGN')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Total (USD)</p>
                      <p className="text-gray-900 font-bold">{formatCurrency(transaction.totalUSD)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Order Number</p>
                    <p className="text-gray-600 font-mono text-sm">{transaction.orderNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">
              {searchTerm || getActiveFiltersCount() > 0 
                ? 'Try adjusting your search or filters to find more transactions.'
                : 'No transaction data available.'}
            </p>
            {(searchTerm || getActiveFiltersCount() > 0) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  clearAllFilters();
                }}
                className="mt-4"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
