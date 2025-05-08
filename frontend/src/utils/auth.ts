export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;

}

export const getRole = () => {
    const user = getUser();
    return user?.role || null;
  };
  
  export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };