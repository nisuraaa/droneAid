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
import DroneImg from '../assets/uav-quadcopter.svg'
import dji from '../assets/dji.png'
const PanelLayout = () => {
    const dronelist = [
        {
            id: 1,
            uid: 'LIGHTWEIGHT-DRONE-1',
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

    const tabs = [
        {
            id: 1,
            name: 'Information'
        },
        {
            id: 2,
            name: 'Battery'
        },
        {
            id: 3,
            name: 'History'
        },
        {
            id: 4,
            name: 'Settings'
        }
    ]
    const [userInfo, setUserInfo] = useState(null);
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [selectedTab, setSelectedTab] = useState('1');


    useEffect(() => {
        getBasicUserInfo().then((info) => {
            setUserInfo(info);
        });
    }, []);

    return (

        <Flex height={'100vh'} width={'100vw'} backgroundColor={'#F3F4F6'} justifyContent={'flex-start'} flexDirection={'column'} alignItems={'center   '} >
            <Topbar />
            <Flex flex={1} width={'100%'} mt={'0px'} backgroundColor={'#F1F1F1'} alignItems={'center'} justifyContent={'space-between'} p={'0px 0px'}  >
                <Card w={'100%'} height={'100%'} variant={'solid'} >

                    <Grid height={'100%'} templateColumns="repeat(6, 1fr)" w={'100%'} gap={6}>
                        <GridItem overflowY={'auto'} maxHeight={'90vh'}
                            variant={'unstyled'} display={'flex'} flexDirection={'column'} height={'100%'}
                            colSpan={2} p={'20px'}
                            borderRight={
                                '1px solid #E5E7EB'
                            }>
                            <Flex position={'sticky'} zIndex={99} top={0} backgroundColor={'white'} flexDirection={'column'} >

                                <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}>
                                    <Heading >
                                        <Text fontSize={'18px'}>Drones</Text>
                                    </Heading>
                                    <Button colorScheme='blue'>Add Drone</Button>
                                </Flex>

                                <Flex gap={'5px'}>
                                    <Input width={'70%'} placeholder="Search" />
                                    <InputGroup width={'30%'}>

                                        <Select >
                                            <option value="option1">Status</option>
                                            <option value="option2">UID</option>
                                        </Select>
                                    </InputGroup>


                                </Flex>
                            </Flex>
                            <Flex flexDirection={'column'} gap={'10px'} overflowY={'scroll'}
                                // Use 'auto' to show scrollbar only when needed

                                // backgroundColor={'#F3F4F6'}
                                height={'100%'}
                                flex={1}

                                // maxHeight={'calc(100vh - 13rem)'}  // Adjust the maxHeight as needed
                                p={'10px'}  // Add padding to the Box
                            >
                                {dronelist.map((drone) => (
                                    <Card cursor={'pointer'} onClick={() => setSelectedDrone(drone)} key={drone.id} p={'10px'} borderRadius={'10px'} backgroundColor={selectedDrone?.id === drone.id ? 'white' : '#F3F4F6'} border={selectedDrone?.id === drone.id ? '1px solid #006FF2' : '1px solid #F3F4F6'} >
                                        <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} p={'10px'}>
                                            <Text>{drone.uid}</Text>
                                            <Tag colorScheme="green">{drone.status}</Tag>
                                        </Flex>
                                    </Card>
                                ))}
                            </Flex>
                        </GridItem>

                        <GridItem flex={1} colSpan={4} height={'100%'} justifyContent={'center'} alignItems={'center'} p={'20px'}>
                            {!selectedDrone ? (
                                <Flex flexDir={
                                    'column'
                                } justifyContent={'center'} alignItems={'center'} height={'100%'} >

                                    <Image src={DroneImg} width={'50%'} opacity={0.1} />
                                    <Text>
                                        Select a drone from the list to view its details
                                    </Text>
                                </Flex>
                            ) : (
                                <Flex flexDirection={'column'} height={'100%'} >
                                    <Flex flexDirection={'row'}>
                                        <Image src={dji} height={'200px'} width={'300px'} objectFit={'cover'} />
                                        <Flex flexDirection={'column'}>
                                            <Heading fontWeight={'300px'} ml={'10px'}>{selectedDrone.uid}</Heading>
                                        </Flex>

                                    </Flex>
                                    <Flex border={' 1px solid #E5E7EB'} flexDirection={'row'} flex={1} p={'0.5rem'} mt={'20px'} borderRadius={'10px'} gap={'10px'} >

                                        <Flex flexDirection={'column'} gap={'20px'} backgroundColor={'white'} p={'1rem'} w={'100%'} >
                                            <Flex flexDirection={'row'} gap={'10px'}>
                                                <Flex flexDirection={'column'}>

                                                    <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} p={'10px'} flex={1} gap={'10px'} p={'30px'}>
                                                        <Flex flexDirection={'column'} gap={'0px'}>
                                                            <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Information</Heading>
                                                            <Text ml={'10px'}>#12312131234324</Text>
                                                        </Flex>
                                                        <Flex flexDirection={'column'} gap={'0px'}>
                                                            <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Max Carry Weight</Heading>
                                                            <Text ml={'10px'}>500g</Text>
                                                        </Flex>

                                                    </Flex>

                                                    <Flex gap={'10px'}>

                                                        <Button colorScheme={'blue'} mt={'auto'}>View Logs</Button>
                                                        <Button colorScheme={'red'} mt={'auto'}>Remove</Button>
                                                    </Flex>
                                                </Flex>
                                                <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} p={'10px'} flex={1} gap={'10px'} p={'30px'}>
                                                    <Flex flexDirection={'row'} borderRadius={'10px'} flex={1} gap={'10px'}>

                                                        <Flex flexDirection={'column'} width={'70%'} gap={'10px'}>
                                                            <Text>
                                                                Battery Level
                                                            </Text>
                                                            <Text>
                                                                Battery Status
                                                            </Text>
                                                            <Text>
                                                                Last Charged
                                                            </Text>
                                                        </Flex>
                                                        <Flex flexDirection={'column'} gap={'10px'} width={'30%'}>
                                                            <Text>
                                                                50%
                                                            </Text>
                                                            <Text>
                                                                Discharging
                                                            </Text>
                                                            <Text>
                                                                2 Hours Ago
                                                            </Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Button mt={'10px'} colorScheme={'whatsapp'}>Charge</Button>
                                                    <Text fontSize={'12px'} color={'grey'}>
                                                        Charge mode can only be enabled when drone is idle
                                                    </Text>
                                                </Flex>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                </Flex>
                            )}
                        </GridItem>
                    </Grid>
                </Card>
            </Flex >
        </Flex >

    )
}

export default PanelLayout
