import { 
  Box, 
  Table, 
  Thead, 
  Tbody, 
  Tfoot,
  Tr, 
  Th, 
  Td, 
  Heading, 
  VStack,
  HStack,
  Text,
  Tooltip,
  Icon
} from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import { SEASONAL_MODIFIERS, DISCOUNT_RATES } from '../constants/seasonality'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js'
import { InfoIcon } from '@chakra-ui/icons'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
)

const AnnualProjection = ({ monthlyRevenue, monthlyCosts }) => {
  // Calculate projections for each month
  const calculateMonthlyProjection = (month) => {
    const { modifier, season } = SEASONAL_MODIFIERS[month]
    const discountRate = DISCOUNT_RATES[season]
    
    const projectedRevenue = Math.round(monthlyRevenue * modifier * (1 - discountRate))
    const projectedCosts = Math.round(monthlyCosts * modifier)
    const projectedProfit = Math.round(projectedRevenue - projectedCosts)
    
    return {
      revenue: projectedRevenue,
      costs: projectedCosts,
      profit: projectedProfit
    }
  }

  // Generate data for all months
  const monthlyData = Object.entries(SEASONAL_MODIFIERS).map(([month, data]) => {
    const projection = calculateMonthlyProjection(Number(month))
    const profitMargin = projection.revenue > 0 
      ? Math.round((projection.profit / projection.revenue) * 100) 
      : 0
    return {
      month: data.name,
      ...projection,
      profitMargin
    }
  })

  // Calculate yearly totals
  const yearlyTotals = monthlyData.reduce((acc, month) => ({
    revenue: Math.round(acc.revenue + month.revenue),
    costs: Math.round(acc.costs + month.costs),
    profit: Math.round(acc.profit + month.profit),
    profitMargin: Math.round((acc.profit + month.profit) / (acc.revenue + month.revenue) * 100)
  }), { revenue: 0, costs: 0, profit: 0, profitMargin: 0 })

  // Chart data
  const chartData = {
    labels: monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.map(data => data.revenue),
        borderColor: '#95E3C1',
        backgroundColor: '#95E3C1',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Costs',
        data: monthlyData.map(data => data.costs),
        borderColor: '#004C3F',
        backgroundColor: '#004C3F',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Profit',
        data: monthlyData.map(data => data.profit),
        borderColor: '#008060',
        backgroundColor: '#008060',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Profit Margin %',
        data: monthlyData.map(data => data.profitMargin),
        borderColor: '#FDB022',
        backgroundColor: '#FDB022',
        tension: 0.4,
        yAxisID: 'y1',
        type: 'line',
        borderDash: [5, 5]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.yAxisID === 'y1') {
              return `${context.dataset.label}: ${context.raw}%`
            }
            const value = context.raw.toLocaleString('en-CA', {
              style: 'currency',
              currency: 'CAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })
            return `${context.dataset.label}: ${value}`
          }
        }
      }
    },
    scales: {
      y: {
        position: 'left',
        ticks: {
          callback: (value) => {
            return value.toLocaleString('en-CA', {
              style: 'currency',
              currency: 'CAD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })
          }
        }
      },
      y1: {
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: (value) => `${value}%`
        },
        min: 0,
        max: 100
      }
    }
  }

  const formatCurrency = (number) => {
    return number.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <VStack spacing={8} align="stretch">
      <HStack justify="space-between" align="center">
        <Heading size="md">Annual Projection</Heading>
        <Tooltip label="Projections include seasonal adjustments and typical discount rates. High season (Nov-Dec) assumes increased sales with higher discounts, while low season (Jan-Feb) reflects typical post-holiday slowdown.">
          <Icon as={InfoIcon} color="gray.400" />
        </Tooltip>
      </HStack>
      
      {/* Line Chart */}
      <Box height="400px">
        <Line data={chartData} options={chartOptions} />
      </Box>

      {/* Seasonal Legend */}
      <Box p={4} bg="gray.50" borderRadius="md">
        <Text fontWeight="medium" mb={2}>Seasonal Adjustments:</Text>
        <VStack align="start" spacing={2}>
          <Text fontSize="sm">🔥 Peak Season (Nov-Dec): +50-100% sales, 30% avg. discount</Text>
          <Text fontSize="sm">📚 Back to School (Aug-Sep): +15% sales, 15% avg. discount</Text>
          <Text fontSize="sm">❄️ Low Season (Jan-Feb): -20% sales, 15% avg. discount</Text>
          <Text fontSize="sm">☀️ Summer Lull (Jun-Jul): -10% sales, 15% avg. discount</Text>
        </VStack>
      </Box>

      {/* Monthly Breakdown Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th isNumeric>Revenue</Th>
              <Th isNumeric>Costs</Th>
              <Th isNumeric>Profit</Th>
              <Th isNumeric>Margin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {monthlyData.map((data) => (
              <Tr key={data.month}>
                <Td>{data.month}</Td>
                <Td isNumeric>{formatCurrency(data.revenue)}</Td>
                <Td isNumeric>{formatCurrency(data.costs)}</Td>
                <Td isNumeric>{formatCurrency(data.profit)}</Td>
                <Td isNumeric>{data.profitMargin}%</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot fontWeight="bold" bg="gray.50">
            <Tr>
              <Td>Annual Total</Td>
              <Td isNumeric>{formatCurrency(yearlyTotals.revenue)}</Td>
              <Td isNumeric>{formatCurrency(yearlyTotals.costs)}</Td>
              <Td isNumeric>{formatCurrency(yearlyTotals.profit)}</Td>
              <Td isNumeric>{yearlyTotals.profitMargin}%</Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </VStack>
  )
}

export default AnnualProjection 