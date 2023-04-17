export function generateCode() {
  const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const length = 7;
  let code = '';

  for (let i =0; i < length; i++) {
    code += alpha.charAt(Math.floor(Math.random()* alpha.length))
  }

  return code;
}