require('dotenv').config();
const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    AccountBalanceQuery,
    TokenId,
} = require('@hashgraph/sdk');

async function createAccount() {
    const operatorId = process.env.OPERATOR_ID;
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const newAccountPrivateKey = PrivateKey.generate();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(1000)
        .execute(client);

    const getReceipt = await newAccount.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    return {
        accountId: newAccountId.toString(),
        privateKey: newAccountPrivateKey.toString(),
        publicKey: newAccountPublicKey.toString(),
    };
}

async function createNft(accountId, accountKey) {
    const operatorId = process.env.OPERATOR_ID;
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    let tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName('TicketNFT')
        .setTokenSymbol('TNFT')
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(operatorId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(250)
        .setSupplyKey(operatorKey)
        .freezeWith(client);

    let tokenCreateSign = await tokenCreateTx.sign(operatorKey);
    let tokenCreateSubmit = await tokenCreateSign.execute(client);
    let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
    let tokenId = tokenCreateRx.tokenId;

    const mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from('first nft')])
        .freezeWith(client);

    const mintTxSign = await mintTx.sign(operatorKey);
    const mintTxSubmit = await mintTxSign.execute(client);
    const mintRx = await mintTxSubmit.getReceipt(client);
    const serial = mintRx.serials[0].low;

    return {
        tokenId: tokenId.toString(),
        serialNumber: serial.toString(),
    };
}

module.exports = { createAccount, createNft };
