import React,{useState} from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
        const [show, setShow] = useState(false);
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [loading,setLoading]=useState(false);
        const toast=useToast()
        const history=useHistory()

        const handleClick = () => {
          setShow(!show);
        };
        const submitHandler =async () => {
          setLoading(true)
          if(!email || !password){
            toast({
              title: "Please fill all the details!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
          try{
            const config ={
              headers:{
                "Content-type":"application/json"
              }
            }
            const sendLoginData={email:email,password:password}
            const { data } = await axios.post("/api/user/login",sendLoginData,config);
            console.log('loggedin---',data)
            toast({
              title: "Login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            
            localStorage.setItem('userInfo',JSON.stringify(data))
            setLoading(false);
            history.push('/chats')
          }catch(error){
            console.log('loggedin error',error)
            toast({
              title: "Error Occured!",
              description:error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
          }
        };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456")
        }}
      >
        Get Guest Credentials
      </Button>
    </VStack>
  );
}

export default Login
