import * as yup from 'yup'

export const schema = yup.object({
  memberName: yup.string().required('성함을 입력해주세요.'),
  contact: yup.string().required('전화번호를 입력해주세요.'),
  code: yup.string().default(''),
  roleName: yup.string().required('직무/역할을 선택해주세요.'),
  marketingAgree: yup.boolean().default(false), // 기본값을 false로 명확하게 정의
})
