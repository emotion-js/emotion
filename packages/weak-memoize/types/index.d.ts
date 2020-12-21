export default weakMemoize
declare function weakMemoize<Arg, Return>(
  func: (Arg: any) => Return
): (Arg: any) => Return
