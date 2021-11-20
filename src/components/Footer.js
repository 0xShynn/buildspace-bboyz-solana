import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'

const Footer = () => {
  return (
    <Box role="contentinfo">
      <Flex justify="center" p="6" color="white">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Flex>
    </Box>
  )
}

export default Footer
