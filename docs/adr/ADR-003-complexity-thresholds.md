# ADR-003: Cyclomatic Complexity Thresholds

**Status:** Accepted  
**Date:** 2026-05-03  
**Decision Makers:** BobSentinel Team  
**Consulted:** Senior Engineers, Code Quality Team  
**Informed:** All Developers

---

## Context and Problem Statement

Code complexity directly impacts maintainability, testability, and bug probability. Without clear thresholds, complexity creeps into the codebase, making it harder to maintain and more prone to bugs. BobSentinel needs objective criteria to evaluate code quality and guide refactoring decisions.

### Business Context
- Complex code costs 3x more to maintain
- Bugs increase exponentially with complexity
- Onboarding new developers takes longer with complex code
- Technical debt accumulates without clear quality gates

### Technical Context
- Cyclomatic Complexity (CC) measures code paths
- Industry standards exist but vary by organization
- Automated tools can calculate CC
- Refactoring reduces complexity but takes time

---

## Decision Drivers

* Need objective code quality metrics
* Must be enforceable automatically
* Should align with industry best practices
* Must provide clear guidance for refactoring
* Should prevent complexity from increasing
* Must balance strictness with practicality

---

## Considered Options

### Option 1: Strict Thresholds (CC ≤ 5)

**Description:** Very low complexity limit, forces simple functions

**Pros:**
* ✅ Extremely maintainable code
* ✅ Very low bug probability
* ✅ Easy to test

**Cons:**
* ❌ Too restrictive for real-world code
* ❌ Forces excessive function splitting
* ❌ May reduce readability
* ❌ Difficult to achieve in practice

**Complexity:** HIGH (to maintain)  
**Cost:** HIGH (refactoring effort)  
**Risk:** MEDIUM (developer frustration)

---

### Option 2: Lenient Thresholds (CC ≤ 20)

**Description:** High complexity limit, allows complex functions

**Pros:**
* ✅ Easy to achieve
* ✅ Less refactoring needed
* ✅ Flexible for complex logic

**Cons:**
* ❌ Allows unmaintainable code
* ❌ Higher bug probability
* ❌ Difficult to test
* ❌ Technical debt accumulates

**Complexity:** LOW (to maintain)  
**Cost:** LOW (refactoring effort)  
**Risk:** HIGH (code quality degradation)

---

### Option 3: Balanced Thresholds (CC ≤ 10, Warning at 15) (Chosen)

**Description:** Moderate limits with warning levels

**Pros:**
* ✅ Aligns with industry standards
* ✅ Achievable in practice
* ✅ Prevents extreme complexity
* ✅ Provides warning before critical
* ✅ Balances quality and practicality

**Cons:**
* ❌ Some refactoring still needed
* ❌ Requires judgment calls

**Complexity:** MEDIUM  
**Cost:** MEDIUM  
**Risk:** LOW

---

## Decision Outcome

**Chosen Option:** Option 3 - Balanced Thresholds

### Rationale

We chose balanced thresholds based on:

1. **Industry Standards:** CC ≤ 10 is widely accepted (McCabe, 1976)
2. **Research:** Functions with CC > 15 have 50% higher bug rates
3. **Practicality:** Achievable without excessive refactoring
4. **Flexibility:** Warning level allows case-by-case decisions
5. **Proven:** Used successfully by major tech companies

**Key Reasons:**
1. Backed by 40+ years of software engineering research
2. Achievable by most developers
3. Significantly reduces bug probability
4. Improves code maintainability
5. Provides clear refactoring guidance

### Expected Consequences

**Positive:**
* ✅ 40-60% reduction in bugs
* ✅ Faster code reviews
* ✅ Easier onboarding
* ✅ Better test coverage
* ✅ Reduced maintenance costs

**Negative:**
* ⚠️ Some functions require refactoring
  - **Mitigation:** Bob provides refactoring suggestions
* ⚠️ Initial resistance from developers
  - **Mitigation:** Education on benefits, show data

**Neutral:**
* ℹ️ Requires complexity calculation
* ℹ️ May increase function count

---

## Complexity Thresholds

### Primary Thresholds

| Complexity (CC) | Classification | Action Required | Symbol |
|----------------|----------------|-----------------|--------|
| 1-10 | ✅ Good | None - Acceptable | 🟢 |
| 11-15 | ⚠️ Warning | Consider refactoring | 🟡 |
| 16+ | ❌ Critical | Must refactor | 🔴 |

### Detailed Guidelines

#### CC 1-5: Simple (Excellent)
**Characteristics:**
- Linear code flow
- Few or no branches
- Easy to understand
- Trivial to test

**Example:**
```javascript
function add(a, b) {
  return a + b;
}
// CC = 1
```

**Action:** None required

---

#### CC 6-10: Moderate (Good)
**Characteristics:**
- Some conditional logic
- Multiple paths
- Still maintainable
- Reasonable to test

**Example:**
```javascript
function calculateDiscount(price, quantity) {
  if (price <= 0) throw new Error('Invalid price');
  if (quantity < 0) throw new Error('Invalid quantity');
  if (quantity === 0) return 0;
  
  const discount = 0.10;
  return price * quantity * (1 - discount);
}
// CC = 6
```

**Action:** None required, but monitor

---

#### CC 11-15: Complex (Warning)
**Characteristics:**
- Multiple nested conditions
- Several branches
- Harder to understand
- Challenging to test fully

**Example:**
```javascript
function processOrder(order) {
  if (!order) throw new Error('No order');
  
  if (order.status === 'pending') {
    if (order.payment === 'paid') {
      if (order.items.length > 0) {
        // Process order
      } else {
        throw new Error('No items');
      }
    } else {
      // Request payment
    }
  } else if (order.status === 'cancelled') {
    // Handle cancellation
  } else {
    throw new Error('Invalid status');
  }
}
// CC = 12
```

**Action:** Consider refactoring
- Extract methods
- Simplify conditions
- Use strategy pattern

---

#### CC 16+: Very Complex (Critical)
**Characteristics:**
- Deeply nested logic
- Many branches
- Difficult to understand
- Nearly impossible to test fully
- High bug probability

**Example:**
```javascript
function complexFunction(data) {
  // 20+ lines of nested if/else/switch
  // Multiple loops
  // Exception handling
  // Business logic mixed with validation
}
// CC = 22
```

**Action:** Must refactor before proceeding
- Break into smaller functions
- Use design patterns
- Separate concerns
- Simplify logic

---

## Refactoring Strategies

### Strategy 1: Extract Method
**When:** Function does multiple things

**Before (CC = 15):**
```javascript
function processPayment(order) {
  // Validation (CC +5)
  // Payment processing (CC +4)
  // Notification (CC +3)
  // Logging (CC +3)
}
```

**After (CC = 4 each):**
```javascript
function processPayment(order) {
  validateOrder(order);      // CC = 4
  executePayment(order);     // CC = 4
  sendNotification(order);   // CC = 3
  logTransaction(order);     // CC = 3
}
```

---

### Strategy 2: Replace Nested Conditionals with Guard Clauses
**When:** Deep nesting

**Before (CC = 12):**
```javascript
function calculate(data) {
  if (data) {
    if (data.valid) {
      if (data.amount > 0) {
        // Process
      }
    }
  }
}
```

**After (CC = 6):**
```javascript
function calculate(data) {
  if (!data) return null;
  if (!data.valid) return null;
  if (data.amount <= 0) return null;
  
  // Process
}
```

---

### Strategy 3: Strategy Pattern
**When:** Multiple conditional branches

**Before (CC = 15):**
```javascript
function calculateShipping(type, weight) {
  if (type === 'standard') {
    // Standard logic
  } else if (type === 'express') {
    // Express logic
  } else if (type === 'overnight') {
    // Overnight logic
  }
  // More conditions...
}
```

**After (CC = 3):**
```javascript
const strategies = {
  standard: (weight) => { /* logic */ },
  express: (weight) => { /* logic */ },
  overnight: (weight) => { /* logic */ }
};

function calculateShipping(type, weight) {
  const strategy = strategies[type];
  if (!strategy) throw new Error('Invalid type');
  return strategy(weight);
}
```

---

## Implementation in BobSentinel

### Analysis Phase
1. Calculate current CC for affected functions
2. Project CC after proposed changes
3. Compare against thresholds
4. Flag violations

### Reporting
```markdown
📐 Cyclomatic Complexity Analysis:

Current:
- functionA(): CC = 8 (🟢 Good)
- functionB(): CC = 12 (🟡 Warning)
- functionC(): CC = 18 (🔴 Critical)

Projected After Change:
- functionA(): CC = 10 (🟢 Good) ✅ Acceptable
- functionB(): CC = 15 (🟡 Warning) ⚠️ Consider refactoring
- functionC(): CC = 22 (🔴 Critical) ❌ Must refactor
```

### Recommendations
Bob provides specific refactoring suggestions:
- Which methods to extract
- How to simplify conditions
- Design patterns to apply
- Expected CC after refactoring

---

## Validation and Metrics

### Success Criteria
* ✅ 90% of functions have CC ≤ 10
* ✅ 0% of functions have CC > 15
* ✅ Average CC across codebase < 7
* ✅ No new functions with CC > 10

### Key Performance Indicators (KPIs)
| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Average CC | 12 | < 7 | Static analysis |
| Functions CC > 15 | 15% | 0% | Code review |
| Bug rate | 10/month | < 4/month | Issue tracking |
| Refactoring time | N/A | < 30 min/function | Time tracking |

---

## Risks and Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|-------------------|
| Developer resistance | MEDIUM | MEDIUM | Education, show benefits, gradual adoption |
| Over-refactoring | LOW | LOW | Use judgment, allow exceptions with justification |
| False positives | LOW | LOW | Manual review option, context-aware analysis |
| Performance impact | LOW | LOW | Complexity analysis is fast, cache results |

---

## Dependencies

### Technical Dependencies
* Static analysis capability
* Code parsing for CC calculation
* Integration with Architect mode

### Team Dependencies
* Developer training on complexity
* Code review process updates
* Refactoring time allocation

---

## Related Decisions

### Related To
* ADR-001: Architect Mode Design
* ADR-002: Test Strategy

### Influences
* Code review standards
* Definition of "done"
* Technical debt management

---

## References

### Research
* McCabe, T. (1976). "A Complexity Measure"
* [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
* [Code Complete](https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670) - Steve McConnell

### Tools
* ESLint (JavaScript)
* Radon (Python)
* SonarQube (Multi-language)
* CodeClimate

---

## Changelog

| Date | Author | Change Description |
|------|--------|-------------------|
| 2026-05-03 | BobSentinel Team | Initial draft |
| 2026-05-03 | BobSentinel Team | Added refactoring strategies |
| 2026-05-03 | BobSentinel Team | Status changed to Accepted |

---

## Appendix

### Complexity Calculation

**Cyclomatic Complexity Formula:**
```
CC = E - N + 2P

Where:
E = Number of edges in control flow graph
N = Number of nodes
P = Number of connected components (usually 1)
```

**Simplified:**
```
CC = 1 + (number of decision points)

Decision points:
- if, else if
- case in switch
- for, while, do-while
- &&, ||
- ? : (ternary)
- catch
```

### Example Calculation

```javascript
function example(x, y) {        // CC = 1 (base)
  if (x > 0) {                  // +1 = 2
    if (y > 0) {                // +1 = 3
      return x + y;
    } else {                    // +1 = 4
      return x;
    }
  }
  return 0;
}
// Total CC = 4