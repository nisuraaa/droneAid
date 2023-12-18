import { extendTheme } from '@chakra-ui/react'
import { modalTheme } from './theme/modal.js'

// const theme = extendTheme({
//   fonts: {

//     body: `'Rubik', sans-serif`,
//   },
// })

const components = {
  Modal : modalTheme
}

const theme = extendTheme({components});
export default theme