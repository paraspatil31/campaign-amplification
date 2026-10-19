import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mockStore } from '../src/services/mock/mockStore';
import { ASSUMPTIONS } from '../src/config/assumptions';
import { CONSTANTS } from '../src/config/constants';

describe('Contributions & Backing Store (EPIC 5 / FT-060-064)', () => {
  it('should create contribution with receipt and increase raised amount', () => {
    const campaigns = mockStore.getCampaigns();
    const targetCampaign = campaigns[0];
    const initialRaised = targetCampaign.raisedCents;
    const initialBackers = targetCampaign.backerCount;

    const { contribution, receipt } = mockStore.createContribution(targetCampaign.id, 50, {
      publicNameOptIn: false,
    });

    assert.ok(contribution.id.startsWith('cnt-'));
    assert.equal(contribution.amountCents, 5000);
    assert.equal(contribution.publicNameOptIn, false);
    assert.equal(contribution.status, 'succeeded');

    assert.ok(receipt.id.startsWith('rcp-'));
    assert.ok(receipt.number.startsWith('RCP-'));
    assert.equal(receipt.totalCents, 5000);

    // Verify campaign was updated
    const updated = mockStore.getCampaignById(targetCampaign.id);
    assert.ok(updated !== undefined);
    assert.equal(updated!.raisedCents, initialRaised + 5000);
    assert.equal(updated!.backerCount, initialBackers + 1);
  });

  it('should support private/anonymous backer by default', () => {
    const campaigns = mockStore.getCampaigns();
    const { contribution } = mockStore.createContribution(campaigns[0].id, 25, {});

    assert.equal(contribution.publicNameOptIn, false);
    assert.equal(contribution.backerName, undefined);
  });

  it('should support public backer name opt-in when requested', () => {
    const campaigns = mockStore.getCampaigns();
    const { contribution } = mockStore.createContribution(campaigns[0].id, 100, {
      publicNameOptIn: true,
      backerName: 'Community Champion',
    });

    assert.equal(contribution.publicNameOptIn, true);
    assert.equal(contribution.backerName, 'Community Champion');
  });
});

describe('Product & Copy Rules Enforcement (AGENT.md §3)', () => {
  it('should enforce non-donation notice in assumptions', () => {
    assert.ok(!ASSUMPTIONS.NOT_A_DONATION_NOTICE.toLowerCase().includes('donate to'));
    assert.ok(ASSUMPTIONS.NOT_A_DONATION_NOTICE.toLowerCase().includes('not the cause'));
    assert.ok(ASSUMPTIONS.NOT_A_DONATION_NOTICE.toLowerCase().includes('advertising distribution'));
  });

  it('should enforce input length constraints', () => {
    assert.equal(CONSTANTS.TITLE_MAX_LENGTH, 60);
    assert.equal(CONSTANTS.SUMMARY_MAX_LENGTH, 280);
    assert.equal(CONSTANTS.HEADLINE_MAX_LENGTH, 80);
    assert.equal(CONSTANTS.DESCRIPTION_MAX_LENGTH, 160);
  });
});
