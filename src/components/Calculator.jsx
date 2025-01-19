import {
  Box,
  VStack,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  Text,
  Container,
  Divider,
  Switch,
  HStack,
  Button,
  Tooltip,
  Icon,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { SHOPIFY_PLANS, TRANSACTION_RATES, INDUSTRY_AVERAGES, TOOLTIPS } from '../constants/pricing'

const DecimalInput = ({ value, onChange, placeholder, min = 0 }) => {
  // Add local state to handle the input value
  const [localValue, setLocalValue] = useState(value.toString())

  const handleChange = (e) => {
    const input = e.target.value
    
    // Allow any input that matches our pattern (numbers and one decimal point)
    if (input === '' || /^\d*\.?\d*$/.test(input)) {
      setLocalValue(input)
      
      // Only convert to number if it's a valid number
      const number = parseFloat(input)
      if (!isNaN(number)) {
        onChange(number)
      } else if (input === '') {
        onChange(0)
      }
    }
  }

  // Update local value when prop value changes (e.g., from industry averages)
  useEffect(() => {
    setLocalValue(value === 0 ? '' : value.toString())
  }, [value])

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #E2E8F0',
        fontSize: '16px'
      }}
    />
  )
}

function Calculator() {
  const [plan, setPlan] = useState('basic')
  const [isYearly, setIsYearly] = useState(false)

  // New state for product information
  const [productCost, setProductCost] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [monthlyOrders, setMonthlyOrders] = useState(0)

  // New state for additional costs
  const [shippingCost, setShippingCost] = useState(0)
  const [marketingBudget, setMarketingBudget] = useState(0)
  const [appCosts, setAppCosts] = useState(0)
  const [staffCosts, setStaffCosts] = useState(0)

  const handleNumberInput = (setter) => (valueString, valueNumber) => {
    if (valueString === '') {
      setter(0)
      return
    }
    // If it's a valid number (including decimals), update the state
    if (!isNaN(valueString)) {
      setter(Number(valueString))
    }
  }

  const useIndustryAverages = () => {
    setProductCost(INDUSTRY_AVERAGES.productCost)
    setSellingPrice(INDUSTRY_AVERAGES.sellingPrice)
    setMonthlyOrders(INDUSTRY_AVERAGES.monthlyOrders)
    setShippingCost(INDUSTRY_AVERAGES.shippingCost)
    setMarketingBudget(INDUSTRY_AVERAGES.marketingBudget)
    // Calculate total app costs
    const totalAppCosts = INDUSTRY_AVERAGES.appSubscriptions.essential.reduce(
      (total, app) => total + app.cost, 0
    )
    setAppCosts(totalAppCosts)
    setStaffCosts(INDUSTRY_AVERAGES.staffCosts.partTime)
  }

  // Shopify plan costs (CAD)
  const planCosts = {
    monthly: {
      basic: 51,
      shopify: 132,
      advanced: 517
    },
    yearly: {
      basic: 38,
      shopify: 99,
      advanced: 389
    }
  }

  const planDescriptions = {
    basic: "For solo entrepreneurs",
    shopify: "For small teams",
    advanced: "As your business scales"
  }

  // Add a function to calculate monthly revenue
  const calculateMonthlyRevenue = () => {
    return sellingPrice * monthlyOrders
  }

  // Update transaction fee calculation to use calculated revenue
  const getTransactionFee = () => {
    const rates = {
      basic: 0.028,     // 2.8% + 30¢ CAD online
      shopify: 0.026,   // 2.6% + 30¢ CAD online
      advanced: 0.024   // 2.4% + 30¢ CAD online
    }
    const revenue = calculateMonthlyRevenue()
    // Calculate percentage fee
    const percentageFee = revenue * rates[plan]
    // Add 30¢ per transaction (monthlyOrders * 0.30)
    const transactionFee = monthlyOrders * 0.30
    return (percentageFee + transactionFee).toFixed(2)
  }

  // Get current plan cost
  const getCurrentPlanCost = () => {
    return isYearly ? planCosts.yearly[plan] : planCosts.monthly[plan]
  }

  // Calculate total monthly cost
  const getTotalCost = () => {
    return (Number(getCurrentPlanCost()) + Number(getTransactionFee())).toFixed(2)
  }

  // Add this new function to calculate profit margin
  const calculateProfitMargin = () => {
    const revenue = sellingPrice * monthlyOrders
    const totalCosts = (
      productCost * monthlyOrders +
      shippingCost * monthlyOrders +
      marketingBudget +
      appCosts +
      staffCosts +
      Number(getCurrentPlanCost()) +
      Number(getTransactionFee())
    )
    return revenue > 0 ? ((revenue - totalCosts) / revenue * 100).toFixed(2) : 0
  }

  // Update calculateTotalRevenue to use the new function
  const calculateTotalRevenue = () => {
    return calculateMonthlyRevenue().toFixed(2)
  }

  const calculateProductCosts = () => {
    return (productCost * monthlyOrders).toFixed(2)
  }

  const calculateShippingCosts = () => {
    return (shippingCost * monthlyOrders).toFixed(2)
  }

  const calculateFixedCosts = () => {
    return (
      Number(marketingBudget) +
      Number(appCosts) +
      Number(staffCosts) +
      Number(getCurrentPlanCost())
    ).toFixed(2)
  }

  const calculateTotalCosts = () => {
    return (
      Number(calculateProductCosts()) +
      Number(calculateShippingCosts()) +
      Number(calculateFixedCosts()) +
      Number(getTransactionFee())
    ).toFixed(2)
  }

  const calculateNetProfit = () => {
    return (Number(calculateTotalRevenue()) - Number(calculateTotalCosts())).toFixed(2)
  }

  // Add this helper function near the top of the Calculator component
  const formatCurrency = (number) => {
    return Number(number).toLocaleString('en-CA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <Box>
      {/* Gradient Header Section */}
      <Box
        bgGradient="linear(to-b, #f3fcf0, #f3fcf0, white)"
        w="100%"
        py={16}
        mb={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={4} align="center">
            <Heading 
              as="h1" 
              size="xl" 
              textAlign="center"
              fontWeight="semibold"
              color="gray.900"
              fontFamily="Inter, -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif"
            >
              Shopify Cost Calculator
            </Heading>
          </VStack>
        </Container>
      </Box>

      {/* Calculator Section */}
      <Container maxW="container.xl" pb={16}>
        <Box 
          maxW="container.lg" 
          mx="auto" 
          w="full" 
          bg="white" 
          p={8} 
          borderRadius="xl"
          boxShadow="sm"
          borderWidth={1}
          borderColor="gray.200"
        >
          {/* Industry Averages Button */}
          <Button
            colorScheme="green"
            variant="outline"
            mb={8}
            onClick={useIndustryAverages}
            leftIcon={<InfoIcon />}
          >
            Use Industry Averages
          </Button>

          <Grid templateColumns="repeat(2, 1fr)" gap={8}>
            {/* Left Column - Product Information */}
            <GridItem>
              <VStack align="stretch" spacing={6}>
                <Heading size="md" mb={4}>Product Information</Heading>
                
                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Product Cost (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.productCost}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={productCost}
                    onChange={setProductCost}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Selling Price (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.sellingPrice}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={sellingPrice}
                    onChange={setSellingPrice}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Expected Monthly Orders</FormLabel>
                    <Tooltip label={TOOLTIPS.monthlyOrders}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={monthlyOrders}
                    onChange={setMonthlyOrders}
                    placeholder="0.00"
                  />
                </FormControl>

                {/* Profit Margin Display */}
                <Box p={4} bg="gray.50" borderRadius="md">
                  <HStack justify="space-between">
                    <Text fontWeight="medium">Estimated Profit Margin:</Text>
                    <Text fontWeight="bold" color={calculateProfitMargin() > 0 ? "green.500" : "red.500"}>
                      {calculateProfitMargin()}%
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </GridItem>

            {/* Right Column - Additional Costs */}
            <GridItem>
              <VStack align="stretch" spacing={6}>
                <Heading size="md" mb={4}>Additional Costs</Heading>
                
                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Shipping Cost per Order (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.shippingCost}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={shippingCost}
                    onChange={setShippingCost}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Monthly Marketing Budget (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.marketingBudget}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={marketingBudget}
                    onChange={setMarketingBudget}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Monthly App Subscriptions (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.appSubscriptions}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={appCosts}
                    onChange={setAppCosts}
                    placeholder="0.00"
                  />
                </FormControl>

                <FormControl>
                  <HStack justify="space-between">
                    <FormLabel mb={0}>Monthly Staff Costs (CAD)</FormLabel>
                    <Tooltip label={TOOLTIPS.staffCosts}>
                      <InfoIcon color="gray.400" />
                    </Tooltip>
                  </HStack>
                  <DecimalInput
                    value={staffCosts}
                    onChange={setStaffCosts}
                    placeholder="0.00"
                  />
                </FormControl>
              </VStack>
            </GridItem>
          </Grid>

          <Divider my={8} />

          {/* Billing Period Switch */}
          <HStack 
            justify="space-between" 
            mb={6} 
            bg="#f3fcf0" 
            p={3} 
            borderRadius="md"
          >
            <FormLabel mb="0" fontWeight="medium">Billing Period</FormLabel>
            <HStack spacing={4}>
              <Text color={!isYearly ? "black" : "gray.600"}>Monthly</Text>
              <Switch 
                isChecked={isYearly} 
                onChange={(e) => setIsYearly(e.target.checked)}
                colorScheme="green"
                size="lg"
              />
              <Text color={isYearly ? "black" : "gray.600"}>
                Yearly (Save 25%)
              </Text>
            </HStack>
          </HStack>

          {/* Plan Selection */}
          <FormControl mb={6}>
            <FormLabel 
              fontWeight="medium"
              color="gray.900"
            >
              Select Shopify Plan
            </FormLabel>
            <Select 
              value={plan} 
              onChange={(e) => setPlan(e.target.value)}
              size="lg"
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              fontWeight="medium"
            >
              <option value="basic">
                Basic {plan === 'basic' && '(Most Popular)'} - For solo entrepreneurs - ${planCosts[isYearly ? 'yearly' : 'monthly'].basic}/month
              </option>
              <option value="shopify">
                Shopify - For small teams - ${planCosts[isYearly ? 'yearly' : 'monthly'].shopify}/month
              </option>
              <option value="advanced">
                Advanced - As your business scales - ${planCosts[isYearly ? 'yearly' : 'monthly'].advanced}/month
              </option>
            </Select>
          </FormControl>

          {/* Updated Cost Summary Box */}
          <Box 
            p={6} 
            borderWidth={1} 
            borderRadius="xl" 
            bg="#f3fcf0"
            borderColor="gray.200"
          >
            <VStack spacing={6} align="stretch">
              {/* Revenue Section */}
              <Box>
                <Text fontWeight="semibold" mb={2}>Revenue</Text>
                <HStack justify="space-between">
                  <Text color="gray.700">Monthly Revenue:</Text>
                  <Text fontWeight="medium">${formatCurrency(calculateTotalRevenue())} CAD</Text>
                </HStack>
              </Box>

              <Divider borderColor="gray.300" />

              {/* Variable Costs Section */}
              <Box>
                <Text fontWeight="semibold" mb={2}>Variable Costs</Text>
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.700">Product Costs:</Text>
                    <Text fontWeight="medium">${formatCurrency(calculateProductCosts())} CAD</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.700">Shipping Costs:</Text>
                    <Text fontWeight="medium">${formatCurrency(calculateShippingCosts())} CAD</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.700">Transaction Fees:</Text>
                    <Text fontWeight="medium">${formatCurrency(getTransactionFee())} CAD</Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Fixed Costs Section */}
              <Box>
                <Text fontWeight="semibold" mb={2}>Fixed Costs</Text>
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.700">Shopify Plan:</Text>
                    <Text fontWeight="medium">${formatCurrency(getCurrentPlanCost())} CAD</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.700">Marketing Budget:</Text>
                    <Text fontWeight="medium">${formatCurrency(marketingBudget)} CAD</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.700">App Subscriptions:</Text>
                    <Text fontWeight="medium">${formatCurrency(appCosts)} CAD</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.700">Staff Costs:</Text>
                    <Text fontWeight="medium">${formatCurrency(staffCosts)} CAD</Text>
                  </HStack>
                </VStack>
              </Box>

              <Divider borderColor="gray.300" />

              {/* Summary Section */}
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg" color="gray.900">
                    Total Monthly Costs:
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" color="#008060">
                    ${formatCurrency(calculateTotalCosts())} CAD
                  </Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg" color="gray.900">
                    Net Monthly Profit:
                  </Text>
                  <Text 
                    fontWeight="bold" 
                    fontSize="lg" 
                    color={calculateNetProfit() > 0 ? "#008060" : "red.500"}
                  >
                    ${formatCurrency(calculateNetProfit())} CAD
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg" color="gray.900">
                    Profit Margin:
                  </Text>
                  <Text 
                    fontWeight="bold" 
                    fontSize="lg" 
                    color={calculateProfitMargin() > 0 ? "#008060" : "red.500"}
                  >
                    {calculateProfitMargin()}%
                  </Text>
                </HStack>
              </VStack>

              {isYearly && (
                <Text fontSize="sm" color="#008060" textAlign="right">
                  You save ${formatCurrency((planCosts.monthly[plan] - planCosts.yearly[plan]) * 12)} CAD annually on your Shopify plan
                </Text>
              )}
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Calculator
