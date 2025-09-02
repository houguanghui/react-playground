
import { transform } from '@babel/standalone'

self.onmessage = function (event) {
  const { code, id } = event.data; 
  try {
    const result = transform(code, {
      presets: [['react', { runtime: 'classic' }], 'typescript'], // 根据需要配置preset
      filename: 'userCode.tsx',
      plugins: [['transform-modules-umd', { moduleIds: false,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
          '@ant-design/plots': 'Charts'
        },
        exactGlobals: true,
      },
    ]]
    });

    self.postMessage({
      type: 'success',
      code: result.code,
      id: id // 带回任务ID，方便主线程匹配请求
    });
  } catch (error) {
    if (error instanceof Error)
    self.postMessage({
      type: 'error',
      error: error,
      id: id
    });
  }
}