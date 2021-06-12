import { TextField, FormControl, InputLabel, Select } from '@material-ui/core'

export const renderTextField = ({
  className,
  input,
  disabled,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    InputProps={{
      classes: {
        input: className
      }
    }}
    variant="outlined"
    error={touched && invalid}
    helperText={touched && error}
    disabled={disabled}
    {...input}
    {...custom}
  />
)

export const renderSelectField = ({ input, label, children, ...custom }) => (
  <FormControl variant="outlined" style={{ width: '100%' }}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={input.value}
      onChange={(e) => input.onChange(e.target.value)}
      {...input}
      {...custom}
      label={label}
    >
      {children}
    </Select>
  </FormControl>
)
