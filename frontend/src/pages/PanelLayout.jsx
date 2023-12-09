import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex, Image, Text, VStack, Card, Grid, GridItem, Heading, Input,Button } from '@chakra-ui/react'
import { useAuthContext } from "@asgardeo/auth-react";
import Logo from '../assets/droneAid.png'
import Topbar from '../components/Topbar';

const PanelLayout = () => {
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
            <Flex flex={1} width={'100%'} mt={'100px'} backgroundColor={'#F1F1F1'} justifyContent={'space-between'} p={'0px 30px'} alignItems={'center'} >
                <Card w={'100%'} height={'95%'} variant={'solid'} >

                    <Grid height={'100%'} templateColumns="repeat(3, 1fr)" w={'100%'} gap={6}>
                        <GridItem variant={'unstyled'}
                            flex={1} colSpan={1} p={'40px'}
                        // borderRight={
                        //     '1px solid #E5E7EB'
                        // }
                        >
                            <Flex justifyContent={'space-between'} mb={'20px'} alignItems={'center'}
                            >
                                
                                <Heading mb={'20px'} >
                                    <Text fontSize={'18px'}>Drones</Text>
                                </Heading>
                                <Button>Add Drone</Button>
                            </Flex>
                            <Input placeholder="Search" />


                        </GridItem>

                        <GridItem colSpan={2} >
                            <Input placeholder="Search" />

                        </GridItem>
                    </Grid>
                </Card>
            </Flex >
        </Flex >

    )
}

export default PanelLayout
