import { Box } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

const MusicPlayer = () => {
  return (
    <Box w="full" maxW="640px" h="160px" bg="red.100" mb="8">
      <ReactPlayer
        url="https://soundcloud.com/nobunaga/world-bboy-classics-by-nobunaga"
        width="100%"
        height="100%"
      />
    </Box>
  )
}

export default MusicPlayer
