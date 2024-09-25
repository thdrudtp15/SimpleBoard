import { Dispatch, SetStateAction } from 'react'

type TextInputProps = {
  style: 'text'
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

  if (style === 'text') {
    return (
      <input
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value as string)}
      />
    )
  } else if (style === 'checkbox') {
    return (
      <input
        type="checkbox"
        checked={value as boolean}
        onChange={() =>
          onChange((prev) => (typeof prev === 'boolean' ? !prev : false))
        }
      />
    )
  }
}
