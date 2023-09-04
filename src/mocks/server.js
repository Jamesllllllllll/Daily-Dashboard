// Configuring MSW to work in Node
// https://mswjs.io/docs/getting-started/integrate/node

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.

export const server = setupServer(...handlers)
