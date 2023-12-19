import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, AddIcon, SmallAddIcon } from '@chakra-ui/icons'
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
    CardBody, CardFooter,
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
    IconButton,
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

    const navigate = useNavigate();
    const { state, getBasicUserInfo, signOut } = useAuthContext();
    const [totalWeight, setTotalWeight] = useState(0);
    const [droneCart, setDroneCart] = useState([]);
    const [selectedDrone, setSelectedDrone] = useState(null);


    const calcWeight = () => {
        setTotalWeight(droneCart.reduce((a, b) => a + (b['weight'] * b['quantity']), 0))
    }
    useEffect(() => {
        getMedicine();
        calcWeight();


    }, [
        droneCart
    ]);

    const [medicine, setMedicine] = useState([]);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const toast = useToast();
    const submitOrder = async () => {
        const [accessToken] = await getAccessToken();

        const response = await fetch(window.config.choreoApiUrl + '/medi/createorder', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "weight": totalWeight,
                    "droneUUID": selectedDrone.uuid,
                    "items": droneCart,
                    "customer": {
                        "firstname": firstname,
                        "lastname": lastname,
                        "address1": address1,
                        "address2": address2,
                        "city": city,
                        "mobile": mobile,
                        "email": email
                    }
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status == 'success') {
                    toast({
                        title: "Order Placed",
                        description: "Your order has been placed successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    setPageNo(1);
                    setDroneCart([]);
                    setSelectedDrone(null);
                    setFirstname('');
                    setLastname('');
                    setAddress1('');
                    setAddress2('');
                    setCity('');
                    setMobile('');
                    setActiveStep(0);
                    setEmail('');
                    calcWeight();


                } else {
                    alert('Error Occured');
                }
            })
    };

    const [availableDrones, setAvailableDrones] = useState([]);

    const getMedicine = async () => {
        const [accessToken] = await getAccessToken();

        const response = await fetch(window.config.choreoApiUrl + '/medi/all', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setMedicine(data);
            })
    };

    const getRecommendedDrones = async (weight) => {
        const accessToken = await getAccessToken();

        const response = await fetch(window.config.choreoApiUrl + '/drone/recommend?' + new URLSearchParams({ weight: weight }), {

            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            params: {
                weight: weight
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAvailableDrones(data);
            })
    }

    const next = () => {
        if (pageNo < 4) {
            setActiveStep(activeStep + 1);
            console.log(pageNo);
            setPageNo(pageNo => {
                const updatedPageNo = pageNo + 1;
                if (updatedPageNo == 2) {
                    // submit order
                    getRecommendedDrones(totalWeight);
                }
                console.log(updatedPageNo);
                return updatedPageNo;
            });
        }
    }
    const prev = () => {
        if (pageNo > 1) {
            setActiveStep(activeStep - 1);
            setPageNo(pageNo => {
                const updatedPageNo = pageNo - 1;
                if (updatedPageNo == 2) {
                    // submit order
                    getRecommendedDrones(totalWeight);
                }
                console.log(updatedPageNo);
                return updatedPageNo;
            });
        }
    }

    const LoadUnloadDrone = async (droneUUID, status) => {
        const [accessToken] = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/drone/changestatus', {

            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "droneUUID": droneUUID,
                    "status": status
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 'success') {
                    if (status == 'idle') {
                        prev();
                    } else {
                        next();
                    }
                }
            })
    }
    return (
        <Card flexDirection={'row'} w={'99%'} height={'97%'} variant={'solid'} borderRadius={'10px'} border={'1px solid #C9C9C9'} backgroundColor={'#C9C9C9'} >

            {/* <Grid height={'100%'} templateColumns="repeat(6, 1fr)" w={'100%'} gap={6} > */}
            <Flex
                borderBottomLeftRadius={'0px'} borderTopLeftRadius={'0px'}

                backgroundColor={'white'}
                borderRight={'1px solid #E5E7EB'}
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
                    <Flex overflowY={'auto'} maxHeight={'90vh'} backgroundColor={'white'}
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
                                        medicine.map((med) => (
                                            <><Tr>

                                                <Td>{med.mediID}</Td>
                                                <Td>{med.name}</Td>
                                                <Td>{med.weight}</Td>
                                                <Td><IconButton icon={<SmallAddIcon />}
                                                    onClick={
                                                        () => {
                                                            if (droneCart.some(item => item.mediID === med.mediID)) {
                                                                // update quantity
                                                                setDroneCart(droneCart.map(item => item.mediID === med.mediID ? { ...item, quantity: item.quantity + 1 } : item))
                                                            } else {
                                                                // add med with quantity 1
                                                                setDroneCart([...droneCart, { ...med, quantity: 1 }])
                                                            }

                                                        }
                                                    } colorScheme={'messenger'} /></Td>
                                            </Tr>
                                            </>
                                        ))
                                    }

                                </Tbody>
                            </Table>

                        </Flex>
                    </Flex>

                    <Flex flexDirection={'column'} flex={1} colSpan={4} height={'100%'} width={'100%'} justifyContent={'space-between'} borderRadius={'10px'} alignItems={'center'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} w={'40%'}>
                        <Text>
                            Max Weight Supported is 500g
                        </Text>
                        <Flex gap={'20px'} flexDirection={'column'} overflowY={'auto'} flex={1} width={'100%'} maxHeight={'70vh'} backgroundColor={'#E5E7EB'} borderRadius={'10px'} p={'20px'} border={'1px solid #82828245'} >

                            {droneCart.length > 0 ? (

                                droneCart.map((item) => (

                                    <Card>
                                        <CardBody display={'flex'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'} gap={'10px'}>
                                            <Flex flexDirection={'row'} gap={'10px'} width={'80%'} alignItems={'center'} justifyContent={'space-between'}>
                                                <Flex flexDirection={'column'}>

                                                    <Text fontSize={'18px'} fontWeight={'medium'}>{item.name}</Text>
                                                    <Text fontSize={'14px'} fontWeight={'normal'}>{item.medID}</Text>
                                                </Flex>
                                                <Flex flexDirection={'column'} alignItems={'center'} backgroundColor={'#E5E7EB'} borderRadius={'10px'} p={'5px'} >
                                                    <Text fontSize={'18px'} fontWeight={'medium'}> {item.weight}g</Text>
                                                    <Text fontSize={'14px'} fontWeight={'normal'}>Weight</Text>

                                                </Flex>
                                                <Text fontSize={'14px'} fontWeight={''}>Quantity: {item.quantity}</Text>
                                            </Flex>
                                            <IconButton onClick={
                                                () => {
                                                    setDroneCart(droneCart.filter((med) => med.mediID !== item.mediID))
                                                }
                                            }
                                                aria-label='Remove Item' icon={<DeleteIcon />} colorScheme={'red'} />

                                        </CardBody>

                                    </Card>



                                )
                                ))
                                : (
                                    <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
                                        <Text opacity={'0.5'} fontWeight={'normal'}> No Items have been added to the cart</Text>
                                    </Flex>
                                )
                            }
                        </Flex>
                        <Flex flexDirection={'row'} gap={'10px'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text>
                                Total Weight:&nbsp;<Text color={totalWeight > 500 ? 'red' : 'black'} fontWeight={'medium'} display={'inline'}>{totalWeight}g</Text>

                            </Text>
                            <Button isDisabled={totalWeight > 500 || droneCart.length == 0} colorScheme='messenger' fontWeight={'medium'}
                                onClick={() => {
                                    next()
                                }}>
                                Next
                            </Button>
                        </Flex>
                    </Flex>
                </>
            ) : pageNo == 2 ? (
                <>

                    <Card gap={'4px'} flex={1} colSpan={4} height={'100%'} position={'relative'} justifyContent={'space-between'} borderRadius={'10px'} alignItems={'flex-start'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                        <Flex flexDirection={'column'}>
                            <Heading size={'md'}>Available Drones</Heading>
                            <Text>
                                Availabilty of drones may vary based on the weight of the items selected
                            </Text>
                        </Flex>
                        <Flex flex={1} flexDirection={'row'} flexWrap={'wrap'} width={'100%'} borderRadius={'10px'} gap={'10px'} backgroundColor={'#E5E7EB'} p={'20px'} overflow={'auto'} maxHeight={'70vh'} border={'1px solid #82828245'} >
                            {availableDrones.map((drone) => (
                                <Card key={drone.uuid} alignSelf={'flex-start'} padding={'0px'} onClick={() => {
                                    if (selectedDrone?.uuid == drone.uuid) {
                                        setSelectedDrone(null);
                                    } else {
                                        setSelectedDrone(drone);
                                    }
                                }} cursor={'pointer'} border={selectedDrone?.uuid == drone.uuid ? '5px solid #4C51BF' : '1px solid #E5E7EB'} borderRadius={'10px'} backgroundColor={'white'} flexDirection={'column'} gap={'5px'} width={'20rem'} >
                                    <CardBody>
                                        <Box pl={'10px'} borderLeft={'5px solid' + (drone._model.name == 'Lightweight' ? '#34eb5b' : drone._model.name == 'Middleweight' ? '#347aeb' : drone._model.name == 'Cruiserweight' ? '#9934eb' : '#ffd000')} >

                                            <Text fontSize={'18px'} fontWeight={'medium'}>{drone.name}</Text>
                                            <Text fontSize={'14px'} fontWeight={'normal'}>Model: {drone._model.name}</Text>
                                            <Text fontSize={'14px'} fontWeight={'normal'}>UUID: {drone.uuid}</Text>
                                        </Box>
                                    </CardBody>

                                </Card>
                            ))}
                        </Flex>
                        <Flex position={'relative'} bottom={0} gap={'10px'} width={'100%'} justifyContent={'flex-end'}>
                            <Flex gap={'10px'}>

                                <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                    prev()
                                }} fontWeight={'medium'}
                                >
                                    Previous
                                </Button>
                                <Button isDisabled={selectedDrone == null} onClick={() => {
                                    LoadUnloadDrone(selectedDrone.uuid, 'loading');
                                }} fontWeight={'medium'}>
                                    Next
                                </Button>
                            </Flex>
                        </Flex>

                    </Card>
                </>
            ) : pageNo == 3 ? (
                <>
                    <Card flex={1} colSpan={4} height={'100%'} position={'relative'} justifyContent={'space-between'} borderRadius={'10px'} alignItems={'flex-start'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                        <Flex flexDirection={'column'} gap={'10px'} width={'100%'}>

                            <Heading>
                                Enter Delivery Details
                            </Heading>
                            <Flex flexDirection={'column'} gap={'20px'} width={'100%'} p={'20px'}>
                                <Flex gap={'10px'}>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>First Name</FormLabel>
                                        <Input placeholder="eg: John" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    </InputGroup>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>Last Name</FormLabel>
                                        <Input placeholder="eg: Appleseed" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    </InputGroup>
                                </Flex>
                                <Flex gap={'10px'}>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>Address Line 1</FormLabel>
                                        <Input placeholder="eg: 123, Main Street" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                    </InputGroup>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>Address Line 2</FormLabel>
                                        <Input placeholder="eg: Temple Road" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </InputGroup>
                                </Flex>
                                <Flex gap={'10px'}>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>City</FormLabel>
                                        <Input placeholder="eg: 123, Main Street" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </InputGroup>

                                </Flex>
                                <Flex gap={'10px'}>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>Mobile No.</FormLabel>
                                        <Input placeholder="eg: 0771231234" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                    </InputGroup>
                                    <InputGroup flexDirection={'column'} width={'50%'} >
                                        <FormLabel>E-Mail Address</FormLabel>
                                        <Input placeholder="eg: john@droneaid.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </InputGroup>
                                </Flex>

                            </Flex>
                        </Flex>

                        <Flex gap={'20px'} width={'100%'} justifyContent={'flex-end'}>
                            <Flex position={'relative'} bottom={0} gap={'10px'}>

                                <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                    LoadUnloadDrone(selectedDrone.uuid, 'idle');
                                }} fontWeight={'medium'}>
                                    Previous
                                </Button>
                                <Button {...totalWeight > 500 ? { disabled: true } : {}} onClick={() => {
                                    submitOrder();

                                }} colorScheme='messenger' fontWeight={'medium'}>
                                    Finish
                                </Button >
                            </Flex>
                        </Flex>

                    </Card>
                </>
            ) : pageNo == 4 ? (
                <>


                    <Card flex={1} colSpan={4} height={'100%'} position={'relative'} justifyContent={'space-between'} borderRadius={'10px'} alignItems={'flex-start'} p={'20px'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                        <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={'10px'} width={'100%'}>

                            <Heading>
                                Delivery Placed!
                            </Heading>
                            <Flex flexDirection={'column'} gap={'20px'} width={'100%'} p={'20px'} alignItems={'center'} justifyContent={'space-even'}>
                                <Flex flexDirection={'column'} gap={'10px'} width={'100%'} p={'20px'} justifyContent={'center'} alignItems={'center'}>
                                </Flex>
                                <Button width={'20%'} colorScheme='messenger'>
                                    Create New Order
                                </Button>
                            </Flex>
                        </Flex>

                    </Card>
                </>
            ) : null
            }
        </Card>

    )
}


export default Overview