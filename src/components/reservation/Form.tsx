import FixedBottomButton from '../shared/FixedBottomButton'
import { useForm } from 'react-hook-form'
import { Hotel, ReservationForm } from '@/models/hotel'
import Text from '../shared/Text'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'
import Select from '../shared/Select'
import { Fragment, useCallback } from 'react'

type FormData = {
  //키값은 스트링 값도 스트링이야
  [key: string]: string
}

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: (formValues: FormData) => void
  buttonLabel: string
}) {
  //mode가 onBlur가 되면 유효성 검사를 해준다.
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })
  const submit = () => {}
  // console.log('forms', forms)

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              //필수갑 ㅅ여부
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            hasError={formState.errors[form.id] != null}
            // hasError={formState.errors[form.id] != null}
            options={form.options}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [register, formState.errors],
  )
  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>예약정보</Text>
      <Spacing size={16} />

      <form action="">
        {forms.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={8} />
            </Fragment>
          )
        })}
        <Spacing size={200} />
      </form>
      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}
const VALIDATION_MESSAGE_MAP: {
  [key: string]: {
    //정규식 타입을 받는다 RegExp
    value: RegExp
    message: string
  }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요.',
  },
  email: {
    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식에 맞춰서 작성해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
}
export default Form
