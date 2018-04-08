import React, { Component } from 'react';
import instance from './Ethereum/CarFactory';
import web3 from './Ethereum/web3'
import { Grid,Form,Input,Button,Container } from 'semantic-ui-react';


class Sell extends Component {

  constructor(props){
    super(props);

    this.state = {
      bidPrice : '',
      disabled : true,
      isLoading : false
    }

  }

  componentWillReceiveProps(nextProps) {
      this.setState({ disabled: !!!nextProps.myCarBrand });
  }

  sell = async() =>{

    const accounts = await web3.eth.getAccounts();
    this.setState({isLoading : true});
    try {
      await instance.methods
              .sellMyCar(web3.utils.toWei(this.state.bidPrice,'ether'))
              .send({from:accounts[0] , gasLimit : '500000'});
    } catch (e) {
        console.log(e);
    } finally {

    }

    this.setState({isLoading : false});
    this.props.updateOrder();

  }

    render(){

      return(
        <Container fluid style={{textAlign: 'left'}}>
        <h3>Sell : </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column  width={9}>
                <Form  >
                    <Form.Field required disabled={this.state.disabled}>
                      <label>Bid Price (in Ether)</label>
                      <Input
                          action={{ color: 'teal', labelPosition: 'left', icon: 'bitcoin', content: 'Ether' }}
                          actionPosition='left'
                          placeholder='Enter Bid Price in Ether'
                          value={this.state.bidPrice}
                          onChange = {(event)=>
                             this.setState({bidPrice : event.target.value}) }
                        />
                    </Form.Field>
                      <Form.Field disabled={this.state.disabled}>
                          <Button primary
                            loading = {this.state.isLoading}
                            onClick={this.sell}
                            content = "Sell"
                          />
                      </Form.Field>
                    </Form>
            </Grid.Column>
            <Grid.Column  width={6}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      );
    }

}


export default Sell;
