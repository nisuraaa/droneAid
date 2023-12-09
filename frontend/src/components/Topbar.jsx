import React from 'react'
import { Flex, Image, Text, HStack } from '@chakra-ui/react'

import Logo from '../assets/droneAid-white.svg'

const Topbar = () => {
    return (
        <Flex color={'white'} position={'fixed'} height={'100px'} top={0} width={'100%'} justifyContent={'center'} alignItems={'center'}  >
            <Flex width={'97%'} borderRadius={'10px'} height={'80%'} backgroundColor={'#424242'} justifyContent={'space-between'} p={'0px 30px'} alignItems={'center'} >
                <Flex gap={'40px'} justifyContent={'center'} alignItems={'center'}>
                    <Image src={Logo} height={'80%'} width={'200px'} />
                    <HStack spacing={8} alignItems={'center'}>
                        <Text fontSize={'18px'}>Overview</Text>
                        <Text fontSize={'18px'}>My Fleet</Text>
                    </HStack>
                </Flex>
                <Flex gap={'10px'} alignItems={'center'}>
                    <Image src={'https://picsum.photos/200/300'} borderRadius={'50%'} height={'40px'} width={'40px'} ml={'10px'} />
                    <Text fontSize={'18px'} >John Appleseed</Text>
                </Flex>

            </Flex>
        </Flex>
    )
}

export default Topbar
