import { useState } from 'react'

import { t } from '@lingui/core/macro'
import { useVault } from '@tetherto/pearpass-lib-vault'
import { Button, Text, useTheme } from '@tetherto/pearpass-lib-ui-kit'
import { Pressable } from '@tetherto/pearpass-lib-ui-kit/components/Pressable'
import {
  Close,
  ExpandMore,
  KeyboardArrowLeftFilled,
  LockFilled
} from '@tetherto/pearpass-lib-ui-kit/icons'

import { createStyles } from './SidebarV2.styles'
import { VaultSelector } from './VaultSelector'

export const SidebarV2 = () => {
  const { theme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVaultSelectorOpen, setIsVaultSelectorOpen] = useState(false)
  const styles = createStyles(theme.colors, isCollapsed)

  const { data: vaultData } = useVault()

  const iconTextPrimary = { color: theme.colors.colorTextPrimary }

  const renderCollapseButton = () => (
    <div style={styles.collapseButtonSlot}>
      <Button
        variant="tertiary"
        size="small"
        onClick={() => setIsCollapsed((value) => !value)}
        data-testid="sidebar-collapse-toggle"
        aria-label={isCollapsed ? t`Expand sidebar` : t`Collapse sidebar`}
        iconBefore={<KeyboardArrowLeftFilled style={iconTextPrimary} />}
      />
    </div>
  )

  const renderVaultHeader = () => {
    const chevronStyle = {
      ...iconTextPrimary,
      ...styles.chevron,
      ...(isVaultSelectorOpen ? styles.chevronFlipped : {})
    }

    const showCloseButton = !isCollapsed && isVaultSelectorOpen
    const rightButton = showCloseButton ? (
      <Button
        variant="tertiary"
        size="small"
        onClick={() => setIsVaultSelectorOpen(false)}
        data-testid="sidebar-vault-selector-close"
        aria-label={t`Close vault selector`}
        iconBefore={<Close style={iconTextPrimary} />}
      />
    ) : (
      renderCollapseButton()
    )

    return (
      <div style={styles.vaultSelector} data-testid="sidebar-vault-selector">
        <div style={isCollapsed ? styles.vaultIconHidden : undefined}>
          <LockFilled width={16} height={16} style={iconTextPrimary} />
        </div>
        <div
          style={{
            ...styles.vaultNameGroup,
            ...(isCollapsed ? styles.vaultNameGroupHidden : {})
          }}
        >
          <Pressable
            onClick={() => setIsVaultSelectorOpen((value) => !value)}
            data-testid="sidebar-vault-selector-toggle"
            aria-label={
              isVaultSelectorOpen
                ? t`Close vault selector`
                : t`Open vault selector`
            }
          >
            <div style={styles.vaultNameRow}>
              <div style={styles.vaultNameText}>
                <Text variant="labelEmphasized" numberOfLines={1}>
                  {vaultData?.name ?? t`Personal Vault`}
                </Text>
              </div>
              <ExpandMore width={16} height={16} style={chevronStyle} />
            </div>
          </Pressable>
        </div>
        {rightButton}
      </div>
    )
  }

  return (
    <aside style={styles.wrapper} data-testid="sidebar-v2">
      {renderVaultHeader()}

      <div style={styles.scrollContainer}>
        <div style={styles.scrollArea}>
          {isVaultSelectorOpen && (
            <VaultSelector onClose={() => setIsVaultSelectorOpen(false)} />
          )}
        </div>
        <div style={styles.fadeGradient} aria-hidden="true" />
      </div>
    </aside>
  )
}
