import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { InputFieldPassword } from './index'
import '@testing-library/jest-dom'

describe('InputFieldPassword', () => {
  it('renders correctly with default props', () => {
    const { container } = render(
      <InputFieldPassword value="" onChange={() => {}} />
    )
    expect(container).toMatchSnapshot()
  })

  it('renders with a label', () => {
    const { getByText } = render(
      <InputFieldPassword value="" onChange={() => {}} label="Custom Label" />
    )
    expect(getByText('Custom Label')).toBeInTheDocument()
  })

  it('toggles password visibility', () => {
    const { getByRole, getByPlaceholderText } = render(
      <InputFieldPassword
        value="password123"
        onChange={() => {}}
        placeholder="Enter password"
      />
    )
    const toggleButton = getByRole('button')
    const input = getByPlaceholderText('Enter password')

    expect(input).toHaveAttribute('type', 'password')

    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')

    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('displays strongness indicator when hasStrongness is true and password is strong', () => {
    const { getByText } = render(
      <InputFieldPassword
        value="StrongPassword123!@#StrongPassword123!@#"
        onChange={() => {}}
        hasStrongness={true}
      />
    )
    expect(getByText('Safe')).toBeInTheDocument()
  })

  it('does not display strongness indicator for weak passwords', () => {
    const { queryByText } = render(
      <InputFieldPassword
        value="weak"
        onChange={() => {}}
        hasStrongness={true}
      />
    )
    // When password is weak/vulnerable, success is false and no indicator is shown
    expect(queryByText('Vulnerable')).not.toBeInTheDocument()
    expect(queryByText('Weak')).not.toBeInTheDocument()
  })

  it('renders additional items when provided', () => {
    const { getByText } = render(
      <InputFieldPassword
        value=""
        onChange={() => {}}
        additionalItems={<div>Additional Item</div>}
      />
    )
    expect(getByText('Additional Item')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    const { getByText } = render(
      <InputFieldPassword value="" onChange={() => {}} error="Error message" />
    )
    expect(getByText('Error message')).toBeInTheDocument()
  })
})
