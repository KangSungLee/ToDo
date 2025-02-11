// 로그인 상태 확인
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    // 토큰이 있고, 만료되지 않았다면 로그인된 상태
    return token && tokenExpiry > Date.now();
  };
  
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
  };