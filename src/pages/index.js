import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    gif: yup
      .string()
      .url()
      .matches(
        /^(https|http):\/\/(media|c).(giphy|tenor).com\//gm,
        'GIF must come from giphy.com or tenor.com'
      )
      .required(),
  })
  .required()

import Logo from '../assets/images/bboys-metaverse.svg'

const TEST_GIFS = [
  'https://media.giphy.com/media/XfQDHy2F72FYk/giphy.gif',
  'https://media.giphy.com/media/jTBGVjRMxXrMEk7oVn/giphy.gif',
  'https://media.giphy.com/media/ubd3YFbbktwGUJtXey/giphy.gif',
  'https://media.giphy.com/media/EeAxi5WdlEDMCbXYtP/giphy.gif',
  'https://media.giphy.com/media/lvClsfvqyb7S8/giphy.gif',
  'https://media.giphy.com/media/2ikuOEezP3nwr3SLj5/giphy.gif',
  'https://media.giphy.com/media/wZQnJI3XT1TutaWz0I/giphy.gif',
  'https://media.giphy.com/media/2x1Rw9Z9xPMpq/giphy.gif',
  'https://media.giphy.com/media/w6ovaV3maxsMDLJLd3/giphy.gif',
  'https://c.tenor.com/7TS0LZMjj0AAAAAd/fendijsw-got7.gif',
]

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [gifsList, setGifsList] = useState(TEST_GIFS)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setGifsList((prevState) => {
          const updatedList = [...prevState]
          updatedList.push(values.gif)
          return updatedList
        })
        resolve()
        reset()
      }, 3000)
    })
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet is found!')

        const response = await solana.connect({ onlyIfTrusted: true })
        console.log('Connected with Public Key:', response.publicKey.toString())
        setWalletAddress(response.publicKey.toString())
      } else {
        setErrorMessage(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
      toast({
        title: 'Great!',
        description: 'Your Phantom wallet is now connected.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  const toast = useToast()

  const renderNotConnectedContainer = () => {
    const id = 'test-toast'

    return (
      <Button
        colorScheme="pink"
        size="lg"
        onClick={() => {
          if (errorMessage && !toast.isActive(id)) {
            toast({
              id,
              title: 'Oops! Phantom Wallet not found.',
              description: 'Switch to a compatible browser.',
              status: 'warning',
              duration: 5000,
              position: 'top-right',
              isClosable: true,
            })
          } else connectWallet()
        }}
      >
        Connect your Wallet
      </Button>
    )
  }

  const renderConnectedContainer = () => (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex maxW="600px" mx="auto" align="center" direction="column">
          <Input
            type="text"
            placeholder="Insert your GIF link"
            variant="filled"
            _focus={{ bg: 'white' }}
            {...register('gif')}
          />
          <Text color="red.500" mt="2">
            {errors.gif?.message}
          </Text>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
      <SimpleGrid
        spacing="10"
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        py="10"
      >
        {gifsList.map((gif, index) => (
          <Box
            overflow="hidden"
            rounded="lg"
            key={index}
            pos="relative"
            w="300px"
            h="300px"
          >
            <Image
              src={gif}
              alt={gif}
              width="300px"
              height="300px"
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true)
      await checkIfWalletIsConnected()
      setIsLoading(false)
    }
    onLoad()
  }, [])

  return (
    <Box>
      {/* Edit the Head info */}
      <NextSeo
        title="Home"
        description="A collection of b-boys from the Metaverse"
      />

      <Flex
        role="main"
        direction="column"
        align="center"
        justify="center"
        py="12"
        px="6"
      >
        <Box mb="4">
          <Image src={Logo} alt="Logo" />
        </Box>
        <Heading
          as="h1"
          color="gray.300"
          fontSize="md"
          mb="8"
          fontStyle="italic"
        >
          Your collection of B-boyz GIFs straight from the blockchainz
        </Heading>
        {!walletAddress && !isLoading && renderNotConnectedContainer()}
        {walletAddress && renderConnectedContainer()}
      </Flex>

      <Box role="contentinfo">
        <Flex justify="center" p="6" color="white">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </Flex>
      </Box>
    </Box>
  )
}
