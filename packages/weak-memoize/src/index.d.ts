declare let weakMemoize: <Arg extends object, Return>(
  func: (arg: Arg) => Return
) => (arg: Arg) => Return
export default weakMemoize
