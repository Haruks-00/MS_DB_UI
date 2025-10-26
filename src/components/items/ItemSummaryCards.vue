<template>
  <div v-if="selectedAccountId" class="mt-8">
    <!-- セクション見出し -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-clipboard-list-outline"
        size="32"
        color="info"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h4 font-weight-bold text-info">アイテム移動予定サマリー</h2>
    </div>

    <!-- アイテムカードのグリッド -->
    <v-row>
      <v-col
        v-for="summary in itemSummaries"
        :key="summary.itemId"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card elevation="2" rounded="lg" class="h-100">
          <!-- アイテム名 -->
          <v-card-title class="bg-info text-white pa-4">
            <v-icon icon="mdi-sword-cross" class="mr-2"></v-icon>
            {{ summary.itemName }}
          </v-card-title>

          <v-card-text class="pa-4">
            <!-- 外す予定セクション -->
            <div class="mb-4">
              <div class="d-flex align-center justify-space-between mb-2">
                <h6 class="text-subtitle-1 font-weight-bold text-warning">
                  <v-icon icon="mdi-minus-circle" size="small" class="mr-1"></v-icon>
                  外す予定
                </h6>
                <v-chip
                  :color="summary.willRemoveCount > 0 ? 'warning' : 'grey'"
                  size="small"
                  variant="tonal"
                >
                  {{ summary.willRemoveCount }}体
                </v-chip>
              </div>

              <div v-if="summary.willRemoveChars.length > 0" class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="char in summary.willRemoveChars"
                  :key="char.id"
                  size="small"
                  color="warning"
                  variant="outlined"
                >
                  {{ char.displayName }}
                </v-chip>
              </div>
              <div v-else class="text-body-2 text-medium-emphasis">
                なし
              </div>
            </div>

            <v-divider class="my-3"></v-divider>

            <!-- つける予定セクション -->
            <div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h6 class="text-subtitle-1 font-weight-bold text-success">
                  <v-icon icon="mdi-plus-circle" size="small" class="mr-1"></v-icon>
                  つける予定
                </h6>
                <v-chip
                  :color="summary.virtualCount > 0 ? 'success' : 'grey'"
                  size="small"
                  variant="tonal"
                >
                  {{ summary.virtualCount }}体
                </v-chip>
              </div>

              <div v-if="summary.virtualChars.length > 0" class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="char in summary.virtualChars"
                  :key="char.id"
                  size="small"
                  color="success"
                  variant="outlined"
                >
                  {{ char.displayName }}
                </v-chip>
              </div>
              <div v-else class="text-body-2 text-medium-emphasis">
                なし
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatOwnedCharDisplayName } from '@/utils/formatters'
import { ensureNewFormat } from '@/utils/itemMigration'

const props = defineProps({
  selectedAccountId: {
    type: String,
    default: null
  },
  ownedCharactersData: {
    type: Map,
    required: true
  },
  characterMastersMap: {
    type: Map,
    required: true
  },
  itemMasters: {
    type: Array,
    required: true
  },
  itemMastersMap: {
    type: Map,
    required: true
  }
})

/**
 * 各アイテムごとの移動予定サマリーを計算
 */
const itemSummaries = computed(() => {
  if (!props.selectedAccountId) {
    return []
  }

  const ownedChars = props.ownedCharactersData.get(props.selectedAccountId) || []

  return props.itemMasters.map(itemMaster => {
    const itemId = Number(itemMaster.id)
    const itemName = itemMaster.name

    // このアイテムを外す予定のキャラクター (willRemove: true の実アイテム)
    const willRemoveChars = ownedChars
      .filter(char => {
        const items = ensureNewFormat(char.items || [])
        return items.some(item =>
          Number(item.itemId) === itemId &&
          !item.isVirtual &&
          item.willRemove === true
        )
      })
      .map(char => ({
        id: char.id,
        displayName: formatOwnedCharDisplayName(
          char,
          false, // アイテム情報は含めない
          props.characterMastersMap,
          props.ownedCharactersData,
          props.itemMastersMap,
          props.selectedAccountId
        )
      }))

    // このアイテムをつける予定のキャラクター (isVirtual: true)
    const virtualChars = ownedChars
      .filter(char => {
        const items = ensureNewFormat(char.items || [])
        return items.some(item =>
          Number(item.itemId) === itemId &&
          item.isVirtual === true
        )
      })
      .map(char => ({
        id: char.id,
        displayName: formatOwnedCharDisplayName(
          char,
          false, // アイテム情報は含めない
          props.characterMastersMap,
          props.ownedCharactersData,
          props.itemMastersMap,
          props.selectedAccountId
        )
      }))

    return {
      itemId,
      itemName,
      willRemoveChars,
      willRemoveCount: willRemoveChars.length,
      virtualChars,
      virtualCount: virtualChars.length
    }
  })
})
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
