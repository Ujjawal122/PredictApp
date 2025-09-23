// utils/generateCode.ts
export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}
