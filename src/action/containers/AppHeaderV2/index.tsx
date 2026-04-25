import type { ReactNode } from 'react'

import { t } from '@lingui/core/macro'
import { Button, SearchField, useTheme } from '@tetherto/pearpass-lib-ui-kit'
import { Add, ImportOutlined } from '@tetherto/pearpass-lib-ui-kit/icons'

import { createStyles } from './AppHeaderV2.styles'

export type AppHeaderV2Props = {
  searchValue: string
  onSearchChange: (value: string) => void
  onImportClick: () => void
  addItemControl: ReactNode
  searchTestID?: string
  importTestID?: string
}

export const AppHeaderV2 = ({
  searchValue,
  onSearchChange,
  onImportClick,
  addItemControl,
  searchTestID = 'main-search-input',
  importTestID = 'main-import-button'
}: AppHeaderV2Props) => {
  const { theme } = useTheme()
  const styles = createStyles(theme.colors)

  return (
    <header style={styles.root} data-testid="app-header-v2">
      <div style={styles.searchWrap}>
        <div style={styles.search}>
          <SearchField
            testID={searchTestID}
            size="small"
            value={searchValue}
            onChangeText={onSearchChange}
            placeholderText={t`Search in All Items`}
          />
        </div>
      </div>
      <div style={styles.actions}>
        <Button
          variant="secondary"
          size="small"
          type="button"
          data-testid={importTestID}
          aria-label={t`Import`}
          onClick={onImportClick}
          iconBefore={<ImportOutlined width={18} height={18} />}
        />
        {addItemControl}
      </div>
    </header>
  )
}

type AppHeaderAddItemTriggerProps = {
  testID?: string
  onClick?: () => void
}

export const AppHeaderAddItemTrigger = ({
  testID = 'main-plus-button',
  onClick
}: AppHeaderAddItemTriggerProps) => (
  <Button
    variant="primary"
    size="small"
    type="button"
    data-testid={testID}
    aria-label={t`Add Item`}
    onClick={onClick}
    iconBefore={<Add width={18} height={18} />}
  />
)
