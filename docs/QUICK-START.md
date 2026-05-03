# 🚀 BobSentinel Quick Start Guide

**Time to Complete:** 5 minutes  
**Difficulty:** Beginner

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ IBM Bob extension installed in VS Code
- ✅ A Git repository initialized in your workspace
- ✅ A test framework configured (npm, pytest, maven, etc.)
- ✅ Basic familiarity with your project structure

---

## 🎯 Step 1: Verify Installation (30 seconds)

### Check if BobSentinel is Installed

1. Open your workspace in VS Code
2. Check if `.bob/custom_modes.yaml` exists:

```bash
# Windows PowerShell
Test-Path .bob/custom_modes.yaml

# Expected output: True
```

3. If the file doesn't exist, BobSentinel is not installed in this workspace

### What You Should See

```
IBMBOB/
├── .bob/
│   ├── custom_modes.yaml          ✅ This file should exist
│   └── templates/
├── docs/
└── examples/
```

---

## 🔄 Step 2: Switch to Architect Mode (30 seconds)

### Method 1: Using Command Palette (Recommended)

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: `Bob: Switch Mode`
3. Select: `🏛️ Architect`

### Method 2: Using Bob Chat

1. Open Bob chat panel
2. Click the mode selector dropdown
3. Choose `🏛️ Architect`

### Verify Mode Switch

You should see:
```
Current Mode: 🏛️ Architect
Description: Architecture guardian and impact analyzer
```

---

## 🧪 Step 3: Run Your First Analysis (2 minutes)

### Example 1: Simple Function Modification

**Type this in Bob chat:**
```
I want to modify the calculateTotal() function to add a 10% tax
```

**What Bob Will Do:**

1. **Read Context** (5-10 seconds)
   ```
   📖 Reading repository structure...
   🔍 Searching for calculateTotal() references...
   ```

2. **Analyze Impact** (10-15 seconds)
   ```
   📊 Found 8 references across 5 files
   📐 Current Cyclomatic Complexity: 6
   📐 Projected Complexity: 8 (✅ Acceptable)
   ```

3. **Generate Tests** (10-15 seconds)
   ```
   🧪 Generated 5 test cases:
   - test_calculate_total_with_tax
   - test_calculate_total_without_tax
   - test_calculate_total_edge_cases
   ```

4. **Execute Tests** (5-10 seconds)
   ```
   ✅ Running: npm test
   ✅ All 5 tests passed
   ```

5. **Provide Plan** (5 seconds)
   ```
   📋 Implementation plan ready
   Ready to switch to Code mode?
   ```

### Example 2: Check Existing Code

**Type this in Bob chat:**
```
Analyze the impact of modifying the User authentication module
```

**Bob Will:**
- Map all dependencies
- Identify affected components
- Check ADR alignment
- Assess complexity
- Generate impact report

---

## 📊 Step 4: Review the Impact Report (1 minute)

### What to Look For

Bob will generate a comprehensive report with:

#### 1. **ADR Alignment** ✅
```
📖 Consulted ADR-002: Authentication Strategy
✅ Change aligns with approved approach
```

#### 2. **Affected Components** 🎯
```
🔴 HIGH Impact:
- AuthService.js (direct modification)
- LoginController.js (depends on AuthService)

🟡 MEDIUM Impact:
- UserProfile.js (uses auth tokens)
- SessionManager.js (validates sessions)

🟢 LOW Impact:
- Dashboard.js (displays user info)
```

#### 3. **Complexity Analysis** 📐
```
Current CC: 12
Projected CC: 14
Status: ⚠️ Warning - Consider refactoring
```

#### 4. **Test Results** ✅
```
$ npm test
✓ 23 tests passed
✓ Coverage: 87%
✓ No regressions detected
```

---

## 💻 Step 5: Implement Changes (1 minute)

### When Bob Says "Ready to Switch to Code Mode"

**Option 1: Let Bob Switch Automatically**
```
Yes, switch to Code mode and implement the changes
```

**Option 2: Review First**
```
Show me the detailed implementation plan first
```

**Option 3: Make Adjustments**
```
The complexity is too high. Can you suggest a refactoring approach?
```

### After Switching to Code Mode

Bob will:
1. Implement the changes
2. Create/update test files
3. Run tests to validate
4. Confirm success

---

## 🎓 Common Use Cases

### Use Case 1: Before Refactoring

**Scenario:** You want to refactor a complex function

**Command:**
```
Analyze the complexity of processPayment() and suggest refactoring
```

**Expected Output:**
- Current complexity metrics
- Refactoring recommendations
- Test suite for validation
- Step-by-step refactoring plan

---

### Use Case 2: Adding New Feature

**Scenario:** You want to add a new feature

**Command:**
```
I want to add email notification support to the order processing system
```

**Expected Output:**
- Impact on existing components
- Required new components
- Integration points
- Test suite for new feature
- Implementation plan

---

### Use Case 3: Bug Fix

**Scenario:** You need to fix a bug

**Command:**
```
Fix the bug where users can't login with special characters in password
```

**Expected Output:**
- Root cause analysis
- Affected components
- Regression test to prevent recurrence
- Fix implementation plan

---

## 🎯 Best Practices for Quick Success

### DO ✅

1. **Start with Architect Mode for any significant change**
   ```
   ✅ Analyze first, code later
   ```

2. **Trust the complexity warnings**
   ```
   ✅ If CC > 15, refactor before proceeding
   ```

3. **Review the impact report thoroughly**
   ```
   ✅ Check all affected components
   ✅ Verify test coverage
   ✅ Validate ADR alignment
   ```

4. **Let Bob execute tests**
   ```
   ✅ See the "green tests" moment
   ✅ Validate before implementation
   ```

### DON'T ❌

1. **Don't skip the analysis phase**
   ```
   ❌ Jumping to Code mode without analysis
   ```

2. **Don't ignore complexity warnings**
   ```
   ❌ Proceeding with CC > 15 without refactoring
   ```

3. **Don't skip test execution**
   ```
   ❌ Implementing without validating tests pass
   ```

4. **Don't ignore ADR conflicts**
   ```
   ❌ Proceeding when ADR alignment fails
   ```

---

## 🔧 Troubleshooting Quick Fixes

### Problem: "Mode not found"

**Solution:**
```bash
# Verify the file exists
ls .bob/custom_modes.yaml

# If missing, the mode wasn't installed correctly
# Check the main README for installation instructions
```

---

### Problem: "Tests not executing"

**Solution:**
```bash
# Verify your test command works manually
npm test  # or pytest, mvn test, etc.

# Check that 'command' group is enabled in custom_modes.yaml
```

---

### Problem: "No ADRs found"

**Solution:**
```bash
# Create the ADR directory
mkdir -p docs/adr

# Copy the ADR template
cp .bob/templates/adr-template.md docs/adr/ADR-001-example.md
```

---

### Problem: "Complexity analysis not showing"

**Solution:**
- Ensure the code has sufficient complexity (CC > 1)
- Verify Bob has read access to the files
- Check that the function/method is not trivial

---

## 📚 Next Steps

### After This Quick Start

1. **Try the Demo Project** 🎮
   ```
   cd examples/demo-project
   # Follow the README for a complete regression scenario
   ```

2. **Read the Full Documentation** 📖
   ```
   docs/BOBSENTINEL-README.md
   ```

3. **Explore Workflow Guide** 🔄
   ```
   docs/WORKFLOW-GUIDE.md
   ```

4. **Study Integration Patterns** 🔗
   ```
   docs/INTEGRATION-PATTERNS.md
   ```

### Create Your First ADR

```bash
# Copy the template
cp .bob/templates/adr-template.md docs/adr/ADR-001-my-decision.md

# Edit with your architectural decision
code docs/adr/ADR-001-my-decision.md
```

---

## 🎉 Success Indicators

You're successfully using BobSentinel when:

- ✅ You start every significant change in Architect mode
- ✅ You review impact reports before coding
- ✅ You see tests execute and pass before implementation
- ✅ Your code complexity stays below thresholds
- ✅ You have fewer regressions and bugs
- ✅ Your team references ADRs regularly

---

## 💡 Pro Tips

### Tip 1: Use Descriptive Requests
```
❌ "Change the function"
✅ "Modify calculateDiscount() to add volume pricing tiers"
```

### Tip 2: Ask for Specific Analysis
```
✅ "What's the complexity of this module?"
✅ "Show me all dependencies of UserService"
✅ "Which tests will break if I modify this?"
```

### Tip 3: Iterate on the Plan
```
✅ "The complexity is too high, suggest a better approach"
✅ "Can we split this into smaller changes?"
✅ "What if we refactor this first?"
```

### Tip 4: Use for Code Reviews
```
✅ "Analyze the impact of this pull request"
✅ "Check if this change aligns with our ADRs"
✅ "Verify test coverage for these changes"
```

---

## 📞 Getting Help

### If You're Stuck

1. **Check the main README**
   - `docs/BOBSENTINEL-README.md`

2. **Review the examples**
   - `examples/demo-project/`
   - `examples/use-cases/`

3. **Consult the templates**
   - `.bob/templates/impact-analysis.md`
   - `.bob/templates/test-suite.md`

4. **Ask Bob directly**
   ```
   "How do I use Architect mode to analyze a refactoring?"
   "Show me an example of an impact analysis report"
   ```

---

## ⏱️ Time Investment vs. Return

### Initial Investment
- **Setup:** 5 minutes (this guide)
- **First analysis:** 2 minutes
- **Learning curve:** 1-2 hours

### Return on Investment
- **Regression prevention:** Save 2-4 hours per bug
- **Faster development:** 40% speed increase
- **Better code quality:** Maintain CC < 10
- **Team confidence:** Priceless

---

## 🎯 Your First Day Goals

By the end of your first day with BobSentinel:

- [ ] Complete this quick start guide
- [ ] Run 3 impact analyses
- [ ] Generate and execute 1 test suite
- [ ] Create 1 ADR for your project
- [ ] Successfully implement 1 change using the workflow

---

**Congratulations! You're now ready to use BobSentinel! 🎉**

*Remember: Prevention is better than debugging.*

---

**Need more help?** Check out:
- 📖 [Full Documentation](BOBSENTINEL-README.md)
- 🔄 [Workflow Guide](WORKFLOW-GUIDE.md)
- 🎮 [Demo Project](../examples/demo-project/)