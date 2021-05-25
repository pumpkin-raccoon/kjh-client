export interface ValidationResult {
  isValid: boolean
  message: string
}

export const validate = (target: 'email', value: string): ValidationResult => {
  if (target === 'email') {
    const emailRegex = new RegExp(
      '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z-_.])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
      'gi',
    )
    if (!value || !emailRegex.test(value)) {
      return {
        isValid: false,
        message: '올바른 이메일 형식이 아닙니다.',
      }
    }
  }
  return {
    isValid: true,
    message: '',
  }
}
