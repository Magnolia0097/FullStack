import * as React from 'react';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import { Container } from '@mui/material';
import Slider from '../slider/Slider';
import slideImages from "../pages/bg.jpg";




export default function BoxSx() {

    const backgroundMain={
        background:`url("https://i.pinimg.com/originals/b7/b7/15/b7b715190586b985db6b5c46997fc54c.jpg")`,
        
        
    }


  return (
    <div>
 
        
      
        <Container maxWidth="mx">
            <Slider/>

        </Container>
        

       
       

        


        <div className='container'>
            d
        </div>
    </div>
  );
}
