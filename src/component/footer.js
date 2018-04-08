import React from "react";
import { Container,Menu} from 'semantic-ui-react';


const Footer = function(props){

  return(
    <Container style={{marginTop:'10 px'}}>
    <Menu >
      <Menu.Item
        name='editorials' >
        Thanks for Checking Out !!
      </Menu.Item>

    </Menu>
    </Container>
  )

}
export default Footer;
