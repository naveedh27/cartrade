import React, { Component } from 'react';
import {Form,Button,TextArea} from 'semantic-ui-react'
import web3 from './Ethereum/web3'
import instance from './Ethereum/CarFactory';

class FieldSet extends Component{

  constructor(props){
    super(props);

    //console.log(this.props.carDetails);

    this.state ={
      isDisabled : !!this.props.carDetails[0] ,
      carBrand : '',
      carModel : '',
      desc : '',
      isLoading : false
    }


  }

  componentWillReceiveProps(nextProps) {
    //  console.log(nextProps.);
      this.setState({   isDisabled : !!nextProps.carDetails[0] });

  }


    onSubmit = async () => {

        const accounts = await web3.eth.getAccounts();
        this.setState({isLoading:true});
        try {

          await instance.methods
                  .register(this.state.carBrand,this.state.carModel,this.state.desc)
                  .send({
                    from : accounts[0],
                    gasLimit : '500000'
                  });

        } catch (e) {

          this.setState({
            carBrand : '',
            carModel : '',
            desc : ''
          });

        } finally {

        }
        this.setState({isLoading:false});

        this.props.updateValues();
    }

  render(){

    return(
    <Form onSubmit = {this.onSubmit}
      style={{textAlign: 'left'}}>
        <Form.Field required disabled={this.state.isDisabled}>
          <label>Car Brand</label>
          <input
              value = {this.state.carBrand}
              placeholder='Car Brand'
              onChange = {(event)=>
                 this.setState({carBrand : event.target.value}) }
               />
        </Form.Field>
        <Form.Field required  disabled={this.state.isDisabled}>
          <label>Model Number</label>
          <input
              value = {this.state.carModel}
              placeholder='Model Number'
              onChange = {(event)=>
                 this.setState({carModel : event.target.value}) }
              />
        </Form.Field>
        <Form.Field required disabled={this.state.isDisabled}>
          <label>Description</label>
          <TextArea
              value = {this.state.desc}
              placeholder='Description'
              onChange = {(event)=>
                 this.setState({desc : event.target.value}) }
              />
        </Form.Field>
        <Button primary
          disabled={this.state.isDisabled}
            type='submit'>Submit</Button>
    </Form>

    );
  }


}

export default FieldSet;
