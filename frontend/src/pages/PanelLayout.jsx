import React, { useEffect,useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Flex, Image,Text,VStack } from '@chakra-ui/react'
import { useAuthContext } from "@asgardeo/auth-react";
import Logo from '../assets/droneAid.png'


const PanelLayout = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { state, getBasicUserInfo, signOut } = useAuthContext();


    useEffect(() => {
        getBasicUserInfo().then((info) => {
            setUserInfo(info);
        });
    }, []);

    return (

        <Flex height={'100vh'} width={'100vw'} backgroundColor={'#F3F4F6'} justifyContent={'flex-start'} alignItems={'center'} >
            <Flex height="100vh" p={'30px'} flexDirection={'column'} alignItems="center" justifyContent="space-between" width="20%" backgroundColor="white">
                <Image width={'190px'} src={Logo} alt="logo" />
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <VStack>
                        <Text  fontWeight={'500'}>{userInfo?.username}</Text>
                        <Text  fontWeight={'500'}>{userInfo?.applicationRoles}</Text>

                    </VStack>
                    <Flex onClick={
                        () => {
                            signOut();
                        }
                    } width={'100%'} height={'50px'} borderRadius={'10px'} justifyContent={'center'} alignItems={'center'} fontSize={'18px'}  cursor={'pointer'}>Logout</Flex>
                </Flex>
            </Flex>
            <Outlet />
        </Flex>

    )
}

export default PanelLayout
