import { fetcher } from './fetcher';
function getTokenExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.exp ? decoded.exp * 1000 : null; // 转为毫秒
  } catch {
    return null;
  }
}

export async function getValidAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // 从 accessToken 中解析获得过期时间戳
  const accessTokenExp = accessToken ? getTokenExp(accessToken) : null;
  // accessToken 过期时间，打印具体是时间
  console.log('accessTokenExp:', accessTokenExp ? new Date(accessTokenExp) : '无法解析');

  // 判断 access_token 是否过期
  if (accessToken && accessTokenExp && Date.now() < accessTokenExp) {
    return accessToken;
  }

  // access_token 过期，尝试用 refresh_token 刷新
  if (refreshToken) {
    await fetcher('/auth/refresh_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).then((res) => {
      const data = res as { access_token: string; refresh_token: string };
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      return data.access_token;
    }).catch((err) => {
      console.error(err);
      return null;
    });
  }

  // 刷新失败，返回 null
  return null;
}
