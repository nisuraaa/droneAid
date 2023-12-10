import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
    Flex, Image, Text, VStack, Card, Grid, GridItem, Heading, Input, Button, Table,
    Thead,
    Box,
    Tbody,
    Tfoot,
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
import DroneImg from '../assets/uav-quadcopter.svg'
const PanelLayout = () => {
    const dronelist = [
        {
            id: 1,
            uid: 'drone1',
            status: 'Idle'
        },
        {
            id: 2,
            uid: 'drone2',
            status: 'online'
        },
        {
            id: 3,
            uid: 'drone3',
            status: 'online'
        },
        {
            id: 4,
            uid: 'drone4',
            status: 'online'
        },
        {
            id: 5,
            uid: 'drone5',
            status: 'online'
        },
        {
            id: 6,
            uid: 'drone6',
            status: 'online'
        },
        {
            id: 7,
            uid: 'drone7',
            status: 'online'
        },
        {
            id: 8,
            uid: 'drone8',
            status: 'online'
        },
        {
            id: 9,
            uid: 'drone9',
            status: 'online'
        },
        {
            id: 10,
            uid: 'drone10',
            status: 'online'
        },
        {
            id: 11,
            uid: 'drone11',
            status: 'online'
        },
        {
            id: 12,
            uid: 'drone12',
            status: 'online'
        },
        {
            id: 13,
            uid: 'drone13',
            status: 'online'
        },
        {
            id: 14,
            uid: 'drone14',
            status: 'online'
        },
        {
            id: 15,
            uid: 'drone15',
            status: 'online'
        },
        {
            id: 16,
            uid: 'drone16',
            status: 'online'
        },
        {
            id: 17,
            uid: 'drone17',
            status: 'online'
        },
        {
            id: 18,
            uid: 'drone18',
            status: 'online'
        },
        {
            id: 19,
            uid: 'drone19',
            status: 'online'
        },
        {
            id: 20,
            uid: 'drone20',
            status: 'online'
        },
        {
            id: 21,
            uid: 'drone21',
            status: 'online'
        }
    ];
    const [userInfo, setUserInfo] = useState(null);
    const { state, getBasicUserInfo, signOut } = useAuthContext();


    useEffect(() => {
        getBasicUserInfo().then((info) => {
            setUserInfo(info);
        });
    }, []);

    return (

        <Flex height={'100vh'} width={'100vw'} backgroundColor={'#F3F4F6'} justifyContent={'center'} flexDirection={'column'} alignItems={'center   '} >
            <Topbar />
            <Flex flex={1} width={'100%'} mt={'0px'} backgroundColor={'#F1F1F1'} justifyContent={'space-between'} p={'0px 0px'} alignItems={'center'} >
                <Card w={'100%'} height={'95%'} variant={'solid'} >

                    <Grid height={'100%'} templateColumns="repeat(5, 1fr)" w={'100%'} gap={6}>
                        <GridItem variant={'unstyled'}
                            flex={1} colSpan={2} p={'40px'}
                            borderRight={
                                '1px solid #E5E7EB'
                            }
                        >
                            <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}
                            >

                                <Heading >
                                    <Text fontSize={'18px'}>Drones</Text>
                                </Heading>
                                <Button colorScheme='blue'
                                >Add Drone</Button>
                            </Flex>
                            <Input placeholder="Search" />

                        </GridItem>

                        <GridItem flexDir={
                            'column'
                        } display={'flex'} flex={1} colSpan={3} height={'100%'} justifyContent={'center'} alignItems={'center'} p={'40px'}>
                            <Image src={DroneImg} width={'50%'} opacity={0.1} />
                            <Text>
                                Select a drone from the list to view its details
                            </Text>

                        </GridItem>
                    </Grid>
                </Card>
            </Flex >
        </Flex >

    )
}

export default PanelLayout
