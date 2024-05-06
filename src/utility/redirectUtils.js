// redirectUtils.js
const setBasePath = (path) => {
    const basePath = "/maridaje";
    window.location.pathname = `${basePath}${path}`;
  }
  
  export default setBasePath;
  