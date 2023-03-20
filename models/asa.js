// models/asa.js

require('dotenv').config();

const algosdk = require('algosdk');

const pureStakeApiKey = process.env.PURESTAKE_API_KEY;
const algorandNetwork = process.env.ALGORAND_NETWORK || 'testnet';

const baseServer =
  algorandNetwork === 'mainnet'
    ? 'https://mainnet-algorand.api.purestake.io/idx2'
    : 'https://testnet-algorand.api.purestake.io/idx2';
const port = '';

const token = {
  'X-API-key': pureStakeApiKey,
};

const indexerClient = new algosdk.Indexer(token, baseServer, port);

class ASA {
  static async getAssetHolders(assetId) {
    const response = await indexerClient.lookupAssetBalances(assetId).do();
    return response;
  }

  static async getAssetsCreatedBy(creatorAddress) {
    const response = await indexerClient.searchForAssets().creator(creatorAddress).do();
    return response;
  }
}

module.exports = ASA;
