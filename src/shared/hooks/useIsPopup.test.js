import { useIsPasskeyPopup } from './useIsPasskeyPopup'
import { useRouter } from '../context/RouterContext'

jest.mock('../context/RouterContext', () => ({
  useRouter: jest.fn()
}))

describe('useIsPasskeyPopup hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns false when not on a passkey page and not in passkey flow', () => {
    useRouter.mockReturnValue({ currentPage: 'settings', state: {} })
    expect(useIsPasskeyPopup()).toBe(false)
  })

  it('returns true when on a passkey page (getPasskey)', () => {
    useRouter.mockReturnValue({ currentPage: 'getPasskey', state: {} })
    expect(useIsPasskeyPopup()).toBe(true)
  })

  it('returns true when on a passkey page (createPasskey)', () => {
    useRouter.mockReturnValue({ currentPage: 'createPasskey', state: {} })
    expect(useIsPasskeyPopup()).toBe(true)
  })

  it('returns true when inPasskeyFlow is true in state', () => {
    useRouter.mockReturnValue({
      currentPage: 'someOtherPage',
      state: { inPasskeyFlow: true }
    })
    expect(useIsPasskeyPopup()).toBe(true)
  })

  it('returns false when inPasskeyFlow is false in state', () => {
    useRouter.mockReturnValue({
      currentPage: 'someOtherPage',
      state: { inPasskeyFlow: false }
    })
    expect(useIsPasskeyPopup()).toBe(false)
  })
})
