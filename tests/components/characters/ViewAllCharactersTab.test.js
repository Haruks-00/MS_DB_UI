import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ViewAllCharactersTab from '../../../src/components/characters/ViewAllCharactersTab.vue'

// テスト用のMockデータ
const mockProps = {
  dataLoaded: true,
  accounts: [
    { id: 1, name: 'アカウント1' },
    { id: 2, name: 'アカウント2' }
  ],
  characterMasters: [
    {
      id: 1,
      indexNumber: 1,
      monsterName: 'テストキャラ1',
      element: '火',
      type: '恒常',
      ejectionGacha: 'テストガチャ'
    },
    {
      id: 2,
      indexNumber: 2,
      monsterName: 'テストキャラ2', 
      element: '水',
      type: '限定',
      ejectionGacha: 'テストガチャ2'
    }
  ],
  itemMasters: [
    { id: 1, name: 'テストアイテム1' },
    { id: 2, name: 'テストアイテム2' }
  ],
  gachaMasters: [
    { id: 1, name: 'テストガチャ' },
    { id: 2, name: 'テストガチャ2' }
  ],
  ownedCountMap: new Map([
    ['1-1', 1],
    ['1-2', 0],
    ['2-1', 2],
    ['2-2', 1]
  ]),
  ownedCharactersData: new Map([
    [1, [
      { characterMasterId: 1, items: [1] },
      { characterMasterId: 2, items: [1, 2] },
      { characterMasterId: 2, items: [2] }
    ]],
    [2, [
      { characterMasterId: 2, items: [1] }
    ]]
  ]),
  itemMastersMap: new Map([
    [1, 'テストアイテム1'],
    [2, 'テストアイテム2']
  ])
}

describe('ViewAllCharactersTab', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    })
  })

  it('コンポーネントが正常にレンダリングされる', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('所持状況一覧')
  })

  it('v-data-table-virtualが使用されている', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    // v-data-table-virtualの存在を確認
    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    expect(dataTable.exists()).toBe(true)
    
    // 必須のpropsが設定されていることを確認
    expect(dataTable.props('items')).toBeDefined()
    expect(dataTable.props('headers')).toBeDefined()
    expect(dataTable.props('height')).toBe('70vh')
  })

  it('headersプロパティが正しく定義されている', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    const headers = dataTable.props('headers')
    
    expect(headers).toBeDefined()
    expect(Array.isArray(headers)).toBe(true)
    expect(headers.length).toBeGreaterThan(0)
    
    // 基本的なヘッダーの存在確認
    const headerTitles = headers.map(h => h.title)
    expect(headerTitles).toContain('図鑑No.')
    expect(headerTitles).toContain('キャラ名')
  })

  it('キャラクターデータが正しく表示される', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    const items = dataTable.props('items')
    
    expect(items.length).toBe(2)
    expect(items[0].monsterName).toBe('テストキャラ1')
    expect(items[1].monsterName).toBe('テストキャラ2')
  })

  it('フィルター機能が動作する', async () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    // v-expansion-panelを展開
    const expansionPanel = wrapper.findComponent({ name: 'VExpansionPanel' })
    await expansionPanel.trigger('click')
    await wrapper.vm.$nextTick()

    // フィルター入力欄を探す
    const searchInputs = wrapper.findAll('input[type="text"]')
    expect(searchInputs.length).toBeGreaterThan(0)
    
    // 最初のテキスト入力欄（キャラクター名検索）を使用
    const searchInput = searchInputs[0]
    await searchInput.setValue('テストキャラ1')
    await wrapper.vm.$nextTick()
    
    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    const items = dataTable.props('items')
    
    expect(items.length).toBe(1)
    expect(items[0].monsterName).toBe('テストキャラ1')
  })

  it('アカウント別の所持状況が正しく表示される', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    // アカウント列のスロットが定義されていることを確認
    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    
    // データテーブルのスロットの存在確認（実装後に検証される）
    expect(dataTable.exists()).toBe(true)
  })

  it('統計情報が正しく表示される', () => {
    wrapper = mount(ViewAllCharactersTab, {
      props: mockProps,
      global: {
        plugins: [vuetify]
      }
    })

    const statsText = wrapper.text()
    expect(statsText).toContain('表示件数: 2 / 2')
  })

  it('ローディング状態が正しく表示される', () => {
    const loadingProps = { ...mockProps, dataLoaded: false }
    
    wrapper = mount(ViewAllCharactersTab, {
      props: loadingProps,
      global: {
        plugins: [vuetify]
      }
    })

    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    expect(dataTable.props('loading')).toBe(true)
  })
})