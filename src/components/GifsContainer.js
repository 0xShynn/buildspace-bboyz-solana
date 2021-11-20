import { Box, SimpleGrid } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const GifPlayer = dynamic(() => import('react-gif-player'), {
  ssr: false,
})

const GifsContainer = ({ gifsList }) => {
  return (
    <SimpleGrid spacing="10" columns={{ base: 1, md: 2, lg: 3, xl: 4 }} py="10">
      {gifsList.map((gif, index) => (
        <Box
          key={index}
          rounded="2xl"
          overflow="hidden"
          border="4px"
          borderColor="gray.800"
          display="inline-flex"
          maxH="300px"
          maxW="300px"
          _hover={{ border: '4px', borderColor: 'lime.500' }}
          sx={{
            '.gif_player': {
              display: 'inline-block',
              pos: 'relative',
              userSelect: 'none',
              cursor: 'pointer',
              '.play_button': {
                pos: 'absolute',
                left: '50%',
                top: '50%',
                padding: '14px 12px',
                bgColor: 'rgba(0, 0, 0, 0.5)',
                border: '2px dashed #fff',
                borderRadius: '50%',
                boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.5)',
                color: '#FFF',
                fontsize: '24px',
                fontFamily: 'heading',
                opacity: '1',
                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                transition: 'transform 0.4s, opacity 0.4s;}',
              },
              '.play_button:hover': {
                bgColor: 'rgba(0,0,0,0.7)',
              },
              '.play_button::after': {
                content: `'GIF'`,
              },
              '.playing .play_button': {
                transform: 'translate(-50%, -50%) scale(0) rotate(180deg)',
                opacity: '0.5',
              },
              '.gif_player img': {
                w: '300px',
                h: '100%',
                objectFit: 'cover',
              },
            },
          }}
        >
          <GifPlayer
            gif={gif}
            onTogglePlay={() => {}}
            width="300px"
            height="300px"
          />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default GifsContainer
