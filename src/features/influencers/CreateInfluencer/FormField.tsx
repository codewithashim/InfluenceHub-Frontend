import type React from 'react'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface FormFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  required?: boolean
  type?: string
  placeholder?: string
  disabled?: boolean
  icon?: React.ReactNode
  options?: { value: string; label: string }[]
  min?: string | number
  max?: string | number
  step?: string | number
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = 'text',
  placeholder,
  disabled = false,
  icon,
  options,
  min,
  max,
  step,
}) => {
  const hasValue = value && value.trim() !== ''
  const isValid = hasValue && !error

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
        {required && '*'}
        {isValid && <CheckCircle className="h-4 w-4 text-green-500" />}
      </Label>

      {options ? (
        <Select
          value={value}
          onValueChange={onChange}
          disabled={disabled}
        >
          <SelectTrigger className={`h-11 ${isValid ? 'border-green-500 focus:border-green-500' : ''}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`h-11 ${isValid ? 'border-green-500 focus:border-green-500' : ''}`}
        />
      )}

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
