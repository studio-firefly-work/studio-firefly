import { test, expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

test.describe('お問い合わせページ', () => {
  let confirmBtn: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact/')
    confirmBtn = page.getByRole('button', { name: '入力内容の確認' })
  })

  test('全てのフィールドが正しく入力されているとき、ボタンが有効', async ({ page }) => {
    await fillForm(page, {})
    await confirmBtn.click()
  })

  test('必須項目が抜けているとボタンが無効', async ({ page }) => {
    const missingFields = ['name', 'kana', 'email', 'message', 'agreePrivacy']
    for (const field of missingFields) {
      await testMissingField(page, confirmBtn, field)
    }
  })

  test('カタカナ以外のふりがなが入力されるとボタンが無効', async ({ page }) => {
    const invalidKanaInputs = ['さとうはなこ', '佐藤花子', 'satohanako', '123456', '!@#$%', 'サトウ123']
    for (const kana of invalidKanaInputs) {
      await fillForm(page, { kana })
      await confirmBtnIsDisabled(confirmBtn)
    }
  })

  test('無効なメールアドレスが入力されるとボタンが無効', async ({ page }) => {
    const invalidEmailInputs = [
      'invalidEmail',
      'plainaddress',
      '@missingusername.com',
      'missingat.com',
      'user@domain',
      'user@domain.',
    ]
    for (const email of invalidEmailInputs) {
      await fillForm(page, { email })
      await confirmBtnIsDisabled(confirmBtn)
    }
  })
})

/**
 * フォームに入力する共通関数
 */
const fillForm = async (
  page: Page,
  {
    name = '佐藤花子',
    kana = 'サトウハナコ',
    email = 'hanako.sato@example.com',
    message = 'playwrightによる自動e2eテストを実施しています。',
    agreePrivacy = true,
  }: { name?: string; kana?: string; email?: string; message?: string; agreePrivacy?: boolean }
) => {
  await page.getByPlaceholder('山田太郎').fill(name)
  await page.getByPlaceholder('ヤマダタロウ').fill(kana)
  await page.getByPlaceholder('taro.yamada@example.com').fill(email)
  await page.getByPlaceholder('お問い合わせ内容を入力してください。').fill(message)

  const checkboxPrivacy = page.getByRole('checkbox', { name: 'プライバシーポリシーに同意する' })
  agreePrivacy ? await checkboxPrivacy.check() : await checkboxPrivacy.uncheck()
}

/**
 * 必須項目が抜けている場合にボタンが無効かを確認する共通関数
 */
const testMissingField = async (page: Page, confirmBtn: Locator, missingField: string) => {
  const formData: { [key: string]: string | boolean } = {}
  formData[missingField] = missingField === 'agreePrivacy' ? false : '' // agreePrivacyの場合はfalse、それ以外は空文字
  await fillForm(page, formData)
  await confirmBtnIsDisabled(confirmBtn)
}

/**
 * ボタンが無効かを確認する共通関数
 */
const confirmBtnIsDisabled = async (confirmBtn: Locator) => {
  expect(await confirmBtn.getAttribute('class')).toContain('btn-disabled')
}
