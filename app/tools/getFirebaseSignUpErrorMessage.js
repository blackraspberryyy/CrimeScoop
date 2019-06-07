export default function (code){
  let errorCodes = [
    {
      code: 'auth/invalid-email',
      message: 'Email is invalid.'
    },
    {
      code: 'auth/email-already-in-use',
      message:'Email is already in use'
    },
    {
      code: 'auth/weak-password',
      message: 'Password must be atleast 6 characters'
    }
  ]

  let error = errorCodes.find(e => e.code == code)

  return error ? error.message : 'Cannot create account.'
}