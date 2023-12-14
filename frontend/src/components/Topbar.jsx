import React from 'react'
import {
    useEffect, useState
} from 'react'

import { NavLink } from "react-router-dom";
import './topbar.css';

import {
    Flex, Image, Text, HStack, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,

    MenuIcon,
    Avatar,
    IconButton,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import {
    useAuthContext,
} from '@asgardeo/auth-react'

import {
    ChevronDownIcon
} from '@chakra-ui/icons'
import Logo from '../assets/droneAid-white.svg'

const Topbar = ({ routes }) => {

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
            color={'white'} height={'58px'} width={'100%'} justifyContent={'center'} alignItems={'center'}  >
            <Flex width={'99%'} height={'100%'} background={
                user?.applicationRoles == "administrator" ? 'linear-gradient(120deg, rgba(66,66,66,1) 50%, rgba(101,35,153,1) 100%)' : 'linear-gradient(120deg, rgba(66,66,66,1) 50%, rgba(255, 107, 193,1) 150%)'
            } borderBottomLeftRadius={'10px'} borderBottomRightRadius={'10px'}
                justifyContent={'space-between'} p={'0px 10px'} pl={'30px'} alignItems={'center'} >

                {/* {JSON.stringify(routes)} */}

                <Flex gap={'40px'} justifyContent={'center'} alignItems={'center'}>
                    <Image src={Logo} height={'80%'} width={'180'} />
                    <HStack spacing={8} alignItems={'center'}>
                        {routes?.map((route, index) => {
                            return (
                                <NavLink key={index} to={route.path} className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }>{route.label}</NavLink>
                            )
                        })}
                    
                    


                        {/* <NavLink to="/admin/overview" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Overview</NavLink>
                        <NavLink to="/admin/fleet" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>My Fleet</NavLink> */}


                    </HStack>
                </Flex>
                <Menu >

                    <Flex gap={'5px'} alignItems={'center'} backgroundColor={
                        'rgba(255, 255, 255, 0.1)'}

                        borderRadius={'10px'}
                    >

                        <MenuButton as={Avatar} src={'https://picsum.photos/100/200'} borderRadius={'10px'} p={'5px'} />

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
