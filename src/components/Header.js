import { Box, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'

const Header = ({ logo, subtitle }) => {
  return (
    <Flex align="center" direction="column">
      <Box mb="4">
        <Image src={logo} alt="Logo" />
      </Box>

      <Heading as="h1" color="gray.300" fontSize="md" mb="8" fontStyle="italic">
        {subtitle}
      </Heading>
    </Flex>
  )
}

export default Header
