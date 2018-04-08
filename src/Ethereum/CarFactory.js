import web3 from './web3';
import CarTrade from './build/CarTrade.json';


const instance = new web3.eth.Contract(
  JSON.parse(CarTrade.interface),
  '0x0e3FC649eEBc6bBCfA8b640bc8f2dc7DEc1f1201'
);


export default instance;
