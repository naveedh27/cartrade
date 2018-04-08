import React from 'react';
import {Segment,Header}  from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default  (props) =>  {

    return(
      <div className="App">
        <Segment inverted style={{marginTop:'24 px',height:'45 px'}}>
            <Header as='h2' inverted color='teal'>Car Trade</Header>

        </Segment>

        {props.children}

        </div>
    );

  }
