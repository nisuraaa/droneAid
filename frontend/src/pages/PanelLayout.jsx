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
    Tfoot,
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
    const [selectedDrone, setSelectedDrone] = useState(null);


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

                    <Grid height={'100%'} templateColumns="repeat(5, 1fr)" w={'100%'} gap={6}>
                        <GridItem overflowY={'scroll'} maxHeight={'90vh'}
                            variant={'unstyled'} display={'flex'} flexDirection={'column'} height={'100%'}
                            colSpan={2} p={'20px'}
                            borderRight={
                                '1px solid #E5E7EB'
                            }>
                            <Flex position={'sticky'} top={0} backgroundColor={'white'} flexDirection={'column'} >

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
                            <Box
                                // Use 'auto' to show scrollbar only when needed

                                // backgroundColor={'#F3F4F6'}
                                height={'100%'}
                                flex={1}
                                // maxHeight={'calc(100vh - 13rem)'}  // Adjust the maxHeight as needed
                                p={'10px'}  // Add padding to the Box
                            >
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>UID</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dronelist.map((drone) => (
                                            <Tr key={drone.id} onClick={() => {
                                                setSelectedDrone(drone);
                                            }}>
                                                <Td>{drone.uid}</Td>
                                                <Td><Tag size={'sm'}>{drone.status}</Tag></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </GridItem>

                        <GridItem flex={1} colSpan={3} height={'100%'} justifyContent={'center'} alignItems={'center'} p={'40px'}>
                            {!selectedDrone ? (
                                <Flex flexDir={
                                    'column'
                                } justifyContent={'center'} alignItems={'center'} >

                                    <Image src={DroneImg} width={'50%'} opacity={0.1} />
                                    <Text>
                                        Select a drone from the list to view its details
                                    </Text>
                                </Flex>
                            ) : (
                                <Flex flexDirection={'column'}>
                                    <Flex flexDirection={'row'}>
                                        <Image src={dji} height={'300px'} width={'300px'} />
                                        <Flex flexDirection={'column'}>
                                            <Heading ml={'10px'}>{selectedDrone.uid}</Heading>
                                        </Flex>

                                    </Flex>
                                    <Flex backgroundColor={'#F0F0F1'} flexDirection={'row'} flex={1} p={'20px'} mt={'20px'} borderRadius={'10px'}>
                                        <Flex width={'78px'} flexDirection={'column'} flex={1} gap={'20px'}>
                                            f    {/* <Tabs>
                                            <TabList>
                                                <Tab>One</Tab>
                                                <Tab>Two</Tab>
                                                <Tab>Three</Tab>
                                            </TabList>

                                            <TabPanels>
                                                <TabPanel>
                                                    <p>one!</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p>two!</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p>three!</p>
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs> */}
                                        </Flex>
                                        <Flex width={'calc(100% - 78px);'} flexDirection={'column'} flex={1} gap={'20px'}>
                                            <Heading fontSize={'18px'}>Status</Heading>
                                            <Text>{selectedDrone.status}</Text>
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
