# XRP-practice (https://github.com/XRPL-Commons/xrpl-training-2025-september)
- Main Activity Hub: https://docs.xrpl-commons.org

### Day 1
- Morning Payment Activity: https://docs.xrpl-commons.org/xrpl-basics/payments
- Afternoon Token Issuance Activity: https://docs.xrpl-commons.org/token-issuance-and-liquidity

### Main links

Ecosystem map: https://map.xrpl-commons.org
Block explorer: https://testnet.xrpl.org
Faucets: https://xrpl.org/resources/dev-tools/xrp-faucets/
Transactions references: https://xrpl.org/docs/references/protocol/transactions/types/
Training live sync: https://trainings.xrpl.at (password is training-april-2024)

----

# XRP Practice

## Table of Contents

* [About](#about)
* [Usage](#usage)
* [Setup & Compilation](#setup--compilation)
* [Key Concepts Learned](#key-concepts-learned)
* [Skills Developed](#skills-developed)
* [Technical Implementation](#technical-implementation)
* [Understanding the XRP Ledger](#understanding-the-xrp-ledger)
* [Development Standards](#development-standards)

## About

This repository contains my **XRP Ledger practice project**, developed as part of my journey into blockchain development and distributed systems.
It demonstrates how to connect to, query, and interact with the **XRP Ledger** using **TypeScript**.

**The Challenge:**
Interacting with a decentralized, real-time financial ledger like XRP requires understanding cryptographic transactions, network protocols, and asynchronous event handling.
This project builds a strong foundation for blockchain developers seeking to work with XRP APIs, sign transactions, and automate ledger operations.

---

## Usage

The program demonstrates how to establish a connection with the XRP Ledger, retrieve account information, and send test transactions.

```bash
# Run the practice script
npx ts-node practice.ts
```

You can customize configuration parameters (network endpoint, wallet credentials, etc.) directly inside the `practice.ts` file.

**Example Output:**

```bash
Connecting to wss://s.altnet.rippletest.net:51233
Connected to XRP Ledger Testnet.
Account: rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe
Balance: 1000 XRP
Transaction submitted successfully: A4C5D2...
```

**Environment Variables (optional):**
If implemented, you may use a `.env` file for secure configuration:

```
WALLET_SEED=your_wallet_seed
NETWORK=wss://s.altnet.rippletest.net:51233
```

---

## Setup & Compilation

This project uses **Node.js** and **TypeScript**.

```bash
# Clone the repository
git clone https://github.com/ychun816/XRP-practice.git
cd XRP-practice

# Install dependencies
npm install

# Run directly with ts-node
npx ts-node practice.ts

# Or compile to JavaScript
npx tsc
node dist/practice.js
```

**Dependencies:**

* `xrpl`: XRP Ledger client library
* `dotenv`: Environment variable management (optional)
* `typescript`, `ts-node`: For compilation and runtime support

**Compilation Flags:** (handled by tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true
  }
}
```

---

## Key Concepts Learned

### Blockchain Fundamentals

* **Decentralized Ledger Architecture:** Understanding how XRP maintains consensus without mining
* **Transaction Lifecycle:** From signing to validation and ledger inclusion
* **Public-Key Cryptography:** Generating and using XRP addresses securely
* **Immutable Record Keeping:** How transaction history is maintained transparently

### TypeScript & Asynchronous Design

* **Async/Await Patterns:** Managing real-time API requests
* **Promises & Event Handling:** Reacting to network and transaction events
* **Error Handling:** Gracefully managing connection or transaction failures

### XRP Ledger Interaction

* **Connecting to the XRP Network:** Establishing WebSocket connections
* **Fetching Ledger and Account Data:** Querying balances, transactions, and states
* **Submitting Payments:** Crafting and signing test transactions
* **Ledger Stream Subscriptions:** Listening for live ledger updates

---

## Skills Developed

* **Blockchain Programming:** Practical understanding of XRP Ledger SDKs
* **API Integration:** Building resilient, asynchronous client-side blockchain apps
* **Secure Credential Handling:** Managing seeds and wallet keys safely
* **TypeScript Proficiency:** Using strict typing and modern async structures
* **System Debugging:** Diagnosing API errors, transaction failures, and connection issues
* **Software Design:** Structuring clean, reusable blockchain interaction modules

---

## Technical Implementation

### Core Architecture

**Main Components:**

1. **Connection Setup:** Initialize WebSocket client using `xrpl` library
2. **Wallet Management:** Load or generate XRP wallet for testing
3. **Ledger Interaction:** Retrieve account balance and recent transactions
4. **Transaction Submission:** Construct, sign, and submit transactions to the ledger
5. **Response Handling:** Monitor confirmations and handle network responses

**Example TypeScript Structure:**

```ts
import xrpl from "xrpl";

async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.generate();
  console.log("Wallet Address:", wallet.classicAddress);

  const balance = await client.request({
    command: "account_info",
    account: wallet.classicAddress,
  });

  console.log("Account Info:", balance);
  await client.disconnect();
}

main();
```

### Transaction Workflow

1. **Connect → Generate Wallet → Fund (Testnet Faucet)**
2. **Query Account Info → Construct Payment → Submit → Verify**
3. **Listen for Ledger Events**

### Error & Reconnection Handling

* Automatic retries for transient network errors
* Graceful disconnects to prevent stale connections
* Validation of transaction success using ledger index tracking

---

## Understanding the XRP Ledger

### Overview

The **XRP Ledger** (XRPL) is a decentralized, open-source blockchain designed for fast, low-cost transactions.
Its consensus algorithm allows settlement in seconds without mining or high energy usage.

### Core Principles

* **Speed:** Transactions settle in 3–5 seconds
* **Scalability:** Handles 1,500+ transactions per second
* **Sustainability:** Minimal energy footprint
* **Interoperability:** Bridges multiple fiat and crypto systems

### Key Components

* **Ledger:** Stores balances, offers, and trustlines
* **Transactions:** Atomic operations like payments, offers, and escrows
* **Validators:** Nodes that agree on the ledger’s state using consensus
* **WebSocket API:** Primary interface for applications interacting with XRPL

---

## Development Standards

### Code Quality
* ✅ Strict TypeScript configuration (`strict: true`)
* ✅ Async/await for non-blocking operations
* ✅ Error-safe and promise-aware design
* ✅ Clear modular separation for maintainability

### Security Practices
* ✅ Avoid exposing wallet seeds publicly
* ✅ Use `.env` for sensitive data
* ✅ Verify transactions before broadcast

### Performance Guidelines
* ✅ Stable WebSocket connection management
* ✅ Efficient event-driven processing
* ✅ Graceful fallback for network instability

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-blue.svg"/>
  <img src="https://img.shields.io/badge/Blockchain-XRPL-green.svg"/>
  <img src="https://img.shields.io/badge/Focus-Ledger%20Development-orange.svg"/>
</p>

---



