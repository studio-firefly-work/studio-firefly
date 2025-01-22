import { test, expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

test.describe('お問い合わせページ', () => {
  let confirmBtn: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact/')
    confirmBtn = page.getByRole('button', { name: '入力内容の確認' })
  })

  test('全てのフィールドが正しく入力されているとボタンが有効', async ({ page }) => {
    await fillForm(page, {})
    await confirmBtn.click()
  })

  test('必須項目が抜けているとボタンが無効', async ({ page }) => {
    const missingFields = ['name', 'kana', 'email', 'message', 'agreePrivacy']
    for (const field of missingFields) {
      await testMissingField(page, confirmBtn, field)
    }
  })

  test('ひらがな又はカタカナ以外のふりがなが入力されるとボタンが無効', async ({ page }) => {
    const invalidKanaInputs = ['佐藤花子', 'satohanako', '123456', '!@#$%', 'さとう123', 'サトウ123']
    for (const kana of invalidKanaInputs) {
      await fillForm(page, { kana })
      await confirmBtnIsDisabled(confirmBtn)
    }
  })

  test('無効なメールアドレスが入力されるとボタンが無効', async ({ page }) => {
    const invalidEmailInputs = [
      'user',             // ローカルパートもドメインも不足
      '@domain.com',      // ローカルパートが空
      'user@',            // ドメイン部分が空
      'domain.com',       // 「@」がない
      'user@.com',        // ドメインがドットで始まる
      'user@domain..com', // ドメインに連続したドット
      '.user@domain.com', // ローカルパートがドットで始まる
      'user.@domain.com', // ローカルパートがドットで終わる
      'user@domain.com.', // ドメインがドットで終わる
      'user@domain.-com', // ドメインラベルがハイフンで始まる
      'user@domain-.com', // ドメインラベルがハイフンで終わる
      'user@domain_com',  // ドメインにアンダースコア
      'user@domain..com', // ドメインに連続したドット
      'user@domain.c',    // TLDが1文字（2文字未満）
      'user@domain.toolongtldtoolongtldtoolongtldtoolongtldtoolongtldtoolongtldtool', // TLDが64文字以上
      'user@localhost',   // ドメインがローカルホスト（TLDなし）
      'user@domain,com',  // ドメイン部分にカンマ（`,`）
      'user@domain com',  // ドメイン部分にスペース
      'user@-domain.com', // ドメインがハイフンで始まる
      'user@domain.-com', // サブドメイン部分がハイフンで始まる
      'user@123.123.123', // ドット区切りの数字（IPv4形式ではない）
      'user@domain..com', // ドメインに連続したドット
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
  await page.getByPlaceholder('お問い合わせ内容をご入力ください。').fill(message)

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
