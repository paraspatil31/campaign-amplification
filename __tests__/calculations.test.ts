import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calcFees } from '../src/lib/fees';
import { estimateReach, estimateReachAtGoal } from '../src/lib/reach';
import { canTransition, validateForSubmission } from '../src/lib/lifecycle';
import { ASSUMPTIONS } from '../src/config/assumptions';

describe('Financial & Fee Calculations (FT-004)', () => {
  it('should calculate fees accurately for $100 contribution', () => {
    const fees = calcFees(100);

    assert.equal(fees.amountCents, 10000);
    assert.equal(fees.totalCents, 10000);

    // Platform fee: 10% of $100 = $10.00
    assert.equal(fees.platformFeeCents, 1000);
    assert.equal(fees.platformFeeFormatted, '$10.00');

    // Processing fee: 2.9% of $100 ($2.90) + $0.30 fixed = $3.20
    assert.equal(fees.processingFeeCents, 320);
    assert.equal(fees.processingFeeFormatted, '$3.20');

    // Net Ad Budget: $100.00 - $10.00 - $3.20 = $86.80
    assert.equal(fees.adBudgetCents, 8680);
    assert.equal(fees.adBudgetFormatted, '$86.80');
    assert.equal(fees.adBudgetPercentage, 87);
  });

  it('should calculate fees accurately for minimum $5 contribution', () => {
    const fees = calcFees(5);

    assert.equal(fees.amountCents, 500);
    assert.equal(fees.platformFeeCents, 50); // 10% of $5 = $0.50
    assert.equal(fees.processingFeeCents, 45); // 2.9% + $0.30 rounded
    assert.equal(fees.adBudgetCents, 405); // $4.05 ad budget
  });

  it('should handle $0 or negative gracefully without throwing', () => {
    const fees = calcFees(0);
    assert.equal(fees.amountCents, 0);
    assert.equal(fees.adBudgetCents, 0);
  });
});

describe('Audience Reach Estimation Engine (FT-004)', () => {
  it('should always return a range [low, high] where low < high', () => {
    const reach = estimateReach(50);

    assert.ok(reach.low > 0);
    assert.ok(reach.high > reach.low);
    assert.match(reach.formatted, /≈ .+–.+ people/);
  });

  it('should include explicit estimate disclaimer and no guarantees', () => {
    const reach = estimateReach(25);
    assert.equal(reach.disclaimer, ASSUMPTIONS.REACH_DISCLAIMER);
    assert.ok(reach.disclaimer.toLowerCase().includes('estimate'));
    assert.ok(reach.disclaimer.toLowerCase().includes('not a guaranteed outcome'));
  });

  it('should scale estimated reach with larger funding goals', () => {
    const reachSmall = estimateReachAtGoal(100000); // $1,000 goal
    const reachLarge = estimateReachAtGoal(500000); // $5,000 goal

    assert.ok(reachLarge.low > reachSmall.low);
    assert.ok(reachLarge.high > reachSmall.high);
  });
});

describe('Lifecycle Transition Engine (FT-004)', () => {
  it('should allow creator to submit a valid draft', () => {
    const check = canTransition('draft', 'submitted', 'creator');
    assert.equal(check.allowed, true);
  });

  it('should forbid creator from directly publishing to promoting', () => {
    const check = canTransition('draft', 'promoting', 'creator');
    assert.equal(check.allowed, false);
  });

  it('should allow reviewer to approve submitted campaign', () => {
    const check = canTransition('submitted', 'approved', 'reviewer');
    assert.equal(check.allowed, true);
  });

  it('should forbid illegal skip transitions', () => {
    const check = canTransition('submitted', 'completed', 'reviewer');
    assert.equal(check.allowed, false);
  });

  it('should validate campaign completeness prior to submission', () => {
    const invalid = validateForSubmission({ title: '' });
    assert.equal(invalid.valid, false);
    assert.ok(invalid.errors.title);

    const valid = validateForSubmission({
      title: 'Valid Campaign Title',
      category: 'Environment',
      creatorName: 'Test Org',
      summary: 'Test summary under 280 characters',
      storyBlocks: [{ id: '1', type: 'paragraph', content: 'Story text' }],
      fundingGoalCents: 200000,
    });
    assert.equal(valid.valid, true);
    assert.equal(Object.keys(valid.errors).length, 0);
  });
});
