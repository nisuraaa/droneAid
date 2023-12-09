import React from 'react'
import {
    useEffect, useState
} from 'react'
import { Flex, Image, Text, HStack,Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    IconButton,
    MenuOptionGroup,
    MenuDivider, } from '@chakra-ui/react'
import {
    useAuthContext,
} from '@asgardeo/auth-react'

import {
    ChevronDownIcon
} from '@chakra-ui/icons'
import Logo from '../assets/droneAid-white.svg'

const Topbar = () => {

    const [user, setUser] = useState(null);

    const {
        signOut,
        isAuthenticated,
        getBasicUserInfo,
    } = useAuthContext();

    useEffect(() => {
        getBasicUserInfo().then((user) => {
            console.log(user);
            setUser(user);
        }
        );
    }, []);

    return (
        <Flex zIndex={100}
         color={'white'} position={'fixed'} height={'100px'} top={0} width={'100%'} justifyContent={'center'} alignItems={'center'}  >
            <Flex width={'97%'} borderRadius={'10px'} height={'80%'} background={'linear-gradient(120deg, rgba(66,66,66,1) 50%, rgba(101,35,153,1) 100%)'}
                justifyContent={'space-between'} p={'0px 10px'} pl={'30px'} alignItems={'center'} >
                <Flex gap={'40px'} justifyContent={'center'} alignItems={'center'}>
                    <Image src={Logo} height={'80%'} width={'200px'} />
                    <HStack spacing={8} alignItems={'center'}>
                        <Text fontSize={'18px'}>Overview</Text>
                        <Text fontSize={'18px'}>My Fleet</Text>
                    </HStack>
                </Flex>
                <Menu >

                <Flex gap={'5px'} alignItems={'center'} backgroundColor={
                    'rgba(255, 255, 255, 0.1)'}

                    p={'10px'} borderRadius={'10px'}
                >

                    <Image src={'https://picsum.photos/200/300'} borderRadius={'10px'} height={'40px'} width={'40px'} ml={'10px'} />
                    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'} padding={'0px 10px'}>
                        <Text fontSize={'16px'} fontWeight={'medium'}> {user ? user.username : 'User'} </Text>
                        <Text fontSize={'12px'}>{
                            user ? user.applicationRoles : null
                        }</Text>
                    </Flex>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<ChevronDownIcon />}
                        variant="solid"
                        colorScheme="white"
                        size="sm"
                    />
                    <MenuList color={'black'}>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={() => {
                            signOut();
                        }}>Sign Out</MenuItem>
                    </MenuList>
                </Flex>

                </Menu>


            </Flex>
        </Flex>
    )
}

export default Topbar
