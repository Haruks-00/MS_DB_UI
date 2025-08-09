<template>
  <div>
    <h2>所持状況一覧</h2>
    
    <!-- INFO: 多数のフィルターをExpansion Panelに格納し、UIを整理します -->
    <v-expansion-panels class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon start icon="mdi-filter-variant"></v-icon>
          フィルターとオプション
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4"><v-text-field v-model.lazy="filters.charSearch" label="キャラクター名 or 図鑑番号" variant="outlined" density="compact" clearable></v-text-field></v-col>
              <v-col cols="12" md="4"><v-select v-model="filters.element" :items="['火', '水', '木', '光', '闇']" label="属性" variant="outlined" density="compact" clearable></v-select></v-col>
              <v-col cols="12" md="4"><v-select v-model="filters.itemSearch" :items="itemMasters" item-title="name" item-value="id" label="アイテム名" variant="outlined" density="compact" clearable></v-select></v-col>
              <v-col cols="12" md="4"><v-select v-model="filters.type" :items="['恒常_or_限定', ...characterTypes]" label="分類 (Type)" variant="outlined" density="compact" clearable></v-select></v-col>
              <v-col cols="12" md="4"><v-select v-model="filters.gachaSearch" :items="gachaMasters" item-title="name" item-value="name" label="排出ガチャ" variant="outlined" density="compact" clearable></v-select></v-col>
              <v-col cols="12" md="4"><v-select v-model="filters.totalOwnership" :items="[{value:'all_unowned', title:'全アカウントで未所持'}, {value:'four_or_more', title:'合計4体以上'}, {value:'one_in_each', title:'各アカウントで1体以上所持'}]" label="全体の所持状況" variant="outlined" density="compact" clearable></v-select></v-col>

              <v-col cols="12"><v-divider class="my-2"></v-divider><v-subheader>単一アカウントでの絞り込み</v-subheader></v-col>
              
              <v-col cols="12" md="6"><v-select v-model="filters.account" :items="accounts" item-title="name" item-value="id" label="アカウント" variant="outlined" density="compact" clearable></v-select></v-col>
              <v-col cols="12" md="6"><v-select v-model="filters.ownership" :items="[{value:'owned', title:'所持'}, {value:'unowned', title:'未所持'}, {value:'one', title:'1体所持'}, {value:'two', title:'2体所持'}]" label="所持状況 (指定アカウント内)" variant="outlined" density="compact" clearable></v-select></v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="showExtraColumns = !showExtraColumns" variant="tonal">{{ showExtraColumns ? '詳細を非表示' : '詳細を表示' }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="resetFilters" color="secondary" variant="outlined">リセット</v-btn>
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="text-subtitle-1">表示件数: {{ filteredMasters.length }} / {{ characterMasters.length }}</div>
    </div>
    
    <!-- INFO: v-tableは複雑なヘッダー構造を維持したままVuetifyのスタイルを適用できるため最適です -->
    <v-table fixed-header height="70vh" density="compact">
        <thead>
          <tr>
            <th rowspan="2">図鑑No.</th>
            <th rowspan="2">キャラ名</th>
            <th rowspan="2" v-show="showExtraColumns">属性</th>
            <th rowspan="2" v-show="showExtraColumns">分類</th>
            <th rowspan="2" v-show="showExtraColumns">排出ガチャ</th>
          <th v-for="acc in accounts" :key="acc.id         " colspan="2" class="text-center">{{ acc.name  }}</th>
          </tr>
          <tr>
            <template v-for="acc in accounts" :key="acc.id">
            <th class="text-center">1</th>
            <th class="text-center">2</th>
            </template>
          </tr>
        </thead>
        <tbody>
        <tr v-if="!dataLoaded"><td :colspan="5 + accounts.length * 2">データを読み込んでいます...</td></tr>
        <tr v-else-if="filteredMasters.length === 0"><td :colspan="5 + accounts.length * 2">該当するキャラクターがいません</td></tr>
        <tr v-for="master in filteredMasters" :key="master.id          ">
            <td>{{ master.indexNumber || '—' }}</td>
            <td>{{ master.monsterName || '—' }}</td>
            <td v-show="showExtraColumns" :class="'element-' + (master.element || '').toLowerCase()">{{ master.element || '—' }}</td>
            <td v-show="showExtraColumns">{{ master.type || '—' }}</td>
            <td v-show="showExtraColumns">{{ master.ejectionGacha || '—' }}</td>
            <template v-for="acc in accounts" :key="acc.id">
              <td :class="getOwnedStatusClass(master.id, acc.id, 1)" v-html="getDisplayCellContent(master.id, acc.id, 0)"></td>
              <td :class="getOwnedStatusClass(master.id, acc.id, 2)" v-html="getDisplayCellContent(master.id, acc.id, 1)"></td>
            </template>
          </tr>
        </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
  dataLoaded: { type: Boolean, required: true },
  accounts: { type: Array, required: true },
  characterMasters: { type: Array, required: true },
  itemMasters: { type: Array, required: true },
  gachaMasters: { type: Array, required: true },
  ownedCountMap: { type: Map, required: true },
  ownedCharactersData: { type: Map, required: true },
  itemMastersMap: { type: Map, required: true },
});

const showExtraColumns = ref(false);

const createInitialFiltersState = () => ({
  charSearch: '',
  element: '',
  itemSearch: '',
  type: '',
  gachaSearch: '',
  totalOwnership: '',
  account: '',
  ownership: ''
});

const filters = reactive(createInitialFiltersState());

const characterTypes = computed(() => {
  return Array.from(new Set(props.characterMasters.map (m => m.type).filter(Boolean))).sort();
});

const filteredMasters = computed(() => {
  if (!props.dataLoaded) return [];

    const { charSearch, element, itemSearch, type, gachaSearch, totalOwnership, account, ownership } = filters;
  const lowerCharSearch = charSearch.toLowerCase();
  const searchItemId = itemSearch ? Number(itemSearch) : null;

  return props.characterMasters.filter(master => {
    if (lowerCharSearch && !master.monsterName.toLowerCase().includes(lowerCharSearch) && !(master.indexNumber + '').includes(lowerCharSearch)) return false;
    if (element && master.element !== element) return false;
    if (type) {
      if (type === '恒常_or_限定') {
        if (master.type !== '恒常' && master.type !== '限定') return false;
      } else {
        if (master.type !== type) return false;
      }
    }
    if (gachaSearch && (master.ejectionGacha || '') !== gachaSearch) return false;
    
    if (searchItemId) {
      let hasItem = false;
      const targetAccount = account || null;
      if (targetAccount) {
        hasItem = (props.ownedCharactersData.get(targetAccount) || []).some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId));
      } else {
        for (const ownedChars of props.ownedCharactersData.values()) {
          if (ownedChars.some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId))) {
            hasItem = true;
            break;
          }
        }
      }
      if (!hasItem) return false;
    }

    const totalOwnedCount = props.accounts.reduce((sum, acc) => sum + getOwnedCount(master.id, acc.id), 0);
    if (totalOwnership === 'all_unowned' && totalOwnedCount > 0) return false;
    if (totalOwnership === 'four_or_more' && totalOwnedCount < 4) return false;
    if (totalOwnership === 'one_in_each' && !props.accounts.every(acc => getOwnedCount(master.id, acc.id) >= 1)) return false;

    if (account && ownership) {
      const countInAccount = getOwnedCount(master.id, account);
      if (ownership === 'owned' && countInAccount === 0) return false;
      if (ownership === 'unowned' && countInAccount > 0) return false;
      if (ownership === 'one' && countInAccount !== 1) return false;
      if (ownership === 'two' && countInAccount !== 2) return false;
    }
    
    return true;
  });
});

const getOwnedCount = (masterId, accountId) => {
  return props.ownedCountMap.get(`${masterId}-${accountId}`) || 0;
};

const getDisplayCellContent = (masterId, accountId, index) => {
  const ownedList = (props.ownedCharactersData.get(accountId) || []).filter(c => c.characterMasterId === masterId);
  if (!ownedList || ownedList.length <= index) return '—';
  const itemNames = (ownedList[index].items || []).map(id => props.itemMastersMap.get(Number(id))).filter(Boolean);
  return itemNames.length > 0 ? '✔️<br>' + itemNames.join('<br>') : '✔️';
};

const getOwnedStatusClass = (masterId, accountId, requiredCount) => {
  return getOwnedCount(masterId, accountId) >= requiredCount ? 'status-owned' : 'status-unowned';
};

const resetFilters = () => {
  Object.assign(filters, createInitialFiltersState());
};
</script>

<style>
/* INFO: v-table内でカスタムスタイルを適用するため、scopedを外しています */
.v-table .status-owned {
  text-align: center;
  font-weight: bold;
  background-color: #e8f5e9; /* Light green */
}
.v-table .status-unowned {
  text-align: center;
  color: #bdbdbd; /* Lighter grey */
}
.v-table .element-火 { background-color: #ffebee; }
.v-table .element-水 { background-color: #e3f2fd; }
.v-table .element-木 { background-color: #e8f5e9; }
.v-table .element-光 { background-color: #fffde7; }
.v-table .element-闇 { background-color: #f3e5f5; }
</style>