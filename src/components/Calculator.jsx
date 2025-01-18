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
} from '@chakra-ui/react'
import { useState } from 'react'

function Calculator() {
  const [plan, setPlan] = useState('basic')
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [isYearly, setIsYearly] = useState(false)

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

  // Calculate transaction fees based on plan
  const getTransactionFee = () => {
    const rates = {
      basic: 0.028,     // 2.8% + 30¢ CAD online
      shopify: 0.026,   // 2.6% + 30¢ CAD online
      advanced: 0.024   // 2.4% + 30¢ CAD online
    }
    return ((monthlyRevenue * rates[plan]) + (monthlyRevenue * 0.003)).toFixed(2) // Adding 30¢ per transaction
  }

  // Get current plan cost
  const getCurrentPlanCost = () => {
    return isYearly ? planCosts.yearly[plan] : planCosts.monthly[plan]
  }

  // Calculate total monthly cost
  const getTotalCost = () => {
    return (Number(getCurrentPlanCost()) + Number(getTransactionFee())).toFixed(2)
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
          maxW="container.md" 
          mx="auto" 
          w="full" 
          bg="white" 
          p={8} 
          borderRadius="xl"
          boxShadow="sm"
          borderWidth={1}
          borderColor="gray.200"
        >
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

          {/* Revenue Input */}
          <FormControl mb={8}>
            <FormLabel 
              fontWeight="medium"
              color="gray.900"
            >
              Expected Monthly Revenue (CAD)
            </FormLabel>
            <NumberInput 
              min={0} 
              value={monthlyRevenue}
              onChange={(value) => setMonthlyRevenue(Number(value))}
              size="lg"
            >
              <NumberInputField 
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
              />
            </NumberInput>
          </FormControl>

          {/* Cost Summary Box */}
          <Box 
            p={6} 
            borderWidth={1} 
            borderRadius="xl" 
            bg="#f3fcf0"
            borderColor="gray.200"
          >
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text color="gray.700">Monthly Plan Cost:</Text>
                <Text fontWeight="medium">${getCurrentPlanCost()} CAD</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.700">Transaction Fees:</Text>
                <Text fontWeight="medium">${getTransactionFee()} CAD</Text>
              </HStack>
              <Divider borderColor="gray.300" />
              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="lg" color="gray.900">
                  Total Monthly Cost:
                </Text>
                <Text fontWeight="bold" fontSize="lg" color="#008060">
                  ${getTotalCost()} CAD
                </Text>
              </HStack>
              {isYearly && (
                <Text fontSize="sm" color="#008060" textAlign="right">
                  You save ${((planCosts.monthly[plan] - planCosts.yearly[plan]) * 12).toFixed(2)} CAD annually
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
