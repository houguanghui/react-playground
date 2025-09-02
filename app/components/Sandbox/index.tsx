import { useEffect, createContext, useState } from "react";
import Output from "./Output";
import CompilerWorker from "./CompilerWorker";

type SandboxProps = {
  code?: string
  compilerCode?: string
}

export default ({code, compilerCode: cCode}: SandboxProps) => {
  const [compilerCode, setCompilerCode] = useState(cCode)

  return (
    <div>
      {
        compilerCode? <Output code={compilerCode}/>: null
      }
      {
        code? <CompilerWorker code={code} setCompilerCode={setCompilerCode}/>: null
      }
    </div>
  )
}