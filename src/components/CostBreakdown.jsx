import { Box, Heading } from '@chakra-ui/react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

// Add a helper function for formatting currency
const formatCurrency = (value) => {
  return value.toLocaleString('en-CA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Helper function to determine if a color is dark
const isColorDark = (color) => {
  // Convert hex to RGB
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculate brightness (perceived brightness formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

const CostBreakdown = ({ 
  fixedCosts: { shopifyPlan, marketingBudget, appCosts, staffCosts },
  variableCosts: { productCosts, shippingCosts, transactionFees },
  maxWidth = "100%"
}) => {
  // Calculate totals
  const totalFixedCosts = shopifyPlan + marketingBudget + appCosts + staffCosts
  const totalVariableCosts = productCosts + shippingCosts + transactionFees
  const totalCosts = totalFixedCosts + totalVariableCosts

  // Create data for each chart
  const fixedCostsData = {
    labels: ['Shopify Plan', 'Marketing', 'Apps', 'Staff'],
    datasets: [{
      data: [shopifyPlan, marketingBudget, appCosts, staffCosts],
      backgroundColor: ['#008060', '#004C3F', '#002E25', '#C1F0D0']
    }]
  }

  const variableCostsData = {
    labels: ['Product Costs', 'Shipping', 'Transaction Fees'],
    datasets: [{
      data: [productCosts, shippingCosts, transactionFees],
      backgroundColor: ['#95E3C1', '#6DD3CE', '#41B693']
    }]
  }

  const totalCostsData = {
    labels: ['Fixed Costs', 'Variable Costs'],
    datasets: [{
      data: [totalFixedCosts, totalVariableCosts],
      backgroundColor: ['#008060', '#95E3C1']
    }]
  }

  const getOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 20,
        left: 10,
        right: 10
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 4,
          font: { size: 11 },
          boxWidth: 10,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
            return `$${formatCurrency(value)} CAD (${percentage}%)`
          }
        }
      },
      datalabels: {
        formatter: (value) => {
          return `$${formatCurrency(value)}`
        },
        color: (context) => {
          const backgroundColor = context.dataset.backgroundColor[context.dataIndex]
          return isColorDark(backgroundColor) ? '#FFFFFF' : '#333333'
        },
        font: {
          weight: 'bold',
          size: 11
        }
      }
    }
  })

  return (
    <Box bg="white" borderRadius="xl" shadow="sm" maxWidth={maxWidth} mx="auto">
      <Heading size="md" mb={4} textAlign="left">Cost Breakdown</Heading>
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(3, 1fr)" 
        gap={6}
        minHeight="350px"  // Adjusted to accommodate title and chart
        px={4}
        mb={4}
      >
        <Box display="flex" flexDirection="column">
          <Heading 
            size="sm" 
            textAlign="center" 
            mb={4}
            color="gray.700"
          >
            Fixed Costs
          </Heading>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            maxWidth="300px"
            mx="auto"
          >
            <Pie data={fixedCostsData} options={getOptions()} />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <Heading 
            size="sm" 
            textAlign="center" 
            mb={4}
            color="gray.700"
          >
            Variable Costs
          </Heading>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            maxWidth="300px"
            mx="auto"
          >
            <Pie data={variableCostsData} options={getOptions()} />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <Heading 
            size="sm" 
            textAlign="center" 
            mb={4}
            color="gray.700"
          >
            Total Costs
          </Heading>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            maxWidth="300px"
            mx="auto"
          >
            <Pie data={totalCostsData} options={getOptions()} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CostBreakdown 