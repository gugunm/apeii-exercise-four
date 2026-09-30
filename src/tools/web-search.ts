import { createTool } from '@anvia/core';
import z from 'zod';
import { tavily } from '@tavily/core';
import dotenv from 'dotenv';

dotenv.config();

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const searchWeb = createTool({
  name: 'searchWeb',
  description: 'Use this tool when user asking for realtime web search results',
  inputSchema: z.object({
    query: z.string(),
  }),
  execute: async (args) => {
    const results = await tavilyClient.search(args.query, {
      includeAnswer: true,
      includeRawContent: 'markdown',
    });

    return JSON.stringify(results);
  },
});
