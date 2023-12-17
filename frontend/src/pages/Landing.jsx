import { useState } from 'react'
import LandingImage from '../assets/landing.webp'
import LandingNav from '../components/LandingNav.jsx'
import { useAuthContext } from "@asgardeo/auth-react";
import { Box, Flex, Heading, Image} from '@chakra-ui/react'

function Landing() {
  return (
    <>
      <LandingNav />
      <Flex
        //  backgroundImage={Ima} backgroundSize={'cover'} 
        width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} height={'100vh'}>

        <Box ml={'70px'}>
          <Heading p={'5px'} fontSize={'50px'}>Say Goodbye <br />To Long Wait Times</Heading>
          <Heading borderRadius={'10px'} backgroundColor={'#006FF2'} color={'white'} mt={'20px'} p={'10px'} fontSize={'30px'} fontWeight={'500'}>Get your medicine delivered. Instantly.</Heading>
        </Box>
        <Image  maxW={'100%'} maxH={'80%'} objectFit={'cover'} src={LandingImage} alt="landing" />
      </Flex>
      {/* </div> */}
    </>
  )
}

export default Landing
