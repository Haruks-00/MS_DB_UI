<template>
  <div id="tab-view-all" class="tab-content">
    <h2>所持状況一覧</h2>
    <div class="search-filters">
      <div>
        <label>キャラクター名:</label>
        <input type="text" v-model.lazy="filters.charSearch" placeholder="名前 or 図鑑番号">
      </div>
      <div>
        <label>属性:</label>
        <select v-model="filters.element">
          <option value="">すべて</option>
          <option v-for="e in ['火', '水', '木', '光', '闇']" :key="e" :value="e">{{ e }}</option>
        </select>
      </div>
      <div>
        <label>アイテム名:</label>
        <select v-model="filters.itemSearch">
          <option value="">すべて</option>
          <option v-for="item in itemMasters" :key="item.id    " :value="item.id">{{ item.name   }}</option>
        </select>
      </div>
      <div>
        <label>分類 (Type):</label>
        <select v-model="filters.type">
          <option value="">すべて</option>
          <option value="恒常_or_限定">恒常 or 限定</option>
          <option v-for="t in characterTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <div>
        <label>排出ガチャ:</label>
        <select v-model="filters.gachaSearch">
          <option value="">すべて</option>
          <option v-for="gacha in gachaMasters" :key="gacha.id     " :value="gacha.name      ">{{ gacha.name }}</option>
        </select>
      </div>
      <div>
        <label>全体の所持状況:</label>
        <select v-model="filters.totalOwnership">
          <option value="">すべて</option>
          <option value="all_unowned">全アカウントで未所持 (合計0体)</option>
          <option value="four_or_more">全アカウントで合計4体以上</option>
          <option value="one_in_each">各アカウントで1体以上所持</option>
        </select>
      </div>
      <div style="flex-basis: 100%; border-top: 1px dashed #ccc; padding-top: 15px; margin-top: 10px;">
        <label style="font-weight: normal;">--- 単一アカウントでの絞り込み ---</label>
      </div>
      <div>
        <label>アカウント:</label>
        <select v-model="filters.account">
          <option value="">指定しない</option>
          <option v-for="account in accounts" :key="account.id      " :value="account.id">{{ account.name   }}</option>
        </select>
      </div>
      <div>
        <label>所持状況 (指定アカウント内):</label>
        <select v-model="filters.ownership">
          <option value="">すべて</option>
          <option value="owned">所持</option>
          <option value="unowned">未所持</option>
          <option value="one">1体所持</option>
          <option value="two">2体所持</option>
        </select>
      </div>
    </div>
    <div class="filter-buttons">
      <button @click="resetFilters">リセット</button>
      <button @click="showExtraColumns = !showExtraColumns">詳細表示/非表示</button>
    </div>
    <div id="status-bar">表示件数: {{ filteredMasters.length }} / {{ characterMasters.length }}</div>
    <div style="overflow-x: auto;">
      <table id="all-characters-table">
        <thead>
          <tr>
            <th rowspan="2">図鑑No.</th>
            <th rowspan="2">キャラ名</th>
            <th rowspan="2" v-show="showExtraColumns">属性</th>
            <th rowspan="2" v-show="showExtraColumns">分類</th>
            <th rowspan="2" v-show="showExtraColumns">排出ガチャ</th>
            <th v-for="acc in accounts" :key="acc.id              " colspan="2">{{ acc.name  }}</th>
          </tr>
          <tr>
            <template v-for="acc in accounts" :key="acc.id">
              <th>1</th>
              <th>2</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!dataLoaded">
            <td :colspan="2 + (showExtraColumns ? 3 : 0) + accounts.length * 2">データを読み込んでいます...</td>
          </tr>
          <tr v-else-if="filteredMasters.length === 0">
            <td :colspan="2 + (showExtraColumns ? 3 : 0) + accounts.length * 2">該当するキャラクターがいません</td>
          </tr>
          <tr v-for="master in filteredMasters" :key="master.id">
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
      </table>
    </div>
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

  // INFO: 구조 분해 할당을 사용하여 필터 값에 더 쉽게 접근합니다.
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