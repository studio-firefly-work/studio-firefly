import { test, expect } from 'vitest'
import { skills } from './SkillMatrix.astro'

test('good と like が 0% ～ 100% の範囲内であることを確認', async () => {
  skills.map(({ good, like }) => {
    expect(isValidStyle('good', good)).toBe(true)
    expect(isValidStyle('like', like)).toBe(true)
  })
})

const isValidStyle = (key: string, value: string) => {
  const isValidLeftStyle = /^left-\[(\d+)%\]$/
  const isValidBottomStyle = /^bottom-\[(\d+)%\]$/

  const match = key === 'good' ? value.match(isValidLeftStyle) : value.match(isValidBottomStyle)

  if (!match) return false

  const percentage = parseInt(match[1], 10)
  return percentage >= 0 && percentage <= 100
}