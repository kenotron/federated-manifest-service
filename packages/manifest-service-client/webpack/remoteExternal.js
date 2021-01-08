module.exports = function remoteExternal(remoteName) {
  return {
    external: `promise new Promise((resolve)=>{
    const element = document.createElement("script");
    element.src = __manifest__.${remoteName};
    element.type = "text/javascript";
    element.async = true;
    element.onload = () => {
      resolve(window.${remoteName});
    };
    document.head.appendChild(element);
  })`,
  };
};
