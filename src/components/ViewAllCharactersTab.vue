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
            <template v-for="acc in accounts">
              <th :key="acc.id + '-1'">1</th>
              <th :key="acc.id + '-2'">2</th>
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
          <tr v-for="master in filteredMasters" :key="master.id            ">
            <td>{{ master.indexNumber || '—' }}</td>
            <td>{{ master.monsterName || '—' }}</td>
            <td v-show="showExtraColumns" :class="'element-' + (master.element || '').toLowerCase()">{{ master.element || '—' }}</td>
            <td v-show="showExtraColumns">{{ master.type || '—' }}</td>
            <td v-show="showExtraColumns">{{ master.ejectionGacha || '—' }}</td>
            <template v-for="acc in accounts">
              <td :key="acc.id + '-1'" :class="getOwnedStatusClass(master.id, acc.id, 1)" v-html="getDisplayCellContent(master.id, acc.id, 0)"></td>
              <td :key="acc.id + '-2'" :class="getOwnedStatusClass(master.id, acc.id, 2)" v-html="getDisplayCellContent(master.id, acc.id, 1)"></td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/**
 * [概要] 全キャラクターの所持状況一覧を表示・フィルタリングするタブUIコンポーネント。
 * @note 表示とフィルタリングに関するロジックのみを管理し、データ自体は親から受け取る。
 */
export default {
  name: 'ViewAllCharactersTab',
  props: {
    dataLoaded: { type: Boolean, required: true },
    accounts: { type: Array, required: true },
    characterMasters: { type: Array, required: true },
    itemMasters: { type: Array, required: true },
    gachaMasters: { type: Array, required: true },
    ownedCountMap: { type: Map, required: true },
    ownedCharactersData: { type: Map, required: true },
    itemMastersMap: { type: Map, required: true },
  },

  data() {
    return {
      showExtraColumns: false,
      filters: {
        charSearch: '',
        element: '',
        itemSearch: '',
        type: '',
        gachaSearch: '',
        totalOwnership: '',
        account: '',
        ownership: ''
      },
    }
  },

  computed: {
    /**
     * [概要] マスターリストからユニークなキャラクター分類を抽出して返す。
     * @returns {Array<string>} ソート済みのキャラクター分類リスト
     */
    characterTypes() {
      return Array.from(new Set(this.characterMasters.map  (m => m.type).filter(Boolean))).sort();
    },

    /**
     * [概要] フィルタ条件に基づいて表示対象のキャラクターマスターリストを返す。
     * @returns {Array<Object>} フィルタリングされたキャラクターマスターの配列
     */
    filteredMasters() {
      // INFO: データが未ロードの場合は処理を中断
      if (!this.dataLoaded) return [];

      const { charSearch, element, itemSearch, type, gachaSearch, totalOwnership, account, ownership } = this.filters;
      const lowerCharSearch = charSearch.toLowerCase();
      const searchItemId = itemSearch ? Number(itemSearch) : null;

      return this.characterMasters.filter(master => {
        // NOTE: 各フィルタ条件を順番にチェックし、一つでも合致しない場合はfalseを返すことで効率化
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
        
        // NOTE: アイテム所持での絞り込み
        if (searchItemId) {
          let hasItem = false;
          const targetAccount = account || null;
          if (targetAccount) {
            // INFO: 単一アカウントでの検索
            hasItem = (this.ownedCharactersData.get(targetAccount) || []).some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId));
          } else {
            // INFO: 全アカウント横断での検索
            for (const ownedChars of this.ownedCharactersData.values()) {
              if (ownedChars.some(char => char.characterMasterId === master.id && char.items?.some(itemId => Number(itemId) === searchItemId))) {
                hasItem = true;
                break;
              }
            }
          }
          if (!hasItem) return false;
        }

        // NOTE: 全体所持状況での絞り込み
        const totalOwnedCount = this.accounts.reduce((sum, acc) => sum + this.getOwnedCount(master.id, acc.id), 0);
        if (totalOwnership === 'all_unowned' && totalOwnedCount > 0) return false;
        if (totalOwnership === 'four_or_more' && totalOwnedCount < 4) return false;
        if (totalOwnership === 'one_in_each' && !this.accounts.every(acc => this.getOwnedCount(master.id, acc.id) >= 1)) return false;

        // NOTE: 単一アカウントの所持状況での絞り込み
        if (account && ownership) {
          const countInAccount = this.getOwnedCount(master.id, account);
          if (ownership === 'owned' && countInAccount === 0) return false;
          if (ownership === 'unowned' && countInAccount > 0) return false;
          if (ownership === 'one' && countInAccount !== 1) return false;
          if (ownership === 'two' && countInAccount !== 2) return false;
        }
        
        return true;
      });
    },
  },

  methods: {
    /**
     * [概要] 特定アカウントにおけるキャラクターの所持数を返す。
     * @param {string} masterId - キャラクターマスターID
     * @param {string} accountId - アカウントID
     * @returns {number} 所持数 (0-2)
     */
    getOwnedCount(masterId, accountId) {
      return this.ownedCountMap.get(`${masterId}-${accountId}`) || 0;
    },
    
    /**
     * [概要] テーブルセルに表示する内容（所持マークとアイテムリスト）をHTML文字列として生成する。
     * @param {string} masterId - キャラクターマスターID
     * @param {string} accountId - アカウントID
     * @param {number} index - 何体目のキャラクターかを示すインデックス (0 or 1)
     * @returns {string} 表示用のHTML文字列
     */
    getDisplayCellContent(masterId, accountId, index) {
      const ownedList = (this.ownedCharactersData.get(accountId) || []).filter(c => c.characterMasterId === masterId);
      if (!ownedList || ownedList.length <= index) return '—';
      const itemNames = (ownedList[index].items || []).map(id => this.itemMastersMap.get(Number(id))).filter(Boolean);
      // HACK: <br>を直接埋め込むことで、v-htmlでの改行を実現している。
      return itemNames.length > 0 ? '✔️<br>' + itemNames.join('<br>') : '✔️';
    },

    /**
     * [概要] 所持数に応じてテーブルセルに適用するCSSクラスを返す。
     * @param {string} masterId - キャラクターマスターID
     * @param {string} accountId - アカウントID
     * @param {number} requiredCount - 必要所持数
     * @returns {string} 'status-owned' または 'status-unowned'
     */
    getOwnedStatusClass(masterId, accountId, requiredCount) {
      return this.getOwnedCount(masterId, accountId) >= requiredCount ? 'status-owned' : 'status-unowned';
    },

    /**
     * [概要] すべてのフィルタ条件を初期状態にリセットする。
     */
    resetFilters() {
      this.filters = { charSearch: '', element: '', itemSearch: '', type: '', gachaSearch: '', totalOwnership: '', account: '', ownership: '' };
    },
  },
}
</script>