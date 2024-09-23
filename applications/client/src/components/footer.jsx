import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon,MDBBtn } from 'mdb-react-ui-kit';

export default function footer() {
  return (
    <MDBFooter  color ='dark' bgColor='light'className='text-center text-lg-start '>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
       
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              
                © 2024 Gatormart
              </h6>
              <p>
                Gatormart is the perfect online auction marketplace, both for SFSU students as well as the rest of the world. Something you want to sell? We got you! Or maybe you need to buy something brand new? Leverage the Gatormart platform. Don't want to meet at shady places? Make sure all your pickups are on campus!
              </p>
            </MDBCol>


            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contribute</h6>
              <p>
              <MDBBtn outline style ={{borderRadius:'50%'}}tag='a' color="dark" floating className='m-1' href='https://github.com/CSC-648-SFSU/csc648-fall22-01-Team03' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
              </p>
             
              
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='dark' icon='home' className='me-2' />
                1600 Holloway Avenue, <span >SF</span>
              </p>
              <p>
                <MDBIcon color='dark' icon='envelope' className='me-2' />
                contact@gatormart.tech
              </p>
              <p>
                <MDBIcon color='dark' icon='phone' className='me-2' /> +1 415/338-2234
              </p>
            
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

    </MDBFooter>
  );
}