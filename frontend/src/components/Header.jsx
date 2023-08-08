import React from 'react'
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import headerImage from '../images/job.jpg'

function Header() {
    const StyleHeader = styled(Box)(({theme})=>(
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 500,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            width: '100%',
            height: 'auto',
            backgroundPosition: 'center',
            backgroundColor: theme.palette.secondary.main,



            '@media (max-width: 1200px)': {
            backgroundSize: 'contain',
            backgroundRepeat:'no-repeat'
            },
            '@media (max-width: 768px)': {
            minHeight: 300,
            backgroundRepeat:'no-repeat'

            },

        }
        ))
  return (
   <>
        <StyleHeader>
        
        
        </StyleHeader>
   </>
  )
}

export default Header
