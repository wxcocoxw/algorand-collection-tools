# Algorand Collection Tools

This is a Node.js server that provides a set of RESTful API endpoints for querying Algorand blockchain data for Creator NFT Collections.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
   ```git clone https://github.com/wxcocoxw/algorand-collection-tools.git```

2. Install the dependencies for the project.
   cd algorand-collection-tools
   ```npm install```

3. Create a `.env` file in the project root directory, and add your PureStake API key as a value for the `PURESTAKE_API_KEY` variable. You can obtain an API key by signing up for a PureStake account [here](https://developer.purestake.io/signup).
   
   ```PURESTAKE_API_KEY=your_api_key_here```

4. Optionally, you can also specify the Algorand network you want to use by setting the `ALGORAND_NETWORK` variable to either `testnet` or `mainnet`. The default is `testnet`.
   
   ```ALGORAND_NETWORK=mainnet```

5. Start the server.
   
   ```npm start```

The server should now be running at http://localhost:3010.

## Available Endpoints

### GET /creator/:creatorAddress/asa/holder/:walletAddress

Retrieves a list of holders and their balances for all assets created by a specific Algorand wallet address, filtered by a specific wallet address.

```http://localhost:3010/api/v1/creator/:creatorAddress/asa/holder/:walletAddress```

#### Query Parameters

- `creatorAddress` (required) - The Algorand address of the creator wallet.
- `walletAddress` (required) - The Algorand address of the holder's wallet.

#### Response

A JSON object with an array of asset IDs and balances held by the wallet address.

### GET /:creatorAddress/holders

Retrieves a list of holders and their assets for all assets created by a specific Algorand wallet address.

```http://localhost:3010/api/v1/:creatorAddress/holders```

#### Query Parameters

- `creatorAddress` (required) - The Algorand address of the creator wallet.

#### Response

A JSON object with an array of wallet addresses and the assets they own.

### GET /creator/:creatorAddress/asas

Retrieves a list of all assets created by a specific Algorand wallet address.

```http://localhost:3010/api/v1/creator/:creatorAddress/asas```

#### Query Parameters

- `creatorAddress` (required) - The Algorand address of the creator wallet.

#### Response

A JSON object with an array of asset IDs and metadata for all assets created by the wallet address.

## Contributing

If you'd like to contribute to this project, feel free to open a pull request or issue on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
