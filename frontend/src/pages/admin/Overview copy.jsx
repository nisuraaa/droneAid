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
    useMediaQuery,
    useToast,
    AlertDialog,
    Spinner,
    AlertDialogBody,
    IconButton,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
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
import './animation.css'
import { MdRefresh } from "react-icons/md";

import DroneImg from '../../assets/uav-quadcopter.svg'

import droneloader from '../../assets/drone-loader.svg'

import cruiserimg from '../../assets/dronemodels/cruiserw.webp'
import largeimg from '../../assets/dronemodels/largew.webp'
import lightimg from '../../assets/dronemodels/lightw.webp'
import middlew from '../../assets/dronemodels/middlew.webp'


const Overview = () => {

    const [isLargerThan480] = useMediaQuery('(min-width: 480px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { getAccessToken } = useAuthContext();
    // const [droneDataLoading, setDroneDataLoading] = useState(null);
    const [drones, setDrones] = useState([]);
    const [droneData, setDroneData] = useState([]);
    const navigate = useNavigate();
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    useEffect(() => {
        getBasicUserInfo().then((info) => {
            // console.log(info);
        });
        getdrones();

    }, []);
    const [isDroneInfoLoading, setIsDroneInfoLoading] = useState(true);

    const getDroneDetails = async (uuid) => {
        setIsDroneInfoLoading(true);
        const accessToken = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/drone/drones/' + uuid, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // setDroneData([]);
                setDroneData(data);
                setIsDroneInfoLoading(false);
            })

    }

    const [batteryloading, setBatteryLoading] = useState(false);
    const [isAllDronesLoading, setIsAllDronesLoading] = useState(true);
    const toggleCharge = async (uuid, charge) => {
        const accessToken = await getAccessToken();
        setBatteryLoading(true);
        console.log(accessToken);
        const response = await fetch(window.config.choreoApiUrl + '/drone/changestatus/', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "droneUUID": uuid,
                    "status": charge ? 'charging' : 'idle'
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {

                setDrones((prevDrones) => {
                    const updatedDrones = prevDrones.map((drone) =>
                        drone.uuid === uuid ? { ...drone, status: charge ? 'charging' : 'idle' } : drone
                    );
                    return updatedDrones;
                });
                setDroneData((prevDroneData) => {
                    const updatedDroneData = { ...prevDroneData, status: charge ? 'charging' : 'idle' };
                    return updatedDroneData;
                });
                setBatteryLoading(false);
            })
    }
    const [searchFilter, setSearchFilter] = useState('all');


    const getdrones = async (
        searchFilter = 'all'
    ) => {
        setIsAllDronesLoading(true);
        const accessToken = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/drone/alldrones/' + searchFilter, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setDrones(data);
                setIsAllDronesLoading(false);
            })
    }
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [selectedTab, setSelectedTab] = useState('1');


    return (
        <Card flexDirection={'row'} w={'99%'} height={'97%'} variant={'solid'} borderRadius={'10px'} backgroundColor={'C9C9C9'} >
            {
                !isLargerThan480 && (
                    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'100%'} width={'100%'} p={'0px'}>
                                {isDroneInfoLoading ? (
                                    <Flex flexDir={
                                        'column'
                                    } justifyContent={'center'} alignItems={'center'} height={'100%'} opacity={0.5}>

                                        <Image src={droneloader} width={'10%'} className='swing-in-left-bck' margin={'30px'} />
                                        <Text>
                                            Loading
                                        </Text>
                                    </Flex>
                                )
                                    : (
                                        <Flex flexDirection={'column'} height={'80vh'} >
                                            <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'} borderBottom={'1px solid #E5E7EB'} >
                                                <Image src={
                                                    droneData?._model?.modelID === 'LW' ? lightimg : droneData?._model?.modelID === 'MW' ? middlew : droneData?._model?.modelID === 'HW' ? largeimg : cruiserimg

                                                } height={'250px'} width={'300px'} objectFit={'contain'} />
                                                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>

                                                    <Heading fontWeight={'300px'} ml={'10px'}>{selectedDrone.uid}</Heading>
                                                    <Box>
                                                        <Tag>{droneData?.status.toUpperCase()
                                                        }</Tag>
                                                    </Box>
                                                </Flex>

                                            </Flex>
                                            <Flex flexDirection={'row'} flex={1} p={'0.5rem'} mt={'20px'} borderRadius={'10px'} gap={'10px'} >

                                                <Flex flexDirection={'column'} gap={'20px'} backgroundColor={'white'} p={'1rem'} w={'100%'} >
                                                    <Tabs>
                                                        <TabList>
                                                            <Tab>Information</Tab>
                                                            <Tab>Battery</Tab>
                                                        </TabList>

                                                        <TabPanels>
                                                            <TabPanel>
                                                                <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} flex={1} gap={'10px'} p={'30px'} minWidth={'79vw'}>

                                                                    <Flex flexDirection={'column'} gap={'0px'}>
                                                                        <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Serial Number</Heading>
                                                                        <Text ml={'10px'}>
                                                                            {droneData?.serial}
                                                                        </Text>
                                                                    </Flex>
                                                                    <Flex flexDirection={'column'} gap={'0px'}>
                                                                        <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Model</Heading>
                                                                        <Text ml={'10px'}>
                                                                            {droneData?._model?.name}
                                                                        </Text>
                                                                    </Flex>
                                                                    <Flex flexDirection={'column'} gap={'0px'}>
                                                                        <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Max Carry Weight</Heading>
                                                                        <Text ml={'10px'}>
                                                                            {droneData?._model?.maxWeight} g
                                                                        </Text>
                                                                    </Flex>


                                                                    <Flex gap={'10px'}>

                                                                        <LogModal uuid={droneData?.uuid} />
                                                                        <DeleteDialog setSelectedDrone={setSelectedDrone} selectedDrone={selectedDrone} getdrones={getdrones} uuid={droneData?.uuid} setDroneData={setDroneData} />
                                                                    </Flex>
                                                                </Flex>

                                                            </TabPanel>
                                                            <TabPanel>
                                                                <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} flex={1} gap={'10px'} p={'30px'} w={'100%'} h={'100%'} minWidth={'79vw'}>

                                                                    {!batteryloading ? (
                                                                        <>
                                                                            <Flex flexDirection={'row'} borderRadius={'10px'} flex={1} gap={'10px'}>

                                                                                <Flex flexDirection={'column'} width={'50%'} gap={'10px'}>
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
                                                                                <Flex flexDirection={'column'} gap={'10px'} width={'5   0%'}>
                                                                                    <Text>
                                                                                        {droneData?.battery} %
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {
                                                                                            droneData?.status === 'charging' ? 'Charging' : 'Discharging'
                                                                                        }
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {droneData?.lastCharged.split('T')[0] + ' ' + droneData?.lastCharged.split('T')[1].split('.')[0]}
                                                                                    </Text>
                                                                                </Flex>
                                                                            </Flex>
                                                                        </>
                                                                    ) : (
                                                                        <Flex flex={1} justifyContent={'center'} alignItems={'center'}>

                                                                            <Spinner />
                                                                        </Flex>
                                                                    )
                                                                    }
                                                                    <Button mt={'10px'} colorScheme={droneData?.status === 'charging' ? 'yellow' : 'whatsapp'} isLoading={batteryloading}
                                                                        isDisabled={droneData?.status === 'idle' || droneData?.status === 'charging' ? false : true}
                                                                        onClick={
                                                                            () => {
                                                                                toggleCharge(droneData?.uuid, droneData?.status === 'idle' ? true : false)
                                                                            }
                                                                        }
                                                                    >
                                                                        {
                                                                            droneData?.status === 'charging' ? 'Stop Charging' : 'Start Charging'
                                                                        }
                                                                    </Button>
                                                                    <Text fontSize={'12px'} color={'grey'}>
                                                                        Charge mode can only be enabled when drone is idle
                                                                    </Text>
                                                                </Flex>

                                                            </TabPanel>

                                                        </TabPanels>
                                                    </Tabs>



                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )}
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }

            {/* <Grid height={'100%'} templateColumns="repeat(6, 1fr)" w={'100%'} gap={6} > */}

            <Flex overflowY={'auto'} maxHeight={'90vh'} backgroundColor={'white'} borderRadius={isLargerThan480 ? '10px' : '20px'} borderTopRightRadius={isLargerThan480 ? '0px' : '20px'} borderBottomRightRadius={isLargerThan480 ? '0px' : '20px'}
                display={'flex'} flexDirection={'column'} height={'100%'} width={isLargerThan480 ? '33.33%' : '100%'}
                colSpan={2} p={'20px'}
                borderRight={
                    '1px solid #E5E7EB'
                }>
                <Flex position={'sticky'} zIndex={99} top={0} backgroundColor={'white'} flexDirection={'column'} pb={'20px'}>

                    <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}>
                        <Heading >
                            <Text fontSize={'18px'}>Drones</Text>
                        </Heading>
                        <DroneRegister getDrones={getdrones} />
                    </Flex>

                    <Flex gap={'5px'}>
                        <InputGroup width={'100%'}>

                            <Select width={'100%'} onChange={(e) => {
                                setSearchFilter(e.target.value);
                                getdrones(e.target.value);
                            }}
                                value={searchFilter}
                            >
                                <option value="all">All</option>
                                <option value="idle">Idle</option>
                                <option value="charging">Charging</option>
                                <option value="delivering">Delivering</option>
                                <option value="delivered">Delivered</option>
                                <option value="returning">Returning</option>
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

                    {!isAllDronesLoading ? (

                        drones.length > 0 ? drones?.map((drone) => (
                            <Card cursor={'pointer'} onClick={() => {
                                setSelectedDrone(drone)
                                getDroneDetails(drone.uuid);
                                !isLargerThan480 && onOpen();
                            }} key={drone.uuid} p={'10px'} borderRadius={'10px'} backgroundColor={selectedDrone?.uuid === drone.uuid ? 'white' : '#F3F4F6'} border={selectedDrone?.uuid === drone?.uuid ? '1px solid #006FF2' : '1px solid #F3F4F6'} >
                                <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} p={'5px'}>
                                    <Text>{drone?.name}</Text>
                                    <Flex gap={'10px'}>
                                        <Tag colorScheme={drone?.status === 'idle' ? 'green' : drone?.status === 'charging' ? 'yellow' : 'red '}
                                        >{drone?.status.toUpperCase()}</Tag>
                                        <Tag colorScheme='messenger' fontSize={'16px'}>{drone?.battery}</Tag>
                                    </Flex>
                                </Flex>
                            </Card>
                        )) : (
                            <Flex height={'100%'} justifyContent="center" alignItems="center" color={'grey'}>
                                No Drones have been added yet
                            </Flex>
                        )
                    ) : (
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
                            <Card cursor={'pointer'} p={'10px'} borderRadius={'10px'} backgroundColor='white' border='1px solid #F3F4F6' >
                                <Box flexDirection={'row'} p={'10px'}>
                                    <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                                </Box>
                            </Card>
                        </>

                    )
                    }

                </Flex>
            </Flex>
            {
                isLargerThan480 && (

                    <GridItem flex={1} colSpan={4} height={'100%'} justifyContent={'center'} borderRadius={'10px'} alignItems={'center'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                        {!selectedDrone ? (
                            <Flex flexDir={
                                'column'
                            } justifyContent={'center'} alignItems={'center'} height={'100%'} >

                                <Image src={DroneImg} width={'50%'} opacity={0.1} />
                                <Text>
                                    Select a drone from the list to view its details
                                </Text>
                            </Flex>
                        ) : isDroneInfoLoading ? (
                            <Flex flexDir={
                                'column'
                            } justifyContent={'center'} alignItems={'center'} height={'100%'} opacity={0.5}>

                                <Image src={droneloader} width={'10%'} className='swing-in-left-bck' margin={'30px'} />
                                <Text>
                                    Loading
                                </Text>
                            </Flex>
                        )
                            : (
                                <Flex flexDirection={'column'} height={'100%'} >
                                    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'} borderBottom={'1px solid #E5E7EB'} >
                                        <Image src={
                                            droneData?._model?.modelID === 'LW' ? lightimg : droneData?._model?.modelID === 'MW' ? middlew : droneData?._model?.modelID === 'HW' ? largeimg : cruiserimg

                                        } height={'250px'} width={'300px'} objectFit={'contain'} />
                                        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>

                                            <Heading fontWeight={'300px'} ml={'10px'}>{selectedDrone.uid}</Heading>
                                            <Box>
                                                <Tag>{droneData?.status.toUpperCase()
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
                                                                {droneData?._model?.name}
                                                            </Text>
                                                        </Flex>
                                                        <Flex flexDirection={'column'} gap={'0px'}>
                                                            <Heading fontWeight={'700'} fontSize={'10px'} ml={'10px'}>Max Carry Weight</Heading>
                                                            <Text ml={'10px'}>
                                                                {droneData?._model?.maxWeight} g
                                                            </Text>
                                                        </Flex>

                                                    </Flex>

                                                    <Flex gap={'10px'}>

                                                        <LogModal uuid={droneData?.uuid} />
                                                        <DeleteDialog setSelectedDrone={setSelectedDrone} getdrones={getdrones} uuid={droneData?.uuid} setDroneData={setDroneData} />
                                                    </Flex>
                                                </Flex>
                                                <Flex flexDirection={'column'} border={'1px solid #E5E7EB'} borderRadius={'10px'} flex={1} gap={'10px'} p={'30px'} w={'50%'} h={'100%'}>
                                                    {!batteryloading ? (
                                                        <>
                                                            <Flex flexDirection={'row'} borderRadius={'10px'} flex={1} gap={'10px'}>

                                                                <Flex flexDirection={'column'} width={'50%'} gap={'10px'}>
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
                                                                <Flex flexDirection={'column'} gap={'10px'} width={'5   0%'}>
                                                                    <Text>
                                                                        {droneData?.battery} %
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            droneData?.status === 'charging' ? 'Charging' : 'Discharging'
                                                                        }
                                                                    </Text>
                                                                    <Text>
                                                                        {droneData?.lastCharged.split('T')[0] + ' ' + droneData?.lastCharged.split('T')[1].split('.')[0]}
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </>
                                                    ) : (
                                                        <Flex flex={1} justifyContent={'center'} alignItems={'center'}>

                                                            <Spinner />
                                                        </Flex>
                                                    )
                                                    }
                                                    <Button mt={'10px'} colorScheme={droneData?.status === 'charging' ? 'yellow' : 'whatsapp'} isLoading={batteryloading}
                                                        isDisabled={droneData?.status === 'idle' || droneData?.status === 'charging' ? false : true}
                                                        onClick={
                                                            () => {
                                                                toggleCharge(droneData?.uuid, droneData?.status === 'idle' ? true : false)
                                                            }
                                                        }
                                                    >
                                                        {
                                                            droneData?.status === 'charging' ? 'Stop Charging' : 'Start Charging'
                                                        }
                                                    </Button>
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
                )}
            {/* </Grid> */}
        </Card>

    )
}


function DroneRegister({ getDrones }) {
    const { getAccessToken } = useAuthContext();

    const toast = useToast()
    const [serial, setSerial] = useState(null);
    const [model, setModel] = useState([]);
    const [name, setName] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modelData, setModelData] = useState([]);
    useEffect(() => {
        if (isOpen) {
            getModelDetails();
        }
    }, [isOpen]);
    const getModelDetails = async () => {
        try {
            const accessToken = await getAccessToken();
            const response = await fetch(window.config.choreoApiUrl + '/drone/models', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // check if server returns an error
                    if (data.error_message) {
                        toast({
                            title: 'Error',
                            description: data?.error?.message,
                            position: 'bottom-right',
                            status: 'error',
                            duration: 5000,
                            // isClosable: true,
                        });
                        return;
                    } else {

                        setModelData(data);
                    }
                })
        }
        catch (e) {
            console.log(e);

        }
    }

    const handleSubmit = async () => {
        // validation goes here
        // console.log(serial, model, name);
        if (!serial || !model || !name) {
            toast({
                title: 'Error',
                description: 'Please fill all the fields',
                position: 'bottom-right',
                status: 'error',
                duration: 5000,
                // isClosable: true,
            });
            return;
        }
        if (serial.length < 8) {
            toast({
                title: 'Error',
                description: 'Serial Number should be atleast 8 characters long',
                position: 'bottom-right',
                status: 'error',
                duration: 5000,
                // isClosable: true,
            });
            return;
        }

    };

    // const onSubmit = async () => {
    //     const accessToken = await getAccessToken();
    //     const response = await fetch(window.config.choreoApiUrl + '/drone/register', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer ' + accessToken,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(

    //             {
    //                 "serial": serial,
    //                 "model": model,
    //                 "name": name
    //             }
    //         )
    //     })
    //         .then((response) => {
    //             // console.log(response.status)
    //             if (response.status == 200) {

    //                 onClose();
    //                 toast({
    //                     title: 'Drone Registered Successfully .',
    //                     // description: "We've created your account for you.",
    //                     position: 'bottom-right',
    //                     status: 'success',
    //                     duration: 5000,
    //                     // isClosable: true,
    //                 });
    //                 getDrones();
    //             }
    //         })


    // }

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
                                    <Select placeholder="Select Drone Model" onChange={(e) => setModel(e.target.value)}>
                                        {
                                            modelData?.map((model) => (
                                                <option key={model?.modelID} value={model?.modelID}>{model?.name}</option>
                                            ))
                                        }
                                    </Select>
                                </InputGroup>
                                <InputGroup flexDirection={'column'}>
                                    <FormLabel>Drone Name</FormLabel>
                                    <Input placeholder="eg: MAVIC" onChange={(e) => setName(e.target.value)} />
                                </InputGroup>
                                <InputGroup flexDirection={'column'}>
                                    <FormLabel>Serial Number</FormLabel>
                                    <Input placeholder="eg: SN_12345678" onChange={(e) => setSerial(e.target.value)} />
                                </InputGroup>
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter >
                        <Button onClick={onClose} mr={'5px'} >Close</Button>
                        <Button onClick={handleSubmit} variant='solid' colorScheme='messenger'>Add</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteDialog({ uuid, getdrones, setDroneData, setSelectedDrone, selectedDrone }) {
    const { getAccessToken } = useAuthContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()

    const deleteFn = async () => {
        const [accessToken] = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/drone/drones/' + uuid, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    toast({
                        title: 'Drone Deleted',
                        position: 'bottom-right',
                        status: 'error',
                        duration: 5000,
                        // isClosable: true,
                    });
                    onClose();
                    getdrones();
                    setSelectedDrone(null);
                    setDroneData(null);
                }
            })
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen} isDisabled={selectedDrone?.status === 'idle' ? false : true}>
                Remove
            </Button>

            <AlertDialog
                motionPreset='slideInBottom'
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Drone
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={
                                () => {
                                    deleteFn();
                                }
                            } colorScheme='red' ml={3} isDisabled={selectedDrone?.status === 'idle' ? false : true}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

function LogModal(
    {
        uuid
    }
) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLargerThan480 } = useMediaQuery('(min-width: 480px)')
    useEffect(() => {
        if (isOpen) {
            getLogs(uuid);
        }
    }, [isOpen]);
    const getAccessToken = useAuthContext()
    const [logs, setLogs] = useState([]);

    const getLogs = async (uuid) => {
        try {
            // const accessToken = await getAccessToken();
            const response = await fetch(window.config.choreoApiUrl + '/drone/logs/' + uuid, {
                method: 'GET',
                headers: {
                    // 'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setLogs(data);

                })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <Button onClick={onOpen}>View Log</Button>

            <Modal isOpen={isOpen} onClose={onClose} variant={isLargerThan480 ? 'reviewModal' : 'null'} height={isLargerThan480 ? '80vh' : '100vh'} size={isLargerThan480 ? 'xl' : 'full'} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} alignItems={'center'} gap={'10px'}><Text>
                        Drone Logs
                    </Text>
                        <IconButton icon={<MdRefresh />} onClick={
                            () => {
                                getLogs(uuid)
                            }
                        }
                        />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box overflow={'auto'} maxHeight={isLargerThan480 ? '60vh' : '80vh'} >

                            <Table variant="simple">
                                <Thead position={'sticky'} top={0} zIndex={99} backgroundColor={'white'}>
                                    <Tr>
                                        <Th>Time</Th>
                                        <Th>Event</Th>
                                        <Th>Description</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {logs?.map((log) => (
                                        <Tr key={log?.id}>
                                            <Td>{log?.timestamp.split('T')[0] + ' ' + log?.timestamp.split('T')[1].split('.')[0]}</Td>
                                            <Td>{log?.event}</Td>
                                            <Td>{log?.description}</Td>
                                        </Tr>
                                    )
                                    )}
                                </Tbody>

                            </Table>
                        </Box>

                    </ModalBody>

                    <ModalFooter>
                        <Text><b>{logs.length}</b> Entries Recorded</Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
function DetailModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Lorem count={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Overview