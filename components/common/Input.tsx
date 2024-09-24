import { Dispatch, SetStateAction } from 'react'

type propsType<T> = {
  style: string
  value: T
  checked?: boolean | undefined
  onChange: Dispatch<SetStateAction<T>>
}

export default function Input({
  style,
  value,
  checked,
  onChange,
}: propsType<string | boolean>) {
  if (style === 'text') {
    return (
      <input
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  } else if (style === 'checkbox') {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange((prev: unknown) => !prev)}
      />
    )
  }
}
