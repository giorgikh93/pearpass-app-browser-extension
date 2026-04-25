import { AUTHENTICATOR_ENABLED } from '@tetherto/pearpass-lib-constants'
import {
  ContextMenu,
  NavbarListItem,
  useTheme
} from '@tetherto/pearpass-lib-ui-kit'

import { AppHeaderAddItemTrigger, AppHeaderV2 } from '../AppHeaderV2'
import { useAppHeaderContext } from '../../../shared/context/AppHeaderContext'
import { useRouter } from '../../../shared/context/RouterContext'
import { useRecordMenuItemsV2 } from '../../../shared/hooks/useRecordMenuItemsV2'
import { isFavorite } from '../../../shared/utils/isFavorite'

const ADD_MENU_WIDTH = 220

export const AppHeaderContainer = () => {
  const { theme } = useTheme()
  const {
    currentPage,
    state: routerState,
    navigate
  } = useRouter() as {
    currentPage: string
    state: { recordType?: string; folder?: string } | undefined
    navigate: (
      page: string,
      opts?: {
        params?: Record<string, unknown>
        state?: Record<string, unknown>
      }
    ) => void
  }
  const { searchValue, setSearchValue, isAddMenuOpen, setIsAddMenuOpen } =
    useAppHeaderContext()
  const { defaultItems } = useRecordMenuItemsV2()

  if (currentPage !== 'vault') {
    return null
  }

  if (AUTHENTICATOR_ENABLED && routerState?.recordType === 'authenticator') {
    return null
  }

  const isFavoritesView = isFavorite(routerState?.folder ?? '')
  const selectedFolder =
    routerState?.folder && !isFavoritesView ? routerState.folder : undefined

  const handleSelectType = (type: string) => {
    setIsAddMenuOpen(false)
    navigate('createOrEditCategory', {
      params: {
        recordType: type,
        ...(selectedFolder ? { folder: selectedFolder } : {}),
        ...(isFavoritesView ? { isFavorite: true } : {})
      }
    })
  }

  const handleImportClick = () => {
    navigate('settings', { params: {} })
  }

  const addItemControl = (
    <ContextMenu
      open={isAddMenuOpen}
      onOpenChange={setIsAddMenuOpen}
      menuWidth={ADD_MENU_WIDTH}
      testID="app-header-add-menu"
      trigger={
        <AppHeaderAddItemTrigger
          testID="main-plus-button"
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
        />
      }
    >
      {defaultItems.map((item) => (
        <NavbarListItem
          key={item.type}
          size="small"
          label={item.label}
          testID={`add-menu-${item.type}`}
          icon={<item.OutlinedIcon color={theme.colors.colorTextPrimary} />}
          onClick={() => handleSelectType(item.type)}
        />
      ))}
    </ContextMenu>
  )

  return (
    <AppHeaderV2
      searchValue={searchValue}
      onSearchChange={(val) => setSearchValue(val)}
      onImportClick={handleImportClick}
      addItemControl={addItemControl}
      searchTestID="main-search-input"
      importTestID="main-import-button"
    />
  )
}
