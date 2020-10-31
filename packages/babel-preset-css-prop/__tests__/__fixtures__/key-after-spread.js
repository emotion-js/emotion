export let Buttons = ({ buttons }) => {
  return (
    <div>
      {buttons.map(({ id, label, ...rest }) => (
        <button
          {...rest}
          key={id}
          css={{
            color: 'hotpink'
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
