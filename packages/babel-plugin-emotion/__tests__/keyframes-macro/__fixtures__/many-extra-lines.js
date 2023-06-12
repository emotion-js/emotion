import { keyframes } from '@emotion/core/macro'

function cssStyleGetter(input) {
  input = input / 4
  return input
}

const animation = keyframes`  

    0% {    box-shadow:     10      56     
        
                                                ${cssStyleGetter(20)}     }





    100%{   box-shadow:     10      10    
                                            
                                                ${cssStyleGetter(40)}     }
`
