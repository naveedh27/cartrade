import React, { Component } from 'react';
import web3 from './Ethereum/web3'
import instance from './Ethereum/CarFactory';
import './App.css';
import { Card, Grid,Container  } from 'semantic-ui-react';
import FieldSet from './FormInp'
import Layout from './component/Layout'
import Sell from './Sell';
import Orders from './Order';
import Footer from './component/footer'

class App extends Component {

  state = {
    myCar : ['','',''],
    items : [],
    orders : []
  }

  async componentDidMount() {

      this.updateValues();

  }


  updateValues = async() =>{

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let myCar = ['','',''];
    try {
      myCar = await instance.methods.getMyCar().call({from:accounts[0]});
    } catch (e) {

    } finally {
    }


    const items = [
          {
            header: 'Brand Name',
            description:'',
            meta: myCar[0],
            key : 0
          },
          {
            header: 'Car Model',
            description:'',
            meta: myCar[1],
            key : 1
          },
          {
            header: 'Description',
            description:'',
            meta: myCar[2],
            key : 2
          }
    ];

    this.updateOrder();
    this.setState({items,myCar});
  }

  updateOrder = async () => {

    const accounts = await web3.eth.getAccounts();
    const sellerAdd = await instance.methods.allSellerAddress().call({from:accounts[0]});
    let orders = [];

    for(var e in sellerAdd){
      let orderIndex = await instance.methods.registeredMap(sellerAdd[e]).call({from:accounts[0]});
      let eachOrd = await instance.methods.listOfOrder(orderIndex).call({from:accounts[0]});
      //console.log(eachOrd);
      orders.push(eachOrd);
    }

    this.setState({orders});

  }



  render() {

  //  this.updateOrder();

    return (

      <Layout>


        <Container style={{marginTop:'10px'}}>
          <Grid>
              <Grid.Row>
                <Grid.Column  width={9}>
                  <Card.Group key={this.state.items.key} items={this.state.items} />
                </Grid.Column>
                <Grid.Column  width={6}>
                  <Container fluid >
                      <FieldSet carDetails={this.state.myCar} updateValues={this.updateValues} />
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
              <hr />

              <Sell updateOrder ={this.updateOrder} myCarBrand = {this.state.myCar[0]}/>

              <hr />

              <Orders orderList = {this.state.orders} />

                <hr />
              <Footer />
          </Container>


          </Layout>




    );
  }
}

export default App;
