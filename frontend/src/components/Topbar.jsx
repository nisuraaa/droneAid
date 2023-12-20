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
    useDisclosure,
    VStack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    useMediaQuery,
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
    ChevronDownIcon, HamburgerIcon
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
    const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

    return (
        <Flex zIndex={100}
            color={'white'} height={'58px'} width={'100%'} justifyContent={'center'} alignItems={'center'}  >
            <Flex width={'99%'} height={'100%'} borderBottomLeftRadius={'10px'} borderBottomRightRadius={'10px'}
                justifyContent={'space-between'} p={'0px 10px'} pl={'30px'} alignItems={'center'} >
                {
                    !isLargerThan480 && (
                        <DrawerExample routes={routes} />
                    )
                }
                <Flex gap={'40px'} justifyContent={'center'} alignItems={'center'}>

                    <Image src={Logo} height={'80%'} width={'180'} />
                    {!!isLargerThan480 && (
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
                    )}
                </Flex>
                <Menu >

                    <Flex gap={'5px'} alignItems={'center'} backgroundColor={
                        'rgba(255, 255, 255, 0.1)'}

                        borderRadius={'10px'}
                    >

                        <MenuButton as={Avatar} src={'https://picsum.photos/100/200'} borderRadius={'10px'} p={'5px'} height={'48px'} width={'48px'} />

                        <MenuList color={'black'}>
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

function DrawerExample({ routes }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <IconButton ref={btnRef} aria-label="Search database" icon={<HamburgerIcon />} variant={'ghost'} size={'lg'} colorScheme={'white'} onClick={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody>
                        <VStack  alignItems={'flex-start'} mt={'40px'}>
                            {routes?.map((route, index) => {
                                return (

                                    <NavLink  key={index} to={route.path} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active mobile" : ""}  onClick={onClose}
                                    >
                                        <Flex padding={'10px'} width={'100%'} justifyContent={'center'} alignItems={'center'} fontSize={'1.5rem'}>

                                            {route.label}
                                        </Flex>
                                    </NavLink>
                                )
                            })}




                            {/* <NavLink to="/admin/overview" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Overview</NavLink>
                        <NavLink to="/admin/fleet" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>My Fleet</NavLink> */}


                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default Topbar
