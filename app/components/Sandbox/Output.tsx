import { useEffect } from "react";

export default ({ code }: {code: string}) => {

    const codeWrapper = `
      // Can only have one anonymous define call per script file
      // loader 加载冲突
      var __runnerDefine = window['define'];
      window['define'] = null;
      try {
        ${code}
      } catch(e) {
        console.log(e)
      } finally {
        window['define'] = __runnerDefine;
      }
  `
  useEffect(() => {
    const sandbox = document.getElementById('#sandbox-script');
    sandbox?.remove();
    const script = document.createElement('script');
    script.id = 'sandbox-script';
    script.type = 'module';
    script.textContent = codeWrapper
    document.head.appendChild(script);
  }, [code])
  
  return (
    <div id="sandbox"></div>
  )
}