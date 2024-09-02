/**
 * ユーザー情報 作成
 */
export const createPreUser = async (data: any) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/pre-users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の仮登録が正常に完了しました')
    }
    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}
