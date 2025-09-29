// import { Client, Wallet, xrpToDrops, Payment, TrustSet, TrustSetFlags, AccountSet, AccountSetAsfFlags, convertStringToHex } from "xrpl";

// //create token 
// async function createToken({ issuer, receiver, client, tokenCode }: any) {
//   // Create the trust line to send the token
//   const trustSet: TrustSet = {
//     TransactionType: "TrustSet",
//     Account: receiver.address,
//     LimitAmount: {
//       currency: tokenCode,
//       issuer: issuer.address,
//       value: "500000000", // 500M tokens
//     },
//     Flags: TrustSetFlags.tfClearNoRipple,
//   };
//   console.log(trustSet);

//   //convert string to hex padded
// function convertStringToHexPadded(str: string): string {
//   // Convert string to hexadecimal
//   let hex: string = "";
//   for (let i = 0; i < str.length; i++) {
//     const hexChar: string = str.charCodeAt(i).toString(16);
//     hex += hexChar;
//   }

//   // Pad with zeros to ensure it's 40 characters long
//   const paddedHex: string = hex.padEnd(40, "0");
//   return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
// }


//   // Pad with zeros to ensure it's 40 characters long
//   // const paddedHex: string = hex.padEnd(40, "0");
//   // return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
// }

// //enable ripplig 
// async function enableRippling({ wallet, client }: any) {
//   const accountSet: AccountSet = {
//     TransactionType: "AccountSet",
//     Account: wallet.address,
//     SetFlag: AccountSetAsfFlags.asfDefaultRipple,
//   };

//   const prepared = await client.autofill(accountSet);
//   const signed = wallet.sign(prepared);
//   const result = await client.submitAndWait(signed.tx_blob);

//   console.log(result);
//   console.log("Enable rippling tx: ", result.result.hash);

//   return;
// }




// async function main() {
//   const client = new Client("wss://s.altnet.rippletest.net:51233");
//   await client.connect();

//   //create account
//   const { wallet: wallet1, balance: balance1 } = await client.fundWallet();
//   const { wallet: wallet2, balance: balance2 } = await client.fundWallet();

//   console.log('wallet1', wallet1);
//   console.log('wallet2', wallet2);

//   console.log({
//     balance1,
//     address1: wallet1.address, //wallet1.seed
//     balance2,
//     address2: wallet2.address
//   });

//   const issuer = wallet1;
//   const receiver = wallet2;

//   console.log("Issuer seed:", wallet1.seed);
//   console.log("Receiver seed:", wallet2.seed);

//   //enable rippling
//   await enableRippling({ wallet: issuer, client });

//   //create token
//   await createToken({ issuer, receiver, client, tokenCode: convertStringToHexPadded("TRYOUT")});

//   await client.disconnect();
//   console.log("all done");
// }

// main();

//compile and run : 
//npx tsx practice.ts


///
import { Client, Wallet, xrpToDrops, Payment } from "xrpl";
import { TrustSet, convertStringToHex, TrustSetFlags } from "xrpl";
import { AccountSet, AccountSetAsfFlags } from "xrpl";
import { TrustSet, convertStringToHex, TrustSetFlags } from "xrpl";
import { Payment } from "xrpl/src/models";

import { AMMCreate, AMMDeposit, AMMDepositFlags } from "xrpl";
import { OfferCreate, OfferCreateFlags } from "xrpl";

async function createAMM({ issuer, receiver, client, tokenCode }: any) {
  console.log("create AMM", { issuer, receiver, tokenCode });
  let createAmm: AMMCreate = {
    TransactionType: "AMMCreate",
    Account: receiver.address,
    TradingFee: 600,
    Amount: {
      currency: tokenCode,
      issuer: issuer.classicAddress,
      value: "20000", // 2M tokens         
    },
    Amount2: "50", // 50 XRP in drops
  };
  console.log(createAmm);

  const prepared = await client.autofill(createAmm);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log(result);
  console.log("Create amm tx: ", result.result.hash);

  return;
}

async function createToken({ issuer, receiver, client, tokenCode }: any) {
  // Create the trust line to send the token
  const trustSet: TrustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "500000000", // 500M tokens
    },
    Flags: TrustSetFlags.tfClearNoRipple,
  };
  console.log(trustSet);

  // Receiver opening trust lines
  const preparedTrust = await client.autofill(trustSet);
  const signedTrust = receiver.sign(preparedTrust);
  const resultTrust = await client.submitAndWait(signedTrust.tx_blob);

  console.log(resultTrust);
  console.log("Trust line issuance tx result: ", resultTrust.result.hash);

  // Send the token to the receiver
  const sendPayment: Payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: receiver.address,
    Amount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "5000000", // 200M tokens
    },
  };
  console.log(sendPayment);

  const preparedPayment = await client.autofill(sendPayment);
  const signedPayment = issuer.sign(preparedPayment);
  const resultPayment = await client.submitAndWait(signedPayment.tx_blob);

  console.log(resultPayment);
  console.log("Transfer issuance tx result: ", resultPayment.result.hash);


  return;
}

function convertStringToHexPadded(str: string): string {
  // Convert string to hexadecimal
  let hex: string = "";
  for (let i = 0; i < str.length; i++) {
    const hexChar: string = str.charCodeAt(i).toString(16);
    hex += hexChar;
  }

  // Pad with zeros to ensure it's 40 characters long
  const paddedHex: string = hex.padEnd(40, "0");
  return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
}

async function enableRippling({ wallet, client }: any) {
  const accountSet: AccountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: AccountSetAsfFlags.asfDefaultRipple,
  };

  const prepared = await client.autofill(accountSet);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log(result);
  console.log("Enable rippling tx: ", result.result.hash);

  return;
}


const client = new Client("wss://s.altnet.rippletest.net:51233");  
  
  const main = async () => {
  console.log("lets get started...");
  await client.connect();
  
  console.log('lets fund 2 accounts...')
  const { wallet: wallet1, balance: balance1 } = await client.fundWallet()
  const { wallet: wallet2, balance: balance2 } = await client.fundWallet()
  
  console.log('wallet1', wallet1)
  console.log('wallet2', wallet2)
  
  console.log({ 
      balance1, 
      address1: wallet1.address, //wallet1.seed
      balance2, 
      address2: wallet2.address 
  })

  // sEdVLnGgYbbRszSvgdkYMa76xyfYtKv //receiver
  // sEdSqFVz2e3RkfP3hc6n6Go2HZJMy4w //issuer
  
  //creation diu seed
const issuer = wallet1;
const receiver = wallet2;

console.log("Issuer:", wallet1.seed);
console.log("Receiver:", wallet2.seed);

// enable ripling
  // await enableRippling({ wallet: issuer, client });
  
  // ... previous code
// create Token
  await createToken({
    issuer,
    receiver,
    client,
    tokenCode: convertStringToHexPadded("LeFricACHUN"),
  });
  
  await createAMM({
    issuer,
    receiver,
    client,
    tokenCode: convertStringToHexPadded("LeFricACHUN"),
  });
  
  await client.disconnect();
  console.log("all done!");
  
  }

main();


//run to test : npx tsx practice.ts
//test on website: https://testnet.xrpl.org/token/4C6546726963414348554E000000000000000000.rEu7jrFijHagqDWScoAPX6pxvmurV8NLKF


//account 
//rNvYfoVNKU5aXx29j7Kf7nW3FrYS9xBzay