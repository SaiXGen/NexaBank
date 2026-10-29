async function runTests() {
  console.log('--- Starting NexaFi Frontend & API E2E Verification ---');
  let passed = 0;
  let failed = 0;

  async function check(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Dashboard Required APIs
  await check('GET /api/user returns 200 with user profile', async () => {
    const res = await fetch('http://localhost:3000/api/user');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || !body.data.username) throw new Error('Invalid user payload');
  });

  await check('GET /api/wallet returns 200 with wallet and token balances', async () => {
    const res = await fetch('http://localhost:3000/api/wallet');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || body.data.totalBalanceUsd === undefined) throw new Error('Invalid wallet payload');
  });

  await check('GET /api/portfolio returns 200 with allocation and chartData', async () => {
    const res = await fetch('http://localhost:3000/api/portfolio?timeframe=30D');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || !Array.isArray(body.data.chartData)) throw new Error('Invalid portfolio payload');
  });

  await check('GET /api/trust-score returns 200 with dynamic score in [800, 1000]', async () => {
    const res = await fetch('http://localhost:3000/api/trust-score');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const score = body.data ? body.data.score : body.score;
    if (typeof score !== 'number' || score < 800 || score > 1000) {
      throw new Error(`Expected score in [800, 1000], got ${score}`);
    }
  });

  await check('GET /api/transactions returns 200 with transaction array', async () => {
    const res = await fetch('http://localhost:3000/api/transactions');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || !Array.isArray(body.data)) throw new Error('Invalid transactions array');
  });

  // 2. Loans & Lending APIs
  let activeLoanId = null;
  await check('GET /api/loans returns 200 with loans overview', async () => {
    const res = await fetch('http://localhost:3000/api/loans');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || !Array.isArray(body.data.activeLoans)) throw new Error('Invalid loans overview');
    activeLoanId = body.data.activeLoans[0]?.id;
  });

  let newLoanId = null;
  await check('POST /api/loans creates new loan with Zod validation', async () => {
    const res = await fetch('http://localhost:3000/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        principalAmount: 2000,
        durationDays: 60,
        purpose: 'E2E Testing Loan Facility',
        collateralAmount: 0,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || body.data.principalAmount !== 2000) throw new Error('Invalid loan creation');
    newLoanId = body.data.id;
  });

  await check('POST /api/loans/[id]/repay successfully repays installment', async () => {
    const targetId = newLoanId || activeLoanId || 'LN-8492';
    const res = await fetch(`http://localhost:3000/api/loans/${targetId}/repay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500 }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || body.data.amountRepaid < 500) throw new Error('Invalid loan repayment');
  });

  // 3. Trust Circles APIs
  await check('GET /api/trust-circles returns 200 array of circles', async () => {
    const res = await fetch('http://localhost:3000/api/trust-circles');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || !Array.isArray(body.data)) throw new Error('Invalid trust circles');
  });

  await check('POST /api/trust-circles creates a new peer underwriting circle', async () => {
    const res = await fetch('http://localhost:3000/api/trust-circles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'AI & Zero Knowledge Security Guild',
        description: 'Collaborative zk-proof developers underwriting shared protocol security.',
        category: 'Security & Audit Guild',
        stakeAmount: 1500,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (!body.success || body.data.name !== 'AI & Zero Knowledge Security Guild') {
      throw new Error('Invalid circle creation response');
    }
  });

  // 4. Frontend Route SSR / Static Pages Rendering
  const pages = ['/dashboard', '/trust-score', '/trust-circles', '/lending', '/transactions'];
  for (const page of pages) {
    await check(`GET ${page} returns HTTP 200 HTML`, async () => {
      const res = await fetch(`http://localhost:3000${page}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (!text.includes('<!DOCTYPE html>') && !text.includes('<html')) {
        throw new Error('Not valid HTML');
      }
    });
  }

  console.log(`\n--- Verification Finished: ${passed} Passed, ${failed} Failed ---`);
  if (failed > 0) process.exit(1);
}

runTests();
