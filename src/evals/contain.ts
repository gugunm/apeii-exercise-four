import { contains, runEvalCli } from '@anvia/core/evals';
import { createAgent } from '../lib/agent.js';
import { cases } from '../lib/cases.js';
import { lensClient } from '../lib/lens.js';

const agent = createAgent();

await runEvalCli({
  name: 'contains',
  cases,
  target: (input: string) => agent.generate({ prompt: input }),
  metrics: [contains()],
  format: 'pretty',
  exitCode: true,
  reporters: [
    lensClient.evalReporter({
      includePayloads: true,
    }),
  ],
});

await lensClient.flush();
