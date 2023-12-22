import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
    Flex, Image, Text, VStack, Card, Grid, GridItem, Heading, Input, Button, Table,
    Thead,
    Box,
    InputGroup,
    Tbody,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Select,
    Tfoot, Switch,
    FormLabel,
    Tr,
    Tag,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useAuthContext } from "@asgardeo/auth-react";
import Logo from '../assets/droneAid.png'
import Topbar from '../components/Topbar';
const PanelLayout = ({routes}) => {


   
    const [userInfo, setUserInfo] = useState(null);
    const { state, getBasicUserInfo, signOut } = useAuthContext();
   
    useEffect(() => {
        getBasicUserInfo().then((info) => {
            setUserInfo(info);
        });
    }, []);

    return (

        <Flex height={'100vh'} width={'100vw'} backgroundColor={'#424242'} justifyContent={'flex-start'} flexDirection={'column'} alignItems={'center'} >
            <Topbar routes={routes} />
            <Flex flex={1} width={'100%'}  alignItems={'center'} justifyContent={'center'} p={'0px 0px'}  >
                <Outlet />
            </Flex >
        </Flex >

    )
}

export default PanelLayout
