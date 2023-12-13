import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import {
    Flex, Image, Text, VStack, Card, Grid, GridItem, Heading, Input, Button, Table,
    Thead,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,

    InputGroup,
    Skeleton, SkeletonCircle, SkeletonText,
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

import DroneImg from '../../assets/uav-quadcopter.svg'
import dji from '../../assets/dji.png'



const Overview = () => {
    const { getAccessToken } = useAuthContext();

    const [drones, setDrones] = useState(null);
    const [droneData, setDroneData] = useState(null);
    const navigate = useNavigate();
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    useEffect(() => {
        getBasicUserInfo().then((info) => {
            console.log(info);
        });
        getdrones();

    }, []);
    const getDroneDetails = async (uuid) => {
        console.log(uuid);
        const response = await fetch(window.config.choreoApiUrl + '/drone/drones/' + uuid, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDroneData(data);
            })

    }

    const [isAllDronesLoading, setIsAllDronesLoading] = useState(true);
    const getdrones = async () => {
        setIsAllDronesLoading(true);
        const accessToken = await getAccessToken();
        console.log(accessToken);
        const response = await fetch(window.config.choreoApiUrl + '/drone/alldrones', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDrones(data);
                setIsAllDronesLoading(false);
            })
    }
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [selectedTab, setSelectedTab] = useState('1');



    return (
        <Card flexDirection={'row'} w={'99%'} height={'97%'} variant={'solid'} borderRadius={'10px'} border={'1px solid #C9C9C9'} backgroundColor={'C9C9C9'} >

            {/* <Grid height={'100%'} templateColumns="repeat(6, 1fr)" w={'100%'} gap={6} > */}

            <Flex overflowY={'auto'} maxHeight={'90vh'} backgroundColor={'white'} borderRadius={'10px'} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'}
                display={'flex'} flexDirection={'column'} height={'100%'} width={'33.33%'}
                colSpan={2} p={'20px'}
                borderRight={
                    '1px solid #E5E7EB'
                }>
                <Flex position={'sticky'} zIndex={99} top={0} backgroundColor={'white'} flexDirection={'column'} pb={'20px'}>

                    <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}>
                        <Heading >
                            <Text fontSize={'18px'}>Drones</Text>
                        </Heading>
                        <DroneRegister />
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

                    {
                        drones != null ? drones?.map((drone) => (
                            <Card cursor={'pointer'} onClick={() => {
                                setSelectedDrone(drone)
                                getDroneDetails(drone?.uuid);
                            }} key={drone?.id} p={'10px'} borderRadius={'10px'} backgroundColor={selectedDrone?.id === drone?.id ? 'white' : '#F3F4F6'} border={selectedDrone?.id === drone?.id ? '1px solid #006FF2' : '1px solid #F3F4F6'} >
                                <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} p={'10px'}>
                                    <Text>{drone?.name}</Text>
                                    <Tag colorScheme="grey">{drone?.status.toUpperCase()}</Tag>
                                </Flex>
                            </Card>
                        )) :
                            isAllDronesLoading ? (
                                <>
                                    <Card cursor={'pointer'} p={'10px'} borderRadius={'10px'} backgroundColor='white' border='1px solid #F3F4F6' >
                                        <Box flexDirection={'row'} p={'10px'}>
                                            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                                        </Box>
                                    </Card>
                                    <Card cursor={'pointer'} p={'10px'} borderRadius={'10px'} backgroundColor='white' border='1px solid #F3F4F6' >
                                        <Box flexDirection={'row'} p={'10px'}>
                                            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                                        </Box>
                                    </Card>
                                    <Card cursor={'pointer'} p={'10px'} borderRadius={'10px'} backgroundColor='white' border='1px solid #F3F4F6' >
                                        <Box flexDirection={'row'} p={'10px'}>
                                            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                                        </Box>
                                    </Card>
                                    <Card cursor={'pointer'} p={'10px'} borderRadius={'10px'} backgroundColor='white' border='1px solid #F3F4F6' >
                                        <Box flexDirection={'row'} p={'10px'}>
                                            <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                                        </Box>
                                    </Card>
                                </>
                            ) : (
                                <Flex height={'100%'} justifyContent="center" alignItems="center" color={'grey'}>
                                    No Drones have been added yet
                                </Flex>
                            )
                    }

                </Flex>
            </Flex>

            <GridItem flex={1} colSpan={4} height={'100%'} justifyContent={'center'} borderRadius={'10px'} alignItems={'center'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                {!selectedDrone ? (
                    <Flex flexDir={
                        'column'
                    } justifyContent={'center'} alignItems={'center'} height={'100%'} >

                        <Image src={DroneImg} width={'50%'} opacity={0.1} />
                        <Text>
                            Select a drone from the list to view its details
                        </Text>
                    </Flex>
                ) : selectedDrone && !droneData ? (
                    <Flex flexDir={
                        'column'
                    } justifyContent={'center'} alignItems={'center'} height={'100%'} >

                        <Image src={DroneImg} width={'50%'} opacity={0.1} />
                        <Text>
                            Loading
                        </Text>
                    </Flex>
                )
                    : (
                        <Flex flexDirection={'column'} height={'100%'} >
                            <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'} borderBottom={'1px solid #E5E7EB'} >
                                <Image src={dji} height={'250px'} width={'300px'} objectFit={'cover'} />
                                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>

                                    <Heading fontWeight={'300px'} ml={'10px'}>{selectedDrone.uid}</Heading>
                                    <Box>
                                        <Tag>{selectedDrone.status.toUpperCase()
                                        }</Tag>
                                    </Box>
                                </Flex>

                            </Flex>
                            <Flex flexDirection={'row'} flex={1} p={'0.5rem'} mt={'20px'} borderRadius={'10px'} gap={'10px'} >

                                <Flex flexDirection={'column'} gap={'20px'} backgroundColor={'white'} p={'1rem'} w={'100%'} >
                                    <Flex flexDirection={'row'} gap={'10px'}>
                                        <Flex flexDirection={'column'} gap={'10px'} width={'50%'}>

                                            <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} flex={1} gap={'10px'} p={'30px'}>
                                                <Flex flexDirection={'column'} gap={'0px'}>
                                                    <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Serial Number</Heading>
                                                    <Text ml={'10px'}>
                                                        {droneData?.serial}
                                                    </Text>
                                                </Flex>
                                                <Flex flexDirection={'column'} gap={'0px'}>
                                                    <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Model</Heading>
                                                    <Text ml={'10px'}>
                                                        {droneData?._model.name}
                                                    </Text>
                                                </Flex>
                                                <Flex flexDirection={'column'} gap={'0px'}>
                                                    <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Max Carry Weight</Heading>
                                                    <Text ml={'10px'}>
                                                        {droneData?._model.maxWeight} g
                                                    </Text>
                                                </Flex>

                                            </Flex>

                                            <Flex gap={'10px'}>

                                                <Button colorScheme={'blue'} mt={'auto'}>View Logs</Button>
                                                <Button colorScheme={'red'} mt={'auto'}>Remove</Button>
                                            </Flex>
                                        </Flex>
                                        <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} flex={1} gap={'10px'} p={'30px'}>
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
                                                        {droneData?.battery} %
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
            {/* </Grid> */}
        </Card>

    )
}


function DroneRegister() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modelData, setModelData] = useState(null);
    useEffect(() => {
        if (isOpen) {
            getModelDetails();
        }
    }, [isOpen]);
    const getModelDetails = async () => {
        const response = await fetch(window.config.choreoApiUrl + '/drone/models', {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setModelData(data);
            })
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme='purple'>+ Add Drones</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register a New Drone</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Flex flexDirection={'column'} gap={'10px'}>
                            <InputGroup flexDirection={'column'}>
                                <FormLabel>Drone Model</FormLabel>
                                <Select placeholder="Select Drone Model">
                                    <option value="option1">Mavic Mini</option>
                                    <option value="option2">Mavic Air</option>
                                    <option value="option3">Mavic Pro</option>
                                </Select>
                            </InputGroup>
                            <InputGroup flexDirection={'column'}>
                                <FormLabel>Drone Name</FormLabel>
                                <Input placeholder="eg: MAVIC" />
                            </InputGroup>
                            <InputGroup flexDirection={'column'}>
                                <FormLabel>Serial Number</FormLabel>
                                <Input placeholder="eg: SN_12345678" />
                            </InputGroup>
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Overview