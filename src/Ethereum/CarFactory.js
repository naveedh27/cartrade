import web3 from './web3';
import CarTrade from './build/CarTrade.json';

const ADDRESS_FILE = require('./ADDRESS.json');


const instance = new web3.eth.Contract(
  JSON.parse(CarTrade.interface),
  ADDRESS_FILE.ADDRESS
);


export default instance;
