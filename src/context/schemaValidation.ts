import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required('성함을 입력해주세요.'),
  code: yup.string().required('코드를 입력해주세요.'),
  phoneNumber: yup.string().required('전화번호를 입력해주세요.'),

  // 이메일 타입 확인
  email: yup.string().email('* 이메일 형식에 적합하지 않습니다.').required('* 이메일은 필수 입력입니다.'),

  // phoneNumber: yup.string().matches(/\d{3}-\d{3,4}-\d{4}/),
})
