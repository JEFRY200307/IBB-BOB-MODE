# 🎮 BobSentinel Demo Project

**Purpose:** Demonstrate how BobSentinel prevents regressions through impact analysis and proactive testing.

---

## 📋 Overview

This demo project simulates a real-world scenario where a developer wants to modify a critical pricing function. Without BobSentinel, this change would break multiple tests and cause regressions. With BobSentinel, the developer is warned in advance and guided to a safe implementation.

---

## 🎯 The Scenario

### Business Requirement
**"Add volume-based discount tiers to our pricing system"**

Current system: Flat 10% discount on all purchases  
New requirement: Tiered discounts based on quantity

| Quantity | Discount |
|----------|----------|
| 1-9 items | 10% |
| 10-49 items | 15% |
| 50+ items | 20% |

### The Challenge

The `calculateDiscount()` function in `src/pricing.js` is used by:
- Shopping cart calculations
- Invoice generation
- Reporting dashboard
- Admin pricing panel
- 6 existing unit tests
- 2 integration tests

**Without BobSentinel:** Developer modifies the function → 8 tests break → 2 hours debugging  
**With BobSentinel:** Developer gets impact analysis → Tests generated proactively → Safe implementation

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd examples/demo-project
npm install
```

### 2. Verify Current Tests Pass

```bash
npm test
```

**Expected Output:**
```
PASS  tests/pricing.test.js
  Pricing Module
    calculateDiscount
      ✓ should calculate correct discount for single item (3ms)
      ✓ should calculate correct discount for multiple items (2ms)
      ✓ should return 0 for zero quantity (1ms)
      ✓ should throw error for negative price (2ms)
      ✓ should throw error for negative quantity (1ms)
      ✓ should round to 2 decimal places (2ms)
    calculateTotal
      ✓ should calculate total for multiple items (2ms)
      ✓ should return 0 for empty array (1ms)
      ✓ should throw error for non-array input (1ms)
      ✓ should handle items with zero quantity (1ms)
    applyPromoCode
      ✓ should apply SAVE10 promo code (1ms)
      ✓ should apply SAVE20 promo code (1ms)
      ✓ should apply SAVE30 promo code (1ms)
      ✓ should be case insensitive (1ms)
      ✓ should return original price for empty promo code (1ms)
      ✓ should throw error for invalid promo code (1ms)
      ✓ should throw error for negative price (1ms)
  Pricing Integration
    ✓ should calculate total with promo code applied to each item (2ms)
    ✓ should handle complex pricing scenario (2ms)

Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        1.234s
```

---

## 🏛️ Demo: Using BobSentinel

### Step 1: Switch to Architect Mode

1. Open VS Code in the workspace root (not in examples/demo-project)
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type: `Bob: Switch Mode`
4. Select: `🏛️ Architect`

### Step 2: Request the Change

In Bob chat, type:

```
I want to modify the calculateDiscount() function in examples/demo-project/src/pricing.js 
to add volume-based discount tiers:
- 1-9 items: 10% discount
- 10-49 items: 15% discount  
- 50+ items: 20% discount
```

### Step 3: Watch BobSentinel Work

Bob will automatically:

#### 3.1 Read Repository Context
```
📖 Reading examples/demo-project/src/pricing.js...
📖 Reading examples/demo-project/tests/pricing.test.js...
```

#### 3.2 Search for References
```
🔍 Searching for calculateDiscount() references...
Found 19 references across 2 files:
- src/pricing.js (1 definition, 1 internal call)
- tests/pricing.test.js (17 test references)
```

#### 3.3 Analyze Cyclomatic Complexity
```
📐 Current Cyclomatic Complexity Analysis:
calculateDiscount(): CC = 6 (Medium)

📐 Projected Complexity with volume tiers:
calculateDiscount(): CC = 9 (Medium) ✅ Acceptable
```

#### 3.4 Identify Affected Tests
```
⚠️ Impact Assessment:
The following tests will be affected:
1. ✓ should calculate correct discount for single item
   - Current expectation: $90 (10% off $100)
   - New expectation: $90 (still 10% for 1 item) ✅ No change needed

2. ✓ should calculate correct discount for multiple items
   - Current expectation: $135 (10% off $150)
   - New expectation: $127.50 (15% off $150 for 3 items) ❌ WILL BREAK

3. ✓ should round to 2 decimal places
   - Current expectation: $29.67
   - New expectation: $27.97 (15% off for 3 items) ❌ WILL BREAK
```

#### 3.5 Generate Updated Test Suite
```
🧪 Generating updated test suite...

Created 8 new test cases:
- test_volume_discount_tier_1 (1-9 items)
- test_volume_discount_tier_2 (10-49 items)
- test_volume_discount_tier_3 (50+ items)
- test_volume_discount_boundary_9_items
- test_volume_discount_boundary_10_items
- test_volume_discount_boundary_49_items
- test_volume_discount_boundary_50_items
- test_backward_compatibility_single_item

Updated 2 existing tests:
- should calculate correct discount for multiple items
- should round to 2 decimal places
```

#### 3.6 Provide Implementation Plan
```
📋 Implementation Plan:

Phase 1: Update calculateDiscount() function
- Add volume tier logic
- Maintain backward compatibility for single items
- Keep error handling intact

Phase 2: Update tests
- Modify 2 existing tests with new expectations
- Add 8 new tests for volume tiers
- Ensure 100% coverage of new logic

Phase 3: Validate
- Run full test suite
- Verify no regressions in calculateTotal()
- Verify no regressions in applyPromoCode()

Estimated Complexity Increase: +3 CC (6 → 9) ✅ Acceptable
Risk Level: MEDIUM (affects existing functionality)
Recommended: Implement with caution, validate thoroughly
```

### Step 4: Review the Impact Report

Bob generates a comprehensive report showing:
- ✅ All affected components
- ✅ Dependency map
- ✅ Complexity analysis
- ✅ Test impact assessment
- ✅ Implementation plan

### Step 5: Implement Safely

After reviewing the report, tell Bob:

```
Proceed with the implementation
```

Bob will:
1. Switch to Code mode
2. Implement the volume discount logic
3. Update the affected tests
4. Add new test cases
5. Run the test suite
6. Confirm all tests pass

---

## 🎭 The "Without BobSentinel" Scenario

### What Would Happen Without BobSentinel

1. **Developer modifies calculateDiscount()** (5 minutes)
   ```javascript
   // Naive implementation
   function calculateDiscount(basePrice, quantity) {
     // Added volume tiers without checking impact
     let discount = 0.10;
     if (quantity >= 10) discount = 0.15;
     if (quantity >= 50) discount = 0.20;
     // ... rest of code
   }
   ```

2. **Developer runs tests** (1 minute)
   ```
   FAIL  tests/pricing.test.js
     ✕ should calculate correct discount for multiple items
     ✕ should round to 2 decimal places
   
   2 tests failed, 17 passed
   ```

3. **Developer debugs** (30 minutes)
   - Why are these tests failing?
   - What was the expected behavior?
   - Are there other places affected?

4. **Developer fixes tests** (20 minutes)
   - Updates test expectations
   - Realizes more tests are needed
   - Adds new test cases

5. **Developer discovers integration issues** (45 minutes)
   - Shopping cart shows wrong totals
   - Invoice generation is incorrect
   - Reporting dashboard has wrong numbers

6. **Developer fixes integration issues** (30 minutes)
   - Updates dependent components
   - Adds more tests
   - Validates everything works

**Total Time: ~2 hours + stress + potential production bugs**

---

## ✅ The "With BobSentinel" Scenario

### What Happens With BobSentinel

1. **Developer requests change in Architect mode** (1 minute)

2. **BobSentinel analyzes impact** (30 seconds)
   - Identifies all affected components
   - Calculates complexity impact
   - Generates test suite proactively

3. **Developer reviews impact report** (5 minutes)
   - Understands full scope
   - Sees all affected tests
   - Reviews implementation plan

4. **BobSentinel implements safely** (2 minutes)
   - Updates function with volume tiers
   - Modifies affected tests
   - Adds new test cases
   - Validates everything passes

5. **Developer validates** (2 minutes)
   - Reviews changes
   - Confirms tests pass
   - Deploys with confidence

**Total Time: ~10 minutes + confidence + zero production bugs**

---

## 📊 Comparison

| Aspect | Without BobSentinel | With BobSentinel |
|--------|-------------------|------------------|
| **Time** | ~2 hours | ~10 minutes |
| **Tests Broken** | 2 initially, more discovered later | 0 (proactively updated) |
| **Debugging** | 30-45 minutes | 0 minutes |
| **Integration Issues** | Discovered after implementation | Identified before implementation |
| **Confidence Level** | Low (worried about bugs) | High (validated before coding) |
| **Production Bugs** | High risk | Near zero risk |
| **Developer Stress** | High | Low |

---

## 🎯 Key Takeaways

### What BobSentinel Prevented

1. ❌ **2 broken tests** → ✅ Proactively updated
2. ❌ **Integration issues** → ✅ Identified in advance
3. ❌ **2 hours of debugging** → ✅ 10 minutes of guided implementation
4. ❌ **Potential production bugs** → ✅ Validated before deployment
5. ❌ **Developer stress** → ✅ Confident development

### The "WOW" Moments

1. 🎯 **Impact Visualization**
   - See exactly what will break before changing anything
   - Understand the full scope of changes

2. 🧪 **Proactive Test Generation**
   - Tests written BEFORE implementation
   - TDD approach enforced automatically

3. ✅ **Test Execution**
   - See tests pass in real-time
   - Validate before implementing

4. 📐 **Complexity Analysis**
   - Know if you're making code worse
   - Get refactoring suggestions

5. 🏛️ **Architecture Guardian**
   - Prevents technical debt
   - Maintains code quality

---

## 🔄 Try It Yourself

### Exercise 1: Simple Change
```
Modify applyPromoCode() to add a new promo code "SAVE50" with 50% discount
```

**Expected:** Bob will identify 1 test needs updating, generate 2 new tests

### Exercise 2: Complex Refactoring
```
Refactor calculateTotal() to improve performance using reduce() instead of for loop
```

**Expected:** Bob will analyze complexity, ensure no behavior changes, validate tests

### Exercise 3: Breaking Change
```
Change calculateDiscount() to return cents instead of dollars
```

**Expected:** Bob will flag HIGH impact, show all 19 affected tests, recommend careful implementation

---

## 📚 Next Steps

After completing this demo:

1. ✅ Understand the BobSentinel workflow
2. ✅ See the value of impact analysis
3. ✅ Experience proactive test generation
4. ✅ Witness the "WOW" moment of test execution

**Continue to:**
- [Full Documentation](../../docs/BOBSENTINEL-README.md)
- [Workflow Guide](../../docs/WORKFLOW-GUIDE.md)
- [More Use Cases](../use-cases/)

---

## 🎉 Congratulations!

You've seen how BobSentinel transforms development from:
- ❌ Reactive debugging → ✅ Proactive analysis
- ❌ Breaking changes → ✅ Safe implementations
- ❌ Technical debt → ✅ Quality maintenance
- ❌ Developer stress → ✅ Developer confidence

**BobSentinel: Because prevention is better than debugging.** 🏛️