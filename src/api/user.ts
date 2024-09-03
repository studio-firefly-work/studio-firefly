/**
 * ユーザー情報 取得
 */
export const getUser = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の取得が正常に完了しました')
      const data = await res.json()
      return data
    }
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ユーザー情報 作成
 */
export const createUser = async (data: any) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の作成が正常に完了しました')
    }
    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ユーザー情報 更新
 */
export const updateUser = async (data: any) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の更新が正常に完了しました')
    }
    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ユーザー情報 論理削除
 */
export const deleteUser = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の更新が正常に完了しました')
    }
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ユーザー情報 有効化
 */
export const activateUser = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    console.log(token)

    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/users/me/activate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('お客様情報の有効化が正常に完了しました')
    }
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}
