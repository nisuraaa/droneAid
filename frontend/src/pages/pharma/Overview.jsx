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
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    CardHeader,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
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
    const steps = [
        { title: 'Select Medicinal Items', description: 'Select Medicinal Items' },
        { title: 'Select a drone ', description: 'Select the appropraite drone' },
        { title: 'Enter Delivery Details', description: 'Enter the necessary delivery details' },
    ]
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    const { getAccessToken } = useAuthContext();
    const [pageNo, setPageNo] = useState(1);
    const next = () => {
        if (pageNo < 3)
            setActiveStep(activeStep + 1);
        setPageNo(pageNo + 1);
    }
    const prev = () => {
        if (pageNo > 1)
            setActiveStep(activeStep - 1);
        setPageNo(pageNo - 1);
    }
    const navigate = useNavigate();
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    const [totalWeight, setTotalWeight] = useState(0);
    const [droneCart, setDroneCart] = useState([]);
    const [selectedDrone, setSelectedDrone] = useState(null);


    const calcWeight = () => {
        setTotalWeight(droneCart.reduce((a, b) => a + (b['weight'] * b['quantity']), 0))
    }
    useEffect(() => {

        calcWeight();


    }, [
        droneCart
    ]);

    const meds = [
        { name: 'Med 1', weight: 10, code: "A0001" },
        { name: 'Med 2', weight: 20, code: "A0002" },
        { name: 'Med 3', weight: 30, code: "A0003" },
        { name: 'Med 3', weight: 30, code: "A0003" },
        { name: 'Med 3', weight: 30, code: "A0003" },
        { name: 'Med 3', weight: 30, code: "A0003" },
        { name: 'Med 4', weight: 40, code: "A0004" },
        { name: 'Med 5', weight: 50, code: "A0005" },
    ]

    const availableDrones = [
        { name: 'Drone', model: 'Curiser', 'UUID': '1', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '2', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '3', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '4', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '5', 'status': 'Available' },
        { name: 'Drone', model: 'Curiser', 'UUID': '6', 'status': 'Available' },

    ]




    return (
        <Card flexDirection={'row'} w={'99%'} height={'97%'} variant={'solid'} borderRadius={'10px'} border={'1px solid #C9C9C9'} backgroundColor={'C9C9C9'} >

            {/* <Grid height={'100%'} templateColumns="repeat(6, 1fr)" w={'100%'} gap={6} > */}
            <Flex
                display={'flex'} flexDirection={'column'} height={'100%'} width={'20%'}
                colSpan={2} p={'20px'}
                alignContent={'center'}
                justifyContent={'center'}
            >
                <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

            </Flex>
            {pageNo == 1 ? (
                <>
                    <Flex overflowY={'auto'} maxHeight={'90vh'} backgroundColor={'white'} borderRadius={'10px'} borderBottomRightRadius={'0px'} borderTopRightRadius={'0px'}
                        display={'flex'} flexDirection={'column'} height={'100%'} width={'40%'}
                        colSpan={2} p={'20px'}
                        borderRight={
                            '1px solid #E5E7EB'
                        }>
                        <Flex position={'sticky'} zIndex={99} top={0} backgroundColor={'white'} flexDirection={'column'} pb={'20px'}>

                            <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}>
                                <Heading >
                                    <Text fontSize={'18px'}>Medicine</Text>
                                </Heading>
                            </Flex>

                            <Flex gap={'5px'}>
                                <Input width={'70%'} placeholder="Search" />
                                <InputGroup width={'30%'}>

                                    <Select >
                                        <option value="option1">Code</option>
                                        <option value="option2">Name</option>
                                        <option value="option2">Weight</option>
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
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Code</Th>
                                        <Th>Name</Th>
                                        <Th>Weight</Th>
                                        <Th>Add</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {
                                        meds.map((med) => (
                                            <><Tr>

                                                <Td>{med.code}</Td>
                                                <Td>{med.name}</Td>
                                                <Td>{med.weight}</Td>
                                                <Td><Button onClick={
                                                    () => {
                                                        if (droneCart.some(item => item.code === med.code)) {
                                                            // update quantity
                                                            setDroneCart(droneCart.map(item => item.code === med.code ? { ...item, quantity: item.quantity + 1 } : item))
                                                        } else {
                                                            // add med with quantity 1
                                                            setDroneCart([...droneCart, { ...med, quantity: 1 }])
                                                        }

                                                    }
                                                } colorScheme={'messenger'}>+</Button></Td>
                                            </Tr>
                                            </>
                                        ))
                                    }

                                </Tbody>
                            </Table>

                        </Flex>
                    </Flex>

                    <GridItem flex={1} colSpan={4} height={'100%'} justifyContent={'center'} borderRadius={'10px'} alignItems={'center'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} w={'40%'}>
                        <Text>
                            Max Weight Supported is 500g
                        </Text>
                        {droneCart.length > 0 ? (

                            droneCart.map((item) => (

                                <Flex flexDirection={'column'} gap={'10px'}>
                                    <Text fontSize={'18px'} fontWeight={'bold'}>{item.name}</Text>
                                    <Text fontSize={'14px'} fontWeight={'bold'}>Weight: {item.weight}</Text>
                                    <Text fontSize={'14px'} fontWeight={'bold'}>Quantity: {item.quantity}</Text>

                                    <Button onClick={
                                        () => {
                                            setDroneCart(droneCart.filter((med) => med.code !== item.code))
                                        }
                                    } colorScheme={'red'}>Remove</Button>

                                </Flex>



                            )
                            ))
                            : (
                                <Text> No Items have been added to the cart</Text>)
                        }
                        <Text>
                            Total Weight: {droneCart.reduce((a, b) => a + (b['weight'] * b['quantity']), 0)}
                        </Text>
                        <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                            next()
                        }}>
                            Next
                        </Button>

                    </GridItem>
                </>
            ) : pageNo == 2 ? (
                <>

                    <Card flex={1} colSpan={4} height={'100%'} position={'relative'} justifyContent={'center'} borderRadius={'10px'} alignItems={'flex-start'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                        <Flex flexDirection={'column'}>

                            <Text>Available Drones</Text>
                            <Text>You are recommended to use <b>Lightweight</b> for your current order</Text>
                        </Flex>
                        <Grid flex={1} flexWrap={'wrap'} width={'100%'} borderRadius={'10px'} gap={'10px'} backgroundColor={'#E5E7EB'} gridTemplateColumns="repeat(4, 1fr)" p={'20px'} overflow={'auto'} maxHeight={'70vh'} gridTemplateRows="repeat(3, 1fr)" border={'1px solid #828282'} >
                            {availableDrones.map((drone) => (
                                <Card key={drone.UUID} alignSelf={'flex-start'} padding={'20px'} onClick={() => {
                                    if (selectedDrone?.UUID == drone.UUID) {
                                        setSelectedDrone(null);
                                    } else {
                                        setSelectedDrone(drone);
                                    }
                                }} border={selectedDrone?.UUID == drone.UUID ? '2px solid #4C51BF' : '1px solid #E5E7EB'} borderRadius={'10px'} backgroundColor={'white'} flexDirection={'column'} gap={'10px'} width={'100%'} height={'100%'}>

                                    <Text fontSize={'18px'} fontWeight={'bold'}>{drone.name}</Text>
                                    <Text fontSize={'14px'} fontWeight={'bold'}>Model: {drone.model}</Text>
                                    <Text fontSize={'14px'} fontWeight={'bold'}>UUID: {drone.UUID}</Text>
                                    <Text fontSize={'14px'} fontWeight={'bold'}>Status: {drone.status}</Text>


                                </Card>
                            ))}
                        </Grid>
                        <Flex position={'relative'} bottom={0} gap={'10px'}>

                            <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                prev()
                            }}>
                                Previous
                            </Button>
                            <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                next()
                            }}>
                                Next
                            </Button>
                        </Flex>

                    </Card>
                </>
            ) : (
                <>


                    <Card flex={1} colSpan={4} height={'100%'} position={'relative'} justifyContent={'flex-start'} borderRadius={'10px'} alignItems={'flex-start'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >

                        <Heading>
                            Enter Delivery Details
                        </Heading>
                        <Flex flexDirection={'column'} gap={'20px'} width={'100%'} p={'20px'}>
                            <Flex gap={'10px'}>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder="eg: 123, Main Street" />
                                </InputGroup>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder="eg: 123, Main Street" />
                                </InputGroup>
                            </Flex>
                            <Flex gap={'10px'}>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>Address Line 1</FormLabel>
                                    <Input placeholder="eg: 123, Main Street" />
                                </InputGroup>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>Address Line 2</FormLabel>
                                    <Input placeholder="eg: Colombo" />
                                </InputGroup>
                            </Flex>
                            <Flex gap={'10px'}>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>City</FormLabel>
                                    <Input placeholder="eg: 123, Main Street" />
                                </InputGroup>

                            </Flex>
                            <Flex gap={'10px'}>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>Mobile No.</FormLabel>
                                    <Input placeholder="eg: 123, Main Street" />
                                </InputGroup>
                                <InputGroup flexDirection={'column'} width={'50%'} >
                                    <FormLabel>E-Mail Address</FormLabel>
                                    <Input placeholder="eg: Colombo" />
                                </InputGroup>
                            </Flex>

                        </Flex>
                        <Flex position={'relative'} bottom={0} gap={'10px'}>

                            <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                prev()
                            }}>
                                Previous
                            </Button>
                            <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                next()
                            }}>
                                Next
                            </Button>
                        </Flex>

                    </Card>
                </>
            )}
        </Card>

    )
}


function DroneRegister({ getDrones }) {

    const toast = useToast()
    const [serial, setSerial] = useState(null);
    const [model, setModel] = useState(null);
    const [name, setName] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modelData, setModelData] = useState(null);
    useEffect(() => {
        if (isOpen) {
            getModelDetails();
        }
    }, [isOpen]);


    const getModelDetails = async () => {
        // const [accessToken] = await getAccessToken();

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
    const onSubmit = async () => {
        const response = await fetch(window.config.choreoApiUrl + '/drone/register', {
            method: 'POST',
            headers: {
                // 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(

                {
                    "serial": serial,
                    "model": model,
                    "name": name
                }
            )
        })
            .then((response) => {
                // console.log(response.status)
                if (response.status == 200) {

                    onClose();
                    toast({
                        title: 'Drone Registered Successfully .',
                        // description: "We've created your account for you.",
                        position: 'bottom-right',
                        status: 'success',
                        duration: 5000,
                        // isClosable: true,
                    });
                    getDrones();
                }
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
                                    <Select placeholder="Select Drone Model" onChange={(e) => setModel(e.target.value)}>
                                        {
                                            modelData?.map((model) => (
                                                <option key={model.modelID} value={model.modelID}>{model.name}</option>
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
                        <Button onClick={onSubmit} variant='solid' colorScheme='messenger'>Add</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteDialog({ uuid, getdrones, setDroneData, setSelectedDrone }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()

    const deleteFn = async () => {
        const response = await fetch(window.config.choreoApiUrl + '/drone/drones/' + uuid, {
            method: 'PATCH',
            headers: {
                // 'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status == 200) {
                    toast({
                        title: 'Drone Deleted',
                        // description: "We've created your account for you.",
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
            <Button colorScheme='red' onClick={onOpen}>
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
                            } colorScheme='red' ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}


export default Overview