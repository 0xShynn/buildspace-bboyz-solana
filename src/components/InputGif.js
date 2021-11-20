import { Button, Center, Flex, Input, Text } from '@chakra-ui/react'

const InputGif = ({
  handleSubmit,
  onSubmit,
  isSubmitting,
  register,
  errors,
}) => {
  return (
    <Flex w="full" direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Input
            w="full"
            maxW="640px"
            type="text"
            placeholder="Insert your GIF link"
            variant="filled"
            _focus={{ bg: 'white' }}
            {...register('gif')}
          />
          <Text color="red.500" mt="2">
            {errors.gif?.message}
          </Text>
        </Center>

        <Center>
          <Button
            mt={4}
            px="16"
            size="lg"
            colorScheme="lime"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Center>
      </form>
    </Flex>
  )
}

export default InputGif
