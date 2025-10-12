<template>
  <v-dialog v-model="isOpen" max-width="600px" persistent>
    <v-card class="dialog-card">
      <v-card-title class="bg-primary text-white pa-4">
        <v-icon :icon="isNewCharacter ? 'mdi-plus-circle' : 'mdi-pencil'" class="mr-2"></v-icon>
        {{ isNewCharacter ? '所持追加+アイテム設定' : 'アイテム編集' }}
      </v-card-title>

      <v-card-text class="pa-6">
        <div v-if="characterInfo" class="mb-4">
          <v-chip color="primary" variant="tonal" class="mb-2">
            {{ characterInfo.monsterName }}
          </v-chip>
        </div>

        <!-- アイテム選択 -->
        <v-autocomplete
          v-model="selectedItemIds"
          :items="availableItems"
          item-title="name"
          item-value="id"
          label="アイテムを選択（実最大3個+仮最大3個=最大6個）"
          multiple
          chips
          closable-chips
          variant="outlined"
          color="primary"
          prepend-inner-icon="mdi-sword-cross"
          :rules="[itemCountRule]"
          @update:model-value="onItemSelectionChange"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :color="getItemChipColor(item.value)"
              closable
            >
              {{ item.title }}
            </v-chip>
          </template>
        </v-autocomplete>

        <!-- 選択されたアイテムの実/仮想切り替え -->
        <div v-if="editingItems.length > 0" class="mt-6">
          <v-divider class="mb-4"></v-divider>
          <h6 class="text-h6 font-weight-medium mb-3">
            <v-icon icon="mdi-cog" class="mr-2" color="secondary"></v-icon>
            アイテム設定
          </h6>

          <v-list>
            <v-list-item
              v-for="item in editingItems"
              :key="item.itemId"
              class="mb-2 border rounded"
            >
              <template v-slot:prepend>
                <v-icon
                  :icon="item.isVirtual ? 'mdi-clipboard-text-outline' : 'mdi-check-circle'"
                  :color="item.isVirtual ? 'orange' : 'success'"
                ></v-icon>
              </template>

              <v-list-item-title>
                {{ getItemName(item.itemId) }}
              </v-list-item-title>

              <template v-slot:append>
                <div class="d-flex align-center gap-2">
                  <v-btn-toggle
                    :model-value="item.isVirtual ? 'virtual' : 'real'"
                    @update:model-value="(val) => toggleItemType(item.itemId, val)"
                    mandatory
                    density="compact"
                    color="primary"
                  >
                    <v-btn value="real" size="small">
                      <v-icon icon="mdi-check" class="mr-1"></v-icon>
                      実
                    </v-btn>
                    <v-btn value="virtual" size="small">
                      <v-icon icon="mdi-clipboard-text-outline" class="mr-1"></v-icon>
                      予定
                    </v-btn>
                  </v-btn-toggle>

                  <!-- 実アイテムのみ「外す予定」チェックボックスを表示 -->
                  <v-checkbox
                    v-if="!item.isVirtual"
                    v-model="item.willRemove"
                    label="外す予定"
                    density="compact"
                    hide-details
                    color="warning"
                  ></v-checkbox>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </div>

        <!-- エラーメッセージ -->
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          class="mt-4"
          closable
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          @click="closeModal"
          variant="outlined"
          color="secondary"
        >
          キャンセル
        </v-btn>
        <v-btn
          @click="saveItems"
          variant="elevated"
          color="primary"
          :loading="isSaving"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ensureNewFormat } from '../../utils/itemMigration.js'
import { useDataStore } from '@/stores/data'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  character: { type: Object, default: null },
  isNewCharacter: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'save'])

const dataStore = useDataStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const selectedItemIds = ref([])
const editingItems = ref([])
const errorMessage = ref('')
const isSaving = ref(false)

// キャラクター情報を取得
const characterInfo = computed(() => {
  if (!props.character) return null
  return dataStore.characterMastersMap.get(props.character.characterMasterId)
})

// 利用可能なアイテムリスト
const availableItems = computed(() => {
  return dataStore.itemMasters.map(item => ({
    id: item.id,
    name: item.name
  }))
})

// アイテム数チェックルール（実3個+仮3個=最大6個）
const itemCountRule = (value) => {
  if (!value) return true

  const realCount = editingItems.value.filter(item => !item.isVirtual).length
  const virtualCount = editingItems.value.filter(item => item.isVirtual).length

  if (realCount > 3) return '実アイテムは最大3個までです'
  if (virtualCount > 3) return '仮アイテムは最大3個までです'
  if (value.length > 6) return 'アイテムは最大6個までです'

  return true
}

// アイテムチップの色を取得
const getItemChipColor = (itemId) => {
  const item = editingItems.value.find(i => i.itemId === itemId)
  if (!item) return 'primary'
  return item.isVirtual ? 'orange' : 'success'
}

// アイテム名を取得
const getItemName = (itemId) => {
  return dataStore.itemMastersMap.get(Number(itemId)) || '不明'
}

// アイテム選択変更時の処理
const onItemSelectionChange = (newIds) => {
  // 新しく追加されたアイテムは実アイテムとして追加
  const newItems = newIds.filter(id => !editingItems.value.some(item => item.itemId === id))

  // 削除されたアイテムを除外
  editingItems.value = editingItems.value.filter(item => newIds.includes(item.itemId))

  // 新規アイテムを追加（デフォルトは実アイテム、willRemove: false）
  newItems.forEach(id => {
    editingItems.value.push({
      itemId: Number(id),
      isVirtual: false,
      willRemove: false
    })
  })
}

// 実/仮想の切り替え
const toggleItemType = (itemId, value) => {
  const item = editingItems.value.find(i => i.itemId === itemId)
  if (item) {
    item.isVirtual = value === 'virtual'
  }
}

// モーダルを閉じる
const closeModal = () => {
  isOpen.value = false
  errorMessage.value = ''
}

// アイテムを保存
const saveItems = async () => {
  // バリデーション（実3個+仮3個=最大6個）
  const realCount = editingItems.value.filter(item => !item.isVirtual).length
  const virtualCount = editingItems.value.filter(item => item.isVirtual).length

  if (realCount > 3) {
    errorMessage.value = '実アイテムは最大3個までです'
    return
  }
  if (virtualCount > 3) {
    errorMessage.value = '仮アイテムは最大3個までです'
    return
  }
  if (editingItems.value.length > 6) {
    errorMessage.value = 'アイテムは最大6個までです'
    return
  }

  isSaving.value = true

  try {
    emit('save', {
      character: props.character,
      items: editingItems.value,
      isNew: props.isNewCharacter
    })

    closeModal()
  } catch (error) {
    errorMessage.value = `保存に失敗しました: ${error.message}`
  } finally {
    isSaving.value = false
  }
}

// モーダルが開いたときに既存のアイテムを読み込む
watch(() => props.character, (newChar) => {
  if (!newChar) {
    editingItems.value = []
    selectedItemIds.value = []
    return
  }

  // 既存のアイテムデータを新形式に変換してロード
  const items = ensureNewFormat(newChar.items || [])
  // ディープコピーして willRemove プロパティを確保
  editingItems.value = items.map(item => ({
    itemId: item.itemId,
    isVirtual: item.isVirtual || false,
    willRemove: item.willRemove || false
  }))
  selectedItemIds.value = items.map(item => item.itemId)
}, { immediate: true })
</script>

<style scoped>
.dialog-card {
  background-color: white !important;
}

.border {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>