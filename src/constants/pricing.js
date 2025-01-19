export const SHOPIFY_PLANS = {
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

export const TRANSACTION_RATES = {
  basic: 0.028,     // 2.8% + 30¢ CAD online
  shopify: 0.026,   // 2.6% + 30¢ CAD online
  advanced: 0.024   // 2.4% + 30¢ CAD online
}

export const INDUSTRY_AVERAGES = {
  // Product Information
  productCost: 20,              // Average product cost in CAD
  sellingPrice: 49.99,          // Average selling price in CAD
  monthlyOrders: 100,           // Average monthly orders
  
  // Additional Costs
  shippingCost: 8.99,           // Average shipping cost per order in CAD
  marketingBudget: 500,         // Monthly marketing budget in CAD
  appSubscriptions: {
    essential: [
      { name: "Email Marketing", cost: 29 },
      { name: "Reviews App", cost: 15 },
      { name: "Inventory Management", cost: 19 }
    ]
  },
  staffCosts: {
    partTime: 2000,             // Monthly cost for part-time help
    fullTime: 4000              // Monthly cost for full-time employee
  }
}

export const TOOLTIPS = {
  productCost: "The amount you pay to acquire or manufacture one unit of your product",
  sellingPrice: "The price you'll charge customers for one unit",
  monthlyOrders: "Estimated number of orders you expect per month",
  shippingCost: "Average cost to ship one order",
  marketingBudget: "Monthly spending on advertising and marketing",
  appSubscriptions: "Essential Shopify apps for your store operations",
  staffCosts: "Monthly costs for store management and customer service"
} 