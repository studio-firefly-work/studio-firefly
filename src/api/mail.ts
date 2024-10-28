/**
 * メール 送信
 */
export const sendMail = async (data: any) => {
  try {
    const recaptchaToken = await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact' }).then(resolve)
      })
    })

    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/mail/send/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, recaptchaToken }),
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('送信が正常に完了しました')
    }

    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}
