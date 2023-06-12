import { keyframes } from '@emotion/core/macro'

const animationStyle = keyframes`
    from {
        border-radius: ${'3px'};
        padding: ${'25px'};
        width: ${'500px'};
        z-index: ${100};
        font-size: ${'18px'};
        text-align: ${'center'};
    }
    to {
        border-radius: ${'4px'};
        padding: ${'30px'};
        width: ${'550px'};
        z-index: ${80};
        font-size: ${'20px'};
        text-align: ${'right'};
    }
  `
