import acorn from '../assets/items/acorn.png'
import apple from '../assets/items/apple.png'
import balance from '../assets/items/balance.png'
import battery from '../assets/items/battery.png'
import bee from '../assets/items/bee.png'
import bucket from '../assets/items/bucket.png'
import calculator from '../assets/items/calculator.png'
import cardgun from '../assets/items/cardgun.png'
import charcoal from '../assets/items/charcoal.png'
import ducky from '../assets/items/ducky.png'
import dustpan from '../assets/items/dustpan.png'
import glove from '../assets/items/glove.png'
import grape from '../assets/items/grape.png'
import grill from '../assets/items/grill.png'
import ice from '../assets/items/ice.png'
import lemon from '../assets/items/lemon.png'
import orange from '../assets/items/orange.png'
import peanut from '../assets/items/peanut.png'
import pickaxe from '../assets/items/pickaxe.png'
import pickle from '../assets/items/pickle.png'
import pyramid from '../assets/items/pyramid.png'
import quill from '../assets/items/quill.png'
import rapier from '../assets/items/rapier.png'
import recycle_bin from '../assets/items/recycle_bin.png'
import ring_ruby from '../assets/items/ring_ruby.png'
import ring_sapphire from '../assets/items/ring_sapphire.png'
import ring_topaz from '../assets/items/ring_topaz.png'
import rings_couple from '../assets/items/rings_couple.png'
import scissors from '../assets/items/scissors.png'
import shopping_bag from '../assets/items/shopping_bag.png'
import slotmachine from '../assets/items/slotmachine.png'
import sword from '../assets/items/sword.png'
import tooth from '../assets/items/tooth.png'
import trident from '../assets/items/trident.png'
import tube_bath from '../assets/items/tube_bath.png'
import violin from '../assets/items/violin.png'
import vip_card from '../assets/items/vip_card.png'
import wand_blackhole from '../assets/items/wand_blackhole.png'
import wand_dark from '../assets/items/wand_dark.png'

export interface GameItem {
  id: string
  label: string
  src: string
}

export const ALL_ITEMS: GameItem[] = [
  { id: 'acorn',        label: '橡子',    src: acorn },
  { id: 'apple',        label: '苹果',    src: apple },
  { id: 'balance',      label: '天平',    src: balance },
  { id: 'battery',      label: '电池',    src: battery },
  { id: 'bee',          label: '蜜蜂',    src: bee },
  { id: 'bucket',       label: '水桶',    src: bucket },
  { id: 'calculator',   label: '计算器',  src: calculator },
  { id: 'cardgun',      label: '纸牌枪',  src: cardgun },
  { id: 'charcoal',     label: '木炭',    src: charcoal },
  { id: 'ducky',        label: '小黄鸭',  src: ducky },
  { id: 'dustpan',      label: '簸箕',    src: dustpan },
  { id: 'glove',        label: '手套',    src: glove },
  { id: 'grape',        label: '葡萄',    src: grape },
  { id: 'grill',        label: '烤架',    src: grill },
  { id: 'ice',          label: '冰块',    src: ice },
  { id: 'lemon',        label: '柠檬',    src: lemon },
  { id: 'orange',       label: '橙子',    src: orange },
  { id: 'peanut',       label: '花生',    src: peanut },
  { id: 'pickaxe',      label: '镐',      src: pickaxe },
  { id: 'pickle',       label: '泡菜',    src: pickle },
  { id: 'pyramid',      label: '金字塔',  src: pyramid },
  { id: 'quill',        label: '羽毛笔',  src: quill },
  { id: 'rapier',       label: '细剑',    src: rapier },
  { id: 'recycle_bin',  label: '回收桶',  src: recycle_bin },
  { id: 'ring_ruby',    label: '红宝石戒指', src: ring_ruby },
  { id: 'ring_sapphire',label: '蓝宝石戒指', src: ring_sapphire },
  { id: 'ring_topaz',   label: '黄宝石戒指', src: ring_topaz },
  { id: 'rings_couple', label: '情侣戒指', src: rings_couple },
  { id: 'scissors',     label: '剪刀',    src: scissors },
  { id: 'shopping_bag', label: '购物袋',  src: shopping_bag },
  { id: 'slotmachine',  label: '老虎机',  src: slotmachine },
  { id: 'sword',        label: '剑',      src: sword },
  { id: 'tooth',        label: '牙齿',    src: tooth },
  { id: 'trident',      label: '三叉戟',  src: trident },
  { id: 'tube_bath',    label: '浴缸',    src: tube_bath },
  { id: 'violin',       label: '小提琴',  src: violin },
  { id: 'vip_card',     label: 'VIP卡',   src: vip_card },
  { id: 'wand_blackhole',label: '黑洞魔杖', src: wand_blackhole },
  { id: 'wand_dark',    label: '暗黑魔杖', src: wand_dark },
]
