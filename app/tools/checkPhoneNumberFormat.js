export default function (phone){
  let regex = '^(09|\\\+639)\\\d{9}$'

  return phone.match(regex)
}