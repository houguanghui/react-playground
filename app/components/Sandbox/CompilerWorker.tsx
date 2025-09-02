import { useEffect, useRef } from "react"

export default ({code, setCompilerCode}: {code: string, setCompilerCode: React.Dispatch<React.SetStateAction<string|undefined>>}) => {

  const workerRef = useRef<Worker>(undefined);

  // 执行编译后
  const onmessage = function (event: MessageEvent<any>) {
    const { type, code, error, id } = event.data;
    if (type === 'success') {
      setCompilerCode(code)
    } else {
      const fileMatch = error.message.match(/^(.*?):\s*(.*?)\s*\((\d+):(\d+)\)/);
      const [, fileName, errorDesc, line, column] = fileMatch;
    }
  }

  useEffect(() => {
    if (typeof Worker !== undefined && !!!workerRef.current) {
      const compilerWorker = new Worker(
        new URL('@/utils/compiler.worker.js', import.meta.url),
        {
          type: 'module' // 如果worker中使用ES模块，则指定type
        }
      )
      workerRef.current = compilerWorker;
      compilerWorker.onmessage = onmessage
    }

    return () => {
      workerRef.current?.terminate();
    };
  },[])

  useEffect(()=>{
    const debounceTimer = setTimeout(() => {
      const taskId = Date.now();
      workerRef.current?.postMessage({ code, id: taskId });
    }, 500)

    return () => {
      clearTimeout(debounceTimer);
    };
  },[code])// 代码变更重新编译 提交到工作线程编译

  return (
    <span></span>
  )
}