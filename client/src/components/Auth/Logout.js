const logout = () => {
    localStorage.removeItem('token');
    // Redirect user to the home or login page
    window.location = '/'; 
}
