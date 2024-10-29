import { Dispatch, SetStateAction } from 'react'

import stlyes from './Input.module.scss'

type TextInputProps = {
  styleSet: 'text' | 'write_title'
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

type CheckboxInputType = {
  styleSet: 'checkbox'
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

type propsType = TextInputProps | CheckboxInputType

const Input = (props: propsType) => {
  const { styleSet, value, onChange } = props || {}

  if (styleSet === 'write_title') {
    return (
      <input
        className={stlyes.write_title}
        placeholder="제목을 입력해주세요"
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value as string)}
      />
    )
    // } else if (styleSet === 'text') {
    //   return (
    //     <input
    //       className={stlyes.text}
    //       type="text"
    //       value={value as string}
    //       onChange={(e) => onChange(e.target.value as string)}
    //     />
    //   )
    // } else if (styleSet === 'checkbox') {
    //   return (
    //     <input
    //       className={stlyes.checkbox}
    //       type="checkbox"
    //       checked={value as boolean}
    //       onChange={() =>
    //         onChange((prev) => (typeof prev === 'boolean' ? !prev : false))
    //       }
    //     />
    //   )
    // }
  }
  return null
}

export default Input
