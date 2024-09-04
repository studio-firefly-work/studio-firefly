/**
 * ログイン
 */
export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('ログインに失敗しました：' + data.message)
    } else {
      console.log('ログインに成功しました：' + data.message)
    }
    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ログアウト
 */
export const logout = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/logout/`, {
      method: 'DELETE',
      credentials: 'include',
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('ログアウトに失敗しました：' + data.message)
    } else {
      console.log('ログアウトに成功しました：' + data.message)
    }
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}

/**
 * ログイン状況
 */
export const isLogin = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/login/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    return res.ok
  } catch (error) {
    console.error('Error checking login status:', error)
    return false
  }
}

/**
 * パスワードのリセットを要求
 */
export const resetPassword = async (email: string) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/auth/password-reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      console.error('サーバーエラー')
    } else {
      console.log('正常に完了しました')
    }
    return res
  } catch (error) {
    console.error('通信に失敗しました', error)
  }
}
