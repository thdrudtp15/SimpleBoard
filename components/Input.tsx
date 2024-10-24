import { Dispatch, SetStateAction } from 'react'
import stlyes from './Input.module.scss'

type TextInputProps = {
  style: 'text' | 'write_title'
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

type CheckboxInputType = {
  style: 'checkbox'
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

type propsType = TextInputProps | CheckboxInputType

export default function Input(props: propsType) {
  const { style, value, onChange } = props || {}

  if (style === 'write_title') {
    return (
      <input
        className={stlyes.write_title}
        placeholder="제목을 입력해주세요"
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value as string)}
      />
    )
  } else if (style === 'text') {
    return (
      <input
        className={stlyes.text}
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value as string)}
      />
    )
  } else if (style === 'checkbox') {
    return (
      <input
        className={stlyes.checkbox}
        type="checkbox"
        checked={value as boolean}
        onChange={() =>
          onChange((prev) => (typeof prev === 'boolean' ? !prev : false))
        }
      />
    )
  }
}
