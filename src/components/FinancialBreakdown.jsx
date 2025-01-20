import { Box, Heading } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

// Helper function to determine if a color is dark
const isColorDark = (color) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

const FinancialBreakdown = ({ revenue, costs, profit }) => {
  // Helper to handle negative profits in stacked bar
  const getCostAndProfitData = () => {
    if (profit >= 0) {
      return [
        { label: 'Costs', data: [costs], color: '#004C3F', total: revenue },
        { label: 'Profit', data: [profit], color: '#008060', total: revenue }
      ]
    } else {
      // For negative profits, extend the costs bar and overlay negative profit
      return [
        { label: 'Costs', data: [costs], color: '#004C3F', total: revenue },
        { label: 'Profit', data: [profit], color: '#E53E3E', total: revenue }
      ]
    }
  }

  const costAndProfit = getCostAndProfitData()

  const data = {
    labels: ['Monthly Summary'],
    datasets: [
      {
        label: 'Revenue',
        data: [revenue],
        backgroundColor: '#95E3C1',
        borderColor: '#95E3C1',
        borderWidth: 1,
      },
      ...costAndProfit.map(item => ({
        label: item.label,
        data: item.data,
        backgroundColor: item.color,
        borderColor: item.color,
        borderWidth: 1,
        stack: 'costs'
      }))
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString('en-CA')}`
        }
      }
    },
    plugins: {
      datalabels: {
        formatter: (value) => {
          return `$${value.toLocaleString('en-CA', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}`
        },
        color: (context) => {
          const backgroundColor = context.dataset.backgroundColor
          return isColorDark(backgroundColor) ? '#FFFFFF' : '#333333'
        },
        font: {
          weight: 'bold',
          size: 11
        },
        anchor: 'center',
        align: 'center'
      },
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          reverse: true  // Reverse legend order to match stacking order
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw
            const percentage = ((Math.abs(value) / revenue) * 100).toFixed(1)
            return `${context.dataset.label}: $${value.toLocaleString('en-CA', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} CAD (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <Box bg="white" borderRadius="xl" shadow="sm" width="100%" mx="auto">
      <Heading size="md" mb={4} textAlign="left">Financial Breakdown</Heading>
      <Box height="250px" p={4}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  )
}

export default FinancialBreakdown 