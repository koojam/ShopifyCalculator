# Shopify Cost Calculator - Development Roadmap

## Phase 1: Basic Calculator Setup ✅
- [x] Initial project setup with Vite and React
- [x] Basic UI components with Chakra UI
- [x] Shopify plan selection
- [x] Monthly/Yearly billing toggle
- [x] Basic cost calculations

## Phase 2: Enhanced Cost Inputs (Current Phase)
- [x] Product cost per unit input
- [x] Selling price input
- [x] Estimated monthly sales input
- [x] Profit margin calculator

- [x] Additional Costs Section
  - [x] Shipping cost input
  - [x] Marketing budget input
  - [x] App subscriptions input
  - [x] Additional staff costs

- [x] Default Values
  - [x] Add "Use Industry Average" buttons
  - [x] Store default values in constants
  - [x] Add tooltips explaining each input

## Phase 3: Advanced Calculations & Visualization
- [ ] Cost Breakdown
  - [ ] Fixed costs vs. Variable costs
  - [ ] Monthly overhead calculation
  - [ ] Transaction fees calculator
  - [ ] Tax considerations

- [ ] Data Visualization
  - [ ] Install and setup Chart.js
  - [ ] Cost breakdown pie chart
  - [ ] Revenue vs. Costs bar chart
  - [ ] Profit margin visualization

## Phase 4: Scenario Management
- [ ] Scenario Creation
  - [ ] Save current inputs as scenario
  - [ ] Name and describe scenarios
  - [ ] List saved scenarios

- [ ] Scenario Comparison
  - [ ] Side-by-side comparison view
  - [ ] Comparative charts
  - [ ] Difference highlights

## Phase 5: UI/UX Improvements
- [ ] Responsive Design
  - [ ] Mobile optimization
  - [ ] Tablet layout
  - [ ] Print-friendly version

- [ ] User Experience
  - [ ] Step-by-step guide
  - [ ] Loading states
  - [ ] Error handling
  - [ ] Input validation

## Phase 6: Educational Content
- [ ] Help Content
  - [ ] Tooltips for each input
  - [ ] FAQ section
  - [ ] Calculation methodology explanation

- [ ] Resources
  - [ ] Best practices guide
  - [ ] Industry benchmarks
  - [ ] Success stories

## Phase 7: Backend Integration (Optional)
- [ ] API Setup
  - [ ] Setup Express.js server
  - [ ] Define API endpoints
  - [ ] Connect to database

- [ ] Data Management
  - [ ] Save user scenarios
  - [ ] Load saved scenarios
  - [ ] Export functionality

## Phase 8: Monetization & Analytics
- [ ] Affiliate Integration
  - [ ] Shopify affiliate links
  - [ ] App recommendations
  - [ ] Marketing tool suggestions

- [ ] Analytics
  - [ ] Usage tracking
  - [ ] Popular features tracking
  - [ ] User feedback collection

## Phase 9: Testing & Deployment
- [ ] Testing
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] Cross-browser testing
  - [ ] Mobile testing

- [ ] Deployment
  - [ ] Production build
  - [ ] Performance optimization
  - [ ] SEO optimization
  - [ ] Analytics integration

## Future Enhancements
- [ ] Multi-currency support
- [ ] Multiple product calculations
- [ ] Inventory management considerations
- [ ] Advanced tax calculations
- [ ] Integration with Shopify API
- [ ] Custom reporting
- [ ] Email report generation

## Notes
- Each phase should be completed before moving to the next
- Regular testing throughout development
- Gather user feedback after each major phase
- Update roadmap based on user feedback and priorities 

## Project Context

### Project Overview
Building a comprehensive Shopify Cost Calculator using React + Vite with Chakra UI for styling. The calculator helps potential Shopify entrepreneurs estimate their startup costs and profitability.

### Technical Stack
- Frontend: React with Vite
- UI Framework: Chakra UI
- State Management: React useState (local state)
- Styling: Chakra UI components

### Key Files
- `src/main.jsx`: Entry point, contains ChakraProvider setup
- `src/App.jsx`: Main app component
- `src/components/Calculator.jsx`: Main calculator component
- `vite.config.js`: Vite configuration

### Current Implementation
- Calculator displays in a white container with a gradient header
- Includes Shopify plan selection (Basic, Shopify, Advanced)
- Toggle between monthly and yearly billing (25% discount for yearly)
- Shows plan costs and transaction fees
- Uses Shopify's current CAD pricing (as of 2024)

### Pricing Structure (CAD)
Monthly Plans:
- Basic: $51/month
- Shopify: $132/month
- Advanced: $517/month

Yearly Plans (25% discount):
- Basic: $38/month
- Shopify: $99/month
- Advanced: $389/month

Transaction Fees:
- Basic: 2.8% + 30¢ CAD online
- Shopify: 2.6% + 30¢ CAD online
- Advanced: 2.4% + 30¢ CAD online

### Design References
- Following Shopify's design system
- Using Shopify's color scheme (#f3fcf0 for highlights, #008060 for primary actions)
- Matching Shopify's typography and spacing

### Next Steps
Currently in Phase 2: Adding enhanced cost inputs including product information and additional costs sections. 

## Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Main development branch
- Feature branches: `feature/phase-{number}-{feature-name}`
- Hotfix branches: `hotfix/{issue-description}`

### Git Workflow Per Phase
1. Before starting new phase:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/phase-{number}-{feature-name}
   ```

2. During development:
   ```bash
   # Commit frequently with meaningful messages
   git add .
   git commit -m "phase-{number}: descriptive message"
   ```

3. After completing a feature:
   ```bash
   git push origin feature/phase-{number}-{feature-name}
   # Create Pull Request on GitHub
   ```

4. After phase completion:
   - Merge feature branch into main
   - Tag version: `git tag v{phase-number}.0.0`
   - Push tags: `git push origin --tags`

### Commit Message Format
```
phase-{number}: Brief description

- Detailed bullet points of changes
- Additional context if needed
```

### Current Repository
- GitHub: https://github.com/koojam/ShopifyCalculator.git
- Main Branch: Protected, requires pull request
- Development Branch: Direct commits allowed 

## Current Status (Phase 2)
Completed:
- Set up all input fields with decimal support
- Implemented industry averages
- Added tooltips for all fields
- Basic calculations working

Next Steps:
1. Remove redundant Monthly Revenue input
2. Update transaction fee calculations to use Product Information
   (Selling Price × Monthly Orders) instead of separate revenue input
3. Ensure all calculations are properly synchronized
4. Add proper formatting for currency values in summary

Known Issues to Address:
- Redundant revenue input (needs consolidation)
- Transaction fees calculation needs to be updated
- Consider adding thousand separators for large numbers 