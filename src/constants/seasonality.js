export const SEASONAL_MODIFIERS = {
  1: { name: 'January', modifier: 0.8, season: 'low' },    // -20%
  2: { name: 'February', modifier: 0.8, season: 'low' },   // -20%
  3: { name: 'March', modifier: 1.0, season: 'normal' },
  4: { name: 'April', modifier: 1.0, season: 'normal' },
  5: { name: 'May', modifier: 1.0, season: 'normal' },
  6: { name: 'June', modifier: 0.9, season: 'low' },      // -10%
  7: { name: 'July', modifier: 0.9, season: 'low' },      // -10%
  8: { name: 'August', modifier: 1.15, season: 'high' },   // +15%
  9: { name: 'September', modifier: 1.15, season: 'high' }, // +15%
  10: { name: 'October', modifier: 1.0, season: 'normal' },
  11: { name: 'November', modifier: 1.5, season: 'high' },  // +50%
  12: { name: 'December', modifier: 2.0, season: 'high' }   // +100%
}

export const DISCOUNT_RATES = {
  high: 0.3,   // 30% discount in high season
  normal: 0.1, // 10% discount in normal season
  low: 0.15    // 15% discount in low season
} 