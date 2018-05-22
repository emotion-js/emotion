```jsx live
const Link = styled.a`
  min-width: 12rem;
  margin: 0 auto 20px;
  padding: ${props => props.primary ? 18 : 16}px;
  border-radius: 5px;
  text-decoration: none;
  border: ${props =>
    props.primary ? 'none' : '3px solid currentColor'};
  background: ${props =>
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  color: ${props =>
    props.primary ? '#1D2029' : '#D26AC2'};
  &:hover {
    opacity: 0.95;
  }
  @media (min-width: 768px) {
    margin: 0 20px 0 0;
    &:last-child {
      margin: 0;
    }
  }
`
```

```jsx live
const Link = styled.a(props => ({
  minWidth: '12rem',
  margin: '0 auto 20px',
  padding: props.primary ? 18 : 16,
  borderRadius: 5,
  textDecoration: 'none',
  border: props.primary
    ? 'none'
    : '3px solid currentColor',
  background:
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)',
  color: props.primary ? '#1D2029' : '#D26AC2',
  '&:hover': {
    opacity: '0.95'
  },
  '@media (min-width: 768px)': {
    margin: '0 20px 0 0',
    '&:last-child': {
      margin: 0
    }
  }
}))
```
