import { useMemo, useState } from 'react'

import { useRecords } from '@tetherto/pearpass-lib-vault'
import { useTheme } from '@tetherto/pearpass-lib-ui-kit'

import { createStyles } from './RecordListV2.styles'
import { EmptyCollectionViewV2 } from '../../containers/EmptyCollectionViewV2'
import { EmptyResultsViewV2 } from '../../containers/EmptyResultsViewV2'
import { MainViewHeader } from '../../containers/MainViewHeader'
import { RecordListViewV2 } from '../../containers/RecordListView'
import {
  SORT_BY_TYPE,
  SORT_KEYS,
  type SortKey
} from '../../../shared/constants/sortOptions'
import { useRouter } from '../../../shared/context/RouterContext'
import { SidebarV2 } from '../../../shared/containers/SidebarV2'
import {
  groupRecordsByTimePeriod,
  type VaultRecord
} from '../../../shared/utils/groupRecordsByTimePeriod'
import { isFavorite } from '../../../shared/utils/isFavorite'

export const RecordListV2 = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme.colors)

  const { state: routerState } = useRouter() as {
    state: { recordType?: string; folder?: string } | undefined
  }

  const [sortKey, setSortKey] = useState<SortKey>(SORT_KEYS.LAST_UPDATED_NEWEST)
  const [isMultiSelectOn, setIsMultiSelectOn] = useState(false)
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])
  const [searchValue] = useState('')

  const isFavoritesView = isFavorite(routerState?.folder ?? '')
  const selectedFolder =
    routerState?.folder && !isFavoritesView ? routerState.folder : undefined

  const sort = useMemo(() => SORT_BY_TYPE[sortKey], [sortKey])

  const { data: records } = useRecords({
    shouldSkip: true,
    variables: {
      filters: {
        type:
          routerState?.recordType === 'all'
            ? undefined
            : routerState?.recordType,
        folder: selectedFolder,
        isFavorite: isFavoritesView ? true : undefined
      },
      sort
    }
  }) as { data: VaultRecord[] | undefined }

  const sections = useMemo(
    () => groupRecordsByTimePeriod(records ?? [], sort),
    [records, sort]
  )

  const hasRecords = !!records?.length

  return (
    <div style={styles.root} data-testid="record-list-v2-page">
      <SidebarV2 />
      <div style={styles.main}>
        <MainViewHeader
          sortKey={sortKey}
          setSortKey={setSortKey}
          isMultiSelectOn={isMultiSelectOn}
          setIsMultiSelectOn={setIsMultiSelectOn}
        />
        {hasRecords && (
          <RecordListViewV2
            sections={sections}
            isMultiSelectOn={isMultiSelectOn}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
          />
        )}

        {!hasRecords && !searchValue && <EmptyCollectionViewV2 />}
        {!hasRecords && !!searchValue && <EmptyResultsViewV2 />}
      </div>
    </div>
  )
}
