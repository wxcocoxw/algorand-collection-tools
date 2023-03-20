// controllers/asaController.js

const ASA = require('../models/asa');

exports.getHoldersOfCreatorASAsByAddress = async (req, res) => {
  const { creatorAddress, walletAddress } = req.params;
  try {
    const createdASAs = await ASA.getAssetsCreatedBy(creatorAddress);
    const assetIds = createdASAs.assets.map((asa) => asa.index);

    const holders = [];
    for (const assetId of assetIds) {
      const assetHolders = await ASA.getAssetHolders(assetId);
      const holder = assetHolders.balances.find(
        (holder) => holder.address === walletAddress
      );
      if (holder) {
        holders.push({ assetId, ...holder });
      }
    }

    res.status(200).json(holders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset holders', error });
  }
};

exports.getAllHoldersAndOwnedAssets = async (req, res) => {
  try {
    const creatorAddress = req.params.creatorAddress;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;

    const assets = await ASA.getAssetsCreatedBy(creatorAddress);

    const assetHoldersPromises = assets.assets.slice(offset, offset + limit).map(async (asset) => {
      const assetHolders = await ASA.getAssetHolders(asset.index);
      const holders = assetHolders.balances
        .filter((holder) => holder.amount > 0 && holder.address !== creatorAddress)
        .map((holder) => ({
          address: holder.address,
          amount: holder.amount,
        }));

      if (holders.length > 0) {
        return {
          assetId: asset.index,
          assetName: asset.params.name,
          holders: holders,
        };
      } else {
        return null;
      }
    });

    const paginatedHolders = (await Promise.all(assetHoldersPromises)).filter((result) => result !== null);

    res.status(200).json({
      totalPages: Math.ceil(assets.assets.length / limit),
      currentPage: page,
      holdersByAsset: paginatedHolders,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching asset holders',
      error: error,
    });
  }
};



exports.getCreatedASAsByCreator = async (req, res) => {
  const { creatorAddress } = req.params;
  try {
    const asas = await ASA.getAssetsCreatedBy(creatorAddress);
    res.status(200).json(asas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching created ASAs', error });
  }
};
