import { useEffect, useState } from 'react'

import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'

import Logo from '../assets/images/bboys-metaverse.svg'
import Footer from '../components/Footer'
import GifsContainer from '../components/GifsContainer'
import Header from '../components/Header'
import InputGif from '../components/InputGif'
import MusicPlayer from '../components/MusicPlayer'
import { inputSchema } from '../utils/inputSchema'

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
  } = useForm({ resolver: yupResolver(inputSchema) })

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
    <Flex align="center" direction="column">
      <MusicPlayer />
      <InputGif
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
      />
      <GifsContainer gifsList={gifsList} />
    </Flex>
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
        <Header
          logo={Logo}
          subtitle="Your collection of B-boyz GIFs straight from the blockchainz"
        />
        {!walletAddress && !isLoading && renderNotConnectedContainer()}
        {walletAddress && renderConnectedContainer()}
      </Flex>

      <Footer />
    </Box>
  )
}
