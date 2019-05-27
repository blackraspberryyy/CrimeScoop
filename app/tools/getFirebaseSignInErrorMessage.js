export default function (code){
  let errorCodes = [
    {
      code: 'auth/invalid-email',
      message: 'Email is invalid.'
    },
    {
      code: 'auth/user-disabled',
      message:'The account has been disabled.'
    },
    {
      code: 'auth/user-not-found',
      message: 'Account does not exist.'
    },
    {
      code: 'auth/wrong-password',
      message: 'Email/Password is invalid.'
    }
  ]

  let error = errorCodes.find(e => e.code == code)

  return error ? error.message : 'Something went wrong'
}