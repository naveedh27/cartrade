
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const CampaignPath = path.resolve(__dirname,'contract','CarTrade.sol');
const src = fs.readFileSync(CampaignPath,'utf-8');

const output = solc.compile(src,1).contracts;

fs.ensureDirSync(buildPath);


for(let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath,contract.replace(":","")+'.json'),
    output[contract]
  );
}
