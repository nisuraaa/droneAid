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




const OrderHistory = () => {
    const { getAccessToken } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        const accessToken = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/medi/allorders', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOrders(data);
            })

    }

    const [selectedOrderInfo, setSelectedOrderInfo] = useState(null);

    const getOrderInfo = async (
        orderID
    ) => {
        const accessToken = await getAccessToken();
        const response = await fetch(window.config.choreoApiUrl + '/medi/order/info/' + orderID, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSelectedOrderInfo(data);
            })

    }

    useEffect(() => {
        getOrders();
    }, []);

    const [selectedOrder, setSelectedOrder] = useState(null);

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
                            <Text fontSize={'18px'}>Order History</Text>
                        </Heading>
                        {/* <DroneRegister getDrones={getdrones} /> */}
                    </Flex>

                    <Flex gap={'5px'}>
                        <InputGroup width={'100%'}>
                            {/* 
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
                        </Select> */}
                        </InputGroup>


                    </Flex>
                </Flex>
                <Flex flexDirection={'column'} gap={'10px'} overflowY={'auto'}
                    // Use 'auto' to show scrollbar only when needed

                    // backgroundColor={'#F3F4F6'}
                    height={'100%'}
                    flex={1}

                // maxHeight={'calc(100vh - 13rem)'}  // Adjust the maxHeight as needed
                // Add padding to the Box
                >

                    <TableContainer overflowY={'auto'} maxHeight={'100%'} >

                        <Table>
                            <Thead position={'sticky'} top={0} zIndex={99} backgroundColor={'white'}>
                                <Tr>
                                    <Th>Order ID</Th>
                                    <Th>Order Date</Th>
                                    <Th>Order Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders?.map((order, index) => {
                                    return (
                                        <Tr key={index} onClick={() => {
                                            setSelectedOrder(order.orderID);
                                            getOrderInfo(order.orderID);
                                        }} backgroundColor={selectedOrder === order.orderID ? '#F3F4F6' : 'white'
                                        } _hover={{ backgroundColor: '#F3F4F6', cursor: 'pointer' }} >
                                            <Td>{order.orderID}</Td>
                                            <Td>{order.date.split('T')[0]}</Td>
                                            <Td>{order.status}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Flex>
            </Flex>

            <GridItem flex={1} width={'50%'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} alignItems={'center'} backgroundColor={'white'} borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} borderRight={'1px solid #E5E7EB'} >
                <Flex padding={'20px'} flexDirection={'column'}>

                    <Heading mb={'20px'} >
                        <Text fontSize={'18px'}>#{selectedOrderInfo?.orderID.toUpperCase()}</Text>
                    </Heading>

                    <Flex flexDir={'column'}>

                        <Text fontWeight={'normal'}>Order Date:
                            {selectedOrderInfo?.date.split('T')[0]}</Text>
                        <Text> Order Time :
                            {selectedOrderInfo?.date.split('T')[1].split('.')[0]}
                        </Text>
                        <Text>
                            Customer Name : {selectedOrderInfo?.firstname + ' ' + selectedOrderInfo?.lastname}
                        </Text>
                        <Text>
                            Customer Phone : {selectedOrderInfo?.phone}
                        </Text>
                        <Text>
                            Customer Address : {selectedOrderInfo?.address1 + ', ' + selectedOrderInfo?.address2 + ', ' + selectedOrderInfo?.city}
                        </Text>
                        <Text>
                            Order Status : {selectedOrderInfo?.status}
                        </Text>
                        <Text>
                            Order Weight : {selectedOrderInfo?.weight}
                        </Text>
                        <Box>
                            {selectedOrderInfo?.items?.map((item, index) => {
                                return (
                                    <Flex key={index} flexDirection={'column'} gap={'10px'} mb={'20px'}>
                                        <Text fontWeight={'bold'}>{item.name}</Text>
                                        <Text>Quantity : {item.quantity}</Text>
                                        <Text>Price : {item.price}</Text>
                                    </Flex>
                                )

                            } 
                            )}
                        </Box>

                    </Flex>
                </Flex>

            </GridItem>
            {/* </Grid> */}
        </Card>

    )
}


export default OrderHistory