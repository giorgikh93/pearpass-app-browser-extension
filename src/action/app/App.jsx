import { useRedirect } from './hooks/useRedirect'
import { useWindowResize } from './hooks/useWindowResize'
import { Routes } from './Routes'
import { FadeInWrapper } from '../../shared/components/FadeInWrapper'
import { WelcomePageWrapper } from '../../shared/components/WelcomePageWrapper'
import { useBlockingStateContext } from '../../shared/context/BlockingStateContext'
import { useGlobalLoading } from '../../shared/context/LoadingContext'
import { isV2 } from '../../shared/utils/designVersion'
import { AppHeaderContainer } from '../containers/AppHeaderContainer'

export const App = () => {
  const { isChecking: isBlockingStateChecking } = useBlockingStateContext()
  const { isLoading: isRedirectLoading } = useRedirect()
  const windowSize = useWindowResize()

  const isLoading = isBlockingStateChecking || isRedirectLoading

  useGlobalLoading({ isLoading })

  const containerClassName = isV2()
    ? 'bg-black-mode1 flex flex-col'
    : 'bg-black-mode1 flex items-center'

  return (
    <div
      className={containerClassName}
      style={{
        height: `${windowSize.height}px`,
        width: `${windowSize.width}px`
      }}
    >
      {isLoading ? (
        <FadeInWrapper>
          <WelcomePageWrapper />
        </FadeInWrapper>
      ) : isV2() ? (
        <>
          <AppHeaderContainer />
          <div className="flex min-h-0 flex-1 flex-col">
            <Routes />
          </div>
        </>
      ) : (
        <Routes />
      )}
    </div>
  )
}
