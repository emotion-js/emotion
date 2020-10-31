export let Button = ({ loading, ...props }) => {
  return (
    <>
      <button css={{ color: 'hotpink' }} {...props} />
      {loading && <span>{'Loading...'}</span>}
    </>
  )
}
