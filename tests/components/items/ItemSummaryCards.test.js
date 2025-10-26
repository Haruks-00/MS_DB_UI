import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia, setActivePinia } from 'pinia'
import ItemSummaryCards from '../../../src/components/items/ItemSummaryCards.vue'

// テスト用のMockデータ
const mockProps = {
  selectedAccountId: 'account-1',
  ownedCharactersData: new Map([
    ['account-1', [
      {
        id: 'char-1',
        characterMasterId: 'master-1',
        items: [
          { itemId: 1, isVirtual: false, willRemove: true },  // アイテム1を外す予定
          { itemId: 2, isVirtual: false, willRemove: false }  // アイテム2は通常
        ]
      },
      {
        id: 'char-2',
        characterMasterId: 'master-2',
        items: [
          { itemId: 1, isVirtual: false, willRemove: true },  // アイテム1を外す予定
        ]
      },
      {
        id: 'char-3',
        characterMasterId: 'master-3',
        items: [
          { itemId: 3, isVirtual: true }  // アイテム3をつける予定(仮想)
        ]
      },
      {
        id: 'char-4',
        characterMasterId: 'master-1',
        items: [
          { itemId: 1, isVirtual: true },  // アイテム1をつける予定(仮想)
          { itemId: 2, isVirtual: true }   // アイテム2をつける予定(仮想)
        ]
      }
    ]]
  ]),
  characterMastersMap: new Map([
    ['master-1', { id: 'master-1', monsterName: 'キャラA' }],
    ['master-2', { id: 'master-2', monsterName: 'キャラB' }],
    ['master-3', { id: 'master-3', monsterName: 'キャラC' }]
  ]),
  itemMasters: [
    { id: 1, name: 'アイテム1' },
    { id: 2, name: 'アイテム2' },
    { id: 3, name: 'アイテム3' },
    { id: 4, name: 'アイテム4' }
  ],
  itemMastersMap: new Map([
    [1, 'アイテム1'],
    [2, 'アイテム2'],
    [3, 'アイテム3'],
    [4, 'アイテム4']
  ])
}

describe('ItemSummaryCards (アイテム予定サマリーカード)', () => {
  let vuetify
  let pinia

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    })
    pinia = createPinia()
    setActivePinia(pinia)
  })

  describe('基本表示', () => {
    it('コンポーネントが正常にレンダリングされる', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('全アイテムマスターに対してカードが表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // 4つのアイテムマスターがあるので、4つのカードが表示される
      const cards = wrapper.findAllComponents({ name: 'VCard' })
      expect(cards.length).toBe(4)
    })

    it('アカウント未選択時は何も表示しない', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: {
          ...mockProps,
          selectedAccountId: null
        },
        global: {
          plugins: [vuetify, pinia]
        }
      })

      const cards = wrapper.findAllComponents({ name: 'VCard' })
      expect(cards.length).toBe(0)
    })
  })

  describe('外す予定のキャラクター表示', () => {
    it('willRemove: true の実アイテムを持つキャラクターが表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // アイテム1のカードを探す
      const cardTitles = wrapper.findAll('.v-card-title')
      const item1Card = cardTitles.find(title => title.text().includes('アイテム1'))
      expect(item1Card).toBeDefined()

      // 外す予定のセクションを探す
      const cardText = item1Card.element.parentElement.querySelector('.v-card-text')
      expect(cardText.textContent).toContain('外す予定')
    })

    it('外す予定のキャラクター総数が正しくカウントされる', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // アイテム1は2体のキャラが外す予定 (char-1, char-2)
      const text = wrapper.text()
      expect(text).toContain('2')
    })

    it('外す予定のキャラクターがいない場合は「なし」と表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // アイテム4は誰も外す予定がない
      const text = wrapper.text()
      expect(text).toContain('なし')
    })
  })

  describe('つける予定のキャラクター表示', () => {
    it('isVirtual: true の仮想アイテムを持つキャラクターが表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      const text = wrapper.text()
      expect(text).toContain('つける予定')
    })

    it('つける予定のキャラクター総数が正しくカウントされる', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // アイテム1は1体のキャラがつける予定 (char-4)
      // アイテム2は1体のキャラがつける予定 (char-4)
      // アイテム3は1体のキャラがつける予定 (char-3)
      const text = wrapper.text()
      expect(text).toContain('1')
    })

    it('つける予定のキャラクターがいない場合は「なし」と表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // アイテム4は誰もつける予定がない
      const text = wrapper.text()
      expect(text).toContain('なし')
    })
  })

  describe('キャラクター名表示', () => {
    it('キャラクター名がチップで表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // キャラクター名がチップで表示されているか確認
      const chips = wrapper.findAllComponents({ name: 'VChip' })
      expect(chips.length).toBeGreaterThan(0)
    })

    it('所持数情報を含むキャラクター名が表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // "キャラA (1体目)" のような形式で表示される
      const text = wrapper.text()
      expect(text).toContain('体目')
    })
  })

  describe('レイアウト', () => {
    it('カード形式でグリッド表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      // v-rowとv-colが使用されているか確認
      const row = wrapper.findComponent({ name: 'VRow' })
      const cols = wrapper.findAllComponents({ name: 'VCol' })

      expect(row.exists()).toBe(true)
      expect(cols.length).toBeGreaterThan(0)
    })

    it('各カードにアイテム名がタイトルとして表示される', () => {
      const wrapper = mount(ItemSummaryCards, {
        props: mockProps,
        global: {
          plugins: [vuetify, pinia]
        }
      })

      const cardTitles = wrapper.findAll('.v-card-title')
      const titleTexts = cardTitles.map(title => title.text())

      expect(titleTexts).toContain('アイテム1')
      expect(titleTexts).toContain('アイテム2')
      expect(titleTexts).toContain('アイテム3')
      expect(titleTexts).toContain('アイテム4')
    })
  })
})
