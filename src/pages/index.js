import { useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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
        colorScheme="blue"
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
        Connect to Wallet
      </Button>
    )
  }

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true)
      await checkIfWalletIsConnected()
      setIsLoading(false)
    }
    onLoad()
    return () => onLoad()
  }, [])

  return (
    <Box>
      {/* Edit the Head info */}
      <NextSeo title="Home" description="Description" />

      <Flex
        role="main"
        bg="white"
        direction="column"
        align="center"
        justify="center"
        py="12"
        px="6"
      >
        <Heading as="h1">B-Boys GIFs Portal</Heading>
        <Text mb="4">View your B-boys Gifs collection in the metaverse ✨</Text>
        {!walletAddress && !isLoading && renderNotConnectedContainer()}
      </Flex>

      <Box role="contentinfo">
        <Flex justify="center" p="6">
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
