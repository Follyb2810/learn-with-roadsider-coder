import React from 'react'
import './Screen.css'
import {Container, Row} from 'react-bootstrap'
const MainScreen = ({title,children}) => {
  return (
    <div className='mainback'>
         <Container>
           <Row>
              <div className='page'>
                 {
                    title && (
                         <React.Fragment>
                         <h1 className='heading'>{title}</h1>
                         <hr/>
                         </React.Fragment>
                        )
                 }
                 {children}
              </div>
           </Row>
            
         </Container>
    </div>
  )
}

export default MainScreen