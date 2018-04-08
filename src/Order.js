
import React, { Component } from 'react';
import { Table,Container,Button } from 'semantic-ui-react'
import web3 from './Ethereum/web3'
import instance from './Ethereum/CarFactory';

class Orders extends Component{

  constructor(props){
    super(props);
    this.state = {
      orders : this.props.orderList
    }
  }

  async buyCar(address, bidPrice){
    const accounts = await web3.eth.getAccounts();
    await instance.methods.buyCar(address)
                          .send({from : accounts[0],
                                 value : bidPrice
                                  });
    alert('Success');
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ orders: nextProps.orderList });
      //this.renderEachRow();
  }

  render(){
    const {Header,Row,HeaderCell,Body} = Table;
    return(
    <Container fluid  style={{textAlign: 'left'}}>
        <h3>Open Orders : </h3>
      <Table celled>
      <Header>
        <Row>
          <HeaderCell>Brand</HeaderCell>
          <HeaderCell>Model</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Owner Address</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Bid Price (In Ether)</HeaderCell>
          <HeaderCell>Buy</HeaderCell>
        </Row>
      </Header>
      <Body>
      <RenderBody orderList ={this.state.orders} buyCar = {this.buyCar}/>
      </Body>
      </Table>
    </Container>
    )

  }
}


const RenderBody = function(props) {

  return props.orderList.map((order,index) => {
      return <RenderEachRow
          key={index}
          id={index}
          buyCar = {props.buyCar}
          order = {order}
        />
    });


};

const RenderEachRow = function(props){
  console.log(props);
  const {Row,Cell} = Table;
  return (
    <Row>
       <Cell>{props.order[0]} </Cell>
       <Cell>{props.order[1]} </Cell>
       <Cell>{props.order[2]} </Cell>
       <Cell>{props.order[3]} </Cell>
       <Cell>{props.order[4]} </Cell>
       <Cell>{ web3.utils.fromWei(props.order[5],'ether') } </Cell>
       <Cell>
          <Button basic color="green"
          content ="Buy"
          onClick = {()=>props.buyCar( props.order[3],props.order[5] )}
          />
        </Cell>
     </Row>
  );
}


export default Orders;
