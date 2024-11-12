import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export const Dropdown = ({ label, value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)
