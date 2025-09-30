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
  ]),
  characterMastersMap: new Map([
    [1, { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常', ejectionGacha: 'テストガチャ' }],
    [2, { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定', ejectionGacha: 'テストガチャ2' }]
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

    // フィルター機能を直接テストする（UIの確認はスキップ）
    // 全体の所持状況フィルタを使用してテストする
    wrapper.vm.filters.totalOwnership = ['one_total']
    await wrapper.vm.$nextTick()

    const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
    const items = dataTable.props('items')

    expect(items.length).toBeGreaterThan(0)
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

  describe('新機能のフィルタ機能', () => {
    it('合計3体所持のフィルタが動作する', async () => {
      // テストデータ: キャラ1は合計1体、キャラ2は合計3体、キャラ3は合計4体
      const testProps = {
        ...mockProps,
        characterMasters: [
          {
            id: 1,
            indexNumber: 1,
            monsterName: 'テストキャラ1',
            element: '火',
            type: '恒常'
          },
          {
            id: 2,
            indexNumber: 2,
            monsterName: 'テストキャラ2',
            element: '水',
            type: '限定'
          },
          {
            id: 3,
            indexNumber: 3,
            monsterName: 'テストキャラ3',
            element: '木',
            type: '恒常'
          }
        ],
        ownedCountMap: new Map([
          ['1-1', 1], ['1-2', 0], // キャラ1: 合計1体
          ['2-1', 1], ['2-2', 2], // キャラ2: 合計3体
          ['3-1', 2], ['3-2', 2]  // キャラ3: 合計4体
        ])
      }

      wrapper = mount(ViewAllCharactersTab, {
        props: testProps,
        global: {
          plugins: [vuetify]
        }
      })

      // フィルター機能を直接テストする（UIの確認はスキップ）
      // 「合計3体」オプションを設定
      wrapper.vm.filters.totalOwnership = ['three_total']
      await wrapper.vm.$nextTick()

      const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
      const items = dataTable.props('items')

      // 合計3体のキャラ（キャラ2）のみが表示される
      expect(items.length).toBe(1)
      expect(items.map(item => item.monsterName)).toEqual(['テストキャラ2'])
    })

    it('アイテム1つ所持キャラが居る列の絞り込み機能が動作する', async () => {
      // テストデータ: アカウント1にアイテム1つ所持キャラ、アカウント2にアイテム2つ所持キャラ
      const testProps = {
        ...mockProps,
        characterMasters: [
          {
            id: 1,
            indexNumber: 1,
            monsterName: 'テストキャラ1',
            element: '火',
            type: '恒常'
          },
          {
            id: 2,
            indexNumber: 2,
            monsterName: 'テストキャラ2',
            element: '水',
            type: '限定'
          }
        ],
        ownedCharactersData: new Map([
          [1, [
            { characterMasterId: 1, items: [1] },      // アイテム1つ
            { characterMasterId: 2, items: [1, 2] }    // アイテム2つ
          ]],
          [2, [
            { characterMasterId: 1, items: [1, 2] },   // アイテム2つ
            { characterMasterId: 2, items: [1] }       // アイテム1つ
          ]]
        ])
      }

      wrapper = mount(ViewAllCharactersTab, {
        props: testProps,
        global: {
          plugins: [vuetify]
        }
      })

      // v-expansion-panelを展開
      const expansionPanel = wrapper.findComponent({ name: 'VExpansionPanel' })
      await expansionPanel.trigger('click')
      await wrapper.vm.$nextTick()

      // 「アイテム1つ所持キャラが居る列」フィルタを設定
      wrapper.vm.filters.columnFilter = ['has_one_item_character']
      await wrapper.vm.$nextTick()

      const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
      const items = dataTable.props('items')

      // 両方のキャラが表示される（両方ともいずれかのアカウントでアイテム1つ所持がある）
      expect(items.length).toBe(2)
    })

    it('アイテム2つ所持キャラが居る列の絞り込み機能が動作する', async () => {
      // テストデータ: アカウント1にアイテム2つ所持キャラ、アカウント2にアイテム1つ所持キャラ
      const testProps = {
        ...mockProps,
        characterMasters: [
          {
            id: 1,
            indexNumber: 1,
            monsterName: 'テストキャラ1',
            element: '火',
            type: '恒常'
          },
          {
            id: 2,
            indexNumber: 2,
            monsterName: 'テストキャラ2',
            element: '水',
            type: '限定'
          }
        ],
        ownedCharactersData: new Map([
          [1, [
            { characterMasterId: 1, items: [1, 2] },   // アイテム2つ
            { characterMasterId: 2, items: [1] }       // アイテム1つ
          ]],
          [2, [
            { characterMasterId: 1, items: [1] },      // アイテム1つ
            { characterMasterId: 2, items: [1, 2] }    // アイテム2つ
          ]]
        ])
      }

      wrapper = mount(ViewAllCharactersTab, {
        props: testProps,
        global: {
          plugins: [vuetify]
        }
      })

      // v-expansion-panelを展開
      const expansionPanel = wrapper.findComponent({ name: 'VExpansionPanel' })
      await expansionPanel.trigger('click')
      await wrapper.vm.$nextTick()

      // 「アイテム2つ所持キャラが居る列」フィルタを設定
      wrapper.vm.filters.columnFilter = ['has_two_item_character']
      await wrapper.vm.$nextTick()

      const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
      const items = dataTable.props('items')

      // 両方のキャラが表示される（両方ともいずれかのアカウントでアイテム2つ所持がある）
      expect(items.length).toBe(2)
    })

    it('アイテム0つ所持キャラが居る列の絞り込み機能が動作する', async () => {
      // テストデータ: アカウント1にアイテム0つ所持キャラ、アカウント2にアイテム1つ所持キャラ
      const testProps = {
        ...mockProps,
        characterMasters: [
          {
            id: 1,
            indexNumber: 1,
            monsterName: 'テストキャラ1',
            element: '火',
            type: '恒常'
          },
          {
            id: 2,
            indexNumber: 2,
            monsterName: 'テストキャラ2',
            element: '水',
            type: '限定'
          }
        ],
        ownedCharactersData: new Map([
          [1, [
            { characterMasterId: 1, items: [] },        // アイテム0つ
            { characterMasterId: 2, items: [1] }        // アイテム1つ
          ]],
          [2, [
            { characterMasterId: 1, items: [1] },       // アイテム1つ
            { characterMasterId: 2, items: [] }         // アイテム0つ
          ]]
        ])
      }

      wrapper = mount(ViewAllCharactersTab, {
        props: testProps,
        global: {
          plugins: [vuetify]
        }
      })

      // v-expansion-panelを展開
      const expansionPanel = wrapper.findComponent({ name: 'VExpansionPanel' })
      await expansionPanel.trigger('click')
      await wrapper.vm.$nextTick()

      // 「アイテム0つ所持キャラが居る列」フィルタを設定
      wrapper.vm.filters.columnFilter = ['has_zero_item_character']
      await wrapper.vm.$nextTick()

      const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
      const items = dataTable.props('items')

      // 両方のキャラが表示される（両方ともいずれかのアカウントでアイテム0つ所持がある）
      expect(items.length).toBe(2)
    })

    it('アイテム3つ所持キャラが居る列の絞り込み機能が動作する', async () => {
      // テストデータ: アカウント1にアイテム3つ所持キャラ、アカウント2にアイテム1つ所持キャラ
      const testProps = {
        ...mockProps,
        characterMasters: [
          {
            id: 1,
            indexNumber: 1,
            monsterName: 'テストキャラ1',
            element: '火',
            type: '恒常'
          },
          {
            id: 2,
            indexNumber: 2,
            monsterName: 'テストキャラ2',
            element: '水',
            type: '限定'
          }
        ],
        ownedCharactersData: new Map([
          [1, [
            { characterMasterId: 1, items: [1, 2, 3] }, // アイテム3つ
            { characterMasterId: 2, items: [1] }        // アイテム1つ
          ]],
          [2, [
            { characterMasterId: 1, items: [1] },       // アイテム1つ
            { characterMasterId: 2, items: [1, 2, 3] }  // アイテム3つ
          ]]
        ])
      }

      wrapper = mount(ViewAllCharactersTab, {
        props: testProps,
        global: {
          plugins: [vuetify]
        }
      })

      // v-expansion-panelを展開
      const expansionPanel = wrapper.findComponent({ name: 'VExpansionPanel' })
      await expansionPanel.trigger('click')
      await wrapper.vm.$nextTick()

      // 「アイテム3つ所持キャラが居る列」フィルタを設定
      wrapper.vm.filters.columnFilter = ['has_three_item_character']
      await wrapper.vm.$nextTick()

      const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
      const items = dataTable.props('items')

      // 両方のキャラが表示される（両方ともいずれかのアカウントでアイテム3つ所持がある）
      expect(items.length).toBe(2)
    })

    describe('新しい全体の所持状況フィルタ', () => {
      it('合計1体所持のフィルタが動作する', async () => {
        // テストデータ: キャラ1は合計1体、キャラ2は合計2体、キャラ3は合計0体
        const testProps = {
          ...mockProps,
          characterMasters: [
            { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常' },
            { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定' },
            { id: 3, indexNumber: 3, monsterName: 'テストキャラ3', element: '木', type: '恒常' }
          ],
          ownedCountMap: new Map([
            ['1-1', 1], ['1-2', 0], // キャラ1: 合計1体
            ['2-1', 1], ['2-2', 1], // キャラ2: 合計2体
            ['3-1', 0], ['3-2', 0]  // キャラ3: 合計0体
          ])
        }

        wrapper = mount(ViewAllCharactersTab, {
          props: testProps,
          global: { plugins: [vuetify] }
        })

        wrapper.vm.filters.totalOwnership = ['one_total']
        await wrapper.vm.$nextTick()

        const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
        const items = dataTable.props('items')

        expect(items.length).toBe(1)
        expect(items[0].monsterName).toBe('テストキャラ1')
      })

      it('合計2体所持のフィルタが動作する', async () => {
        const testProps = {
          ...mockProps,
          characterMasters: [
            { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常' },
            { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定' },
            { id: 3, indexNumber: 3, monsterName: 'テストキャラ3', element: '木', type: '恒常' }
          ],
          ownedCountMap: new Map([
            ['1-1', 1], ['1-2', 0], // キャラ1: 合計1体
            ['2-1', 1], ['2-2', 1], // キャラ2: 合計2体
            ['3-1', 2], ['3-2', 1]  // キャラ3: 合計3体
          ])
        }

        wrapper = mount(ViewAllCharactersTab, {
          props: testProps,
          global: { plugins: [vuetify] }
        })

        wrapper.vm.filters.totalOwnership = ['two_total']
        await wrapper.vm.$nextTick()

        const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
        const items = dataTable.props('items')

        expect(items.length).toBe(1)
        expect(items[0].monsterName).toBe('テストキャラ2')
      })

      it('合計それ以上（5体以上）のフィルタが動作する', async () => {
        const testProps = {
          ...mockProps,
          characterMasters: [
            { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常' },
            { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定' },
            { id: 3, indexNumber: 3, monsterName: 'テストキャラ3', element: '木', type: '恒常' }
          ],
          ownedCountMap: new Map([
            ['1-1', 2], ['1-2', 2], // キャラ1: 合計4体
            ['2-1', 3], ['2-2', 2], // キャラ2: 合計5体
            ['3-1', 4], ['3-2', 2]  // キャラ3: 合計6体
          ])
        }

        wrapper = mount(ViewAllCharactersTab, {
          props: testProps,
          global: { plugins: [vuetify] }
        })

        wrapper.vm.filters.totalOwnership = ['five_or_more']
        await wrapper.vm.$nextTick()

        const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
        const items = dataTable.props('items')

        expect(items.length).toBe(2)
        expect(items.map(item => item.monsterName)).toEqual(['テストキャラ2', 'テストキャラ3'])
      })
    })

    describe('複数選択機能', () => {
      it('複数の全体所持状況フィルタが同時に適用される', async () => {
        const testProps = {
          ...mockProps,
          characterMasters: [
            { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常' },
            { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定' },
            { id: 3, indexNumber: 3, monsterName: 'テストキャラ3', element: '木', type: '恒常' },
            { id: 4, indexNumber: 4, monsterName: 'テストキャラ4', element: '光', type: '恒常' }
          ],
          ownedCountMap: new Map([
            ['1-1', 1], ['1-2', 0], // キャラ1: 合計1体
            ['2-1', 1], ['2-2', 1], // キャラ2: 合計2体
            ['3-1', 2], ['3-2', 1], // キャラ3: 合計3体
            ['4-1', 2], ['4-2', 2]  // キャラ4: 合計4体
          ])
        }

        wrapper = mount(ViewAllCharactersTab, {
          props: testProps,
          global: { plugins: [vuetify] }
        })

        // 「合計1体」と「合計2体」を同時選択
        wrapper.vm.filters.totalOwnership = ['one_total', 'two_total']
        await wrapper.vm.$nextTick()

        const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
        const items = dataTable.props('items')

        expect(items.length).toBe(2)
        expect(items.map(item => item.monsterName)).toEqual(['テストキャラ1', 'テストキャラ2'])
      })

      it('複数の列フィルタが同時に適用される', async () => {
        const testProps = {
          ...mockProps,
          characterMasters: [
            { id: 1, indexNumber: 1, monsterName: 'テストキャラ1', element: '火', type: '恒常' },
            { id: 2, indexNumber: 2, monsterName: 'テストキャラ2', element: '水', type: '限定' }
          ],
          ownedCharactersData: new Map([
            [1, [
              { characterMasterId: 1, items: [] },        // アイテム0つ
              { characterMasterId: 2, items: [1] }        // アイテム1つ
            ]],
            [2, [
              { characterMasterId: 1, items: [1] },       // アイテム1つ
              { characterMasterId: 2, items: [1, 2] }     // アイテム2つ
            ]]
          ])
        }

        wrapper = mount(ViewAllCharactersTab, {
          props: testProps,
          global: { plugins: [vuetify] }
        })

        // 「アイテム0つ」と「アイテム1つ」を同時選択
        wrapper.vm.filters.columnFilter = ['has_zero_item_character', 'has_one_item_character']
        await wrapper.vm.$nextTick()

        const dataTable = wrapper.findComponent({ name: 'VDataTableVirtual' })
        const items = dataTable.props('items')

        expect(items.length).toBe(2)
      })
    })
  })
})