import {set, TextInput} from 'sanity'
import type {StringInputProps} from 'sanity'
import {toHex6} from '@/lib/color'

// ponytail: native <input type="color"> instead of @sanity/color-input. The
// plugin stores {hex,alpha,hsl,hsv,rgb} objects, which would break the string
// colour pipeline in src/lib/color.ts, and its react-color base breaks on React 19.
// The text field keeps rgba()/alpha values working; the swatch writes opaque hex.
export default function ColorInput(props: StringInputProps) {
  const {value, onChange, readOnly, schemaType} = props

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <input
        type="color"
        aria-label={schemaType?.title}
        value={toHex6(value)}
        disabled={readOnly}
        onChange={(e) => onChange(set(e.currentTarget.value))}
        style={{
          width: 32,
          height: 32,
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: readOnly ? 'default' : 'pointer',
        }}
      />
      <TextInput {...props} value={value ?? ''} onChange={onChange} />
    </div>
  )
}
