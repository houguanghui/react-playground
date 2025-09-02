import React, { useState, useRef, type Dispatch } from 'react';
import { Editor } from "@monaco-editor/react";
import {
  Row,
  Col,
  Select,
  Slider,
  Switch,
  Button,
  Space,
  Divider,
  Typography,
  Card,
  Drawer
} from 'antd';
import {
  DownloadOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

interface EditorSettings {
  theme: string;
  language: string;
  fontSize: number;
  wordWrap: "on" | "wordWrapColumn" | "off" | "bounded" | undefined;
  minimap: boolean;
  lineNumbers: 'on' | 'off' | 'relative' | 'interval' | ((lineNumber: number) => string);
  renderWhitespace: "boundary" | "none" | "selection" | "trailing" | "all" | undefined;
}

const MonacoEditorDemo: React.FC<{code:string|undefined, setCode: React.Dispatch<React.SetStateAction<string | undefined>>}> = ({code, setCode}) => {
  
  const [settings, setSettings] = useState<EditorSettings>({
    theme: 'ant-light',
    language: 'javascript',
    fontSize: 14,
    wordWrap: 'on',
    minimap: false,
    lineNumbers: 'on',
    renderWhitespace: 'boundary'
  });
  
  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any): void => {
    setIsEditorReady(true);
    editorRef.current = editor;
    
    // 添加自定义主题
    monaco.editor.defineTheme('ant-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'b3b3b3', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7fccea' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'type', foreground: '4ec9b0' }
      ],
      colors: {
        'editor.background': '#1f1f1f',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editorCursor.foreground': '#ffffff',
        'editor.lineNumbers': '#858585',
        'editor.selectionBackground': '#264f78'
      }
    });

    monaco.editor.defineTheme('ant-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8c8c8c', fontStyle: 'italic' },
        { token: 'keyword', foreground: '1890ff' },
        { token: 'string', foreground: 'f5222d' },
        { token: 'number', foreground: '389e0d' },
        { token: 'type', foreground: '13c2c2' }
      ],
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#262626',
        'editor.lineHighlightBackground': '#f0f0f0',
        'editorCursor.foreground': '#1890ff',
        'editor.lineNumbers': '#bfbfbf',
        'editor.selectionBackground': '#d1e9ff'
      }
    });
  };

  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]): void => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const downloadCode = (): void => {
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${settings.language}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const showDrawer = (): void => {
    setDrawerVisible(true);
  };

  const onClose = (): void => {
    setDrawerVisible(false);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Row>
        <Col span={24}>
          <Card 
            style={{ height: '100%' }}
            styles={{
              body: {padding: 0}
            }}
            extra={
              <Button 
                icon={<MenuOutlined />} 
                onClick={showDrawer}
                type="primary"
              >
                设置
              </Button>
            }
          >
            <div style={{ borderRadius: '6px', overflow: 'hidden', height: '80vh' }}>
              <Editor
                height="100%"
                language={settings.language}
                theme={settings.theme}
                value={code}
                onChange={(newValue) => setCode(newValue)}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: settings.fontSize,
                  wordWrap: settings.wordWrap,
                  minimap: { enabled: settings.minimap },
                  lineNumbers: settings.lineNumbers,
                  renderWhitespace: settings.renderWhitespace,
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: 'phase',
                  cursorSmoothCaretAnimation: 'on',
                  glyphMargin: true,
                  folding: true,
                  lineDecorationsWidth: 10,
                  automaticLayout: true,
                  padding: { top: 10 }
                }}
                loading={<div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%', 
                  backgroundColor: '#1f1f1f', 
                  color: '#d4d4d4', 
                  fontSize: '16px' 
                }}>编辑器加载中...</div>}
              />
            </div>
          </Card>
        </Col>
      </Row>
      
      <Drawer
        title="编辑器设置"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        width={350}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>主题</Text>
            <Select
              value={settings.theme}
              onChange={(value) => updateSetting('theme', value)}
              style={{ width: '100%' }}
            >
              <Option value="vs">浅色 (VS)</Option>
              <Option value="vs-dark">深色 (VS Dark)</Option>
              <Option value="hc-black">高对比度黑色</Option>
              <Option value="hc-light">高对比度浅色</Option>
              <Option value="ant-light">Ant Design 浅色</Option>
              <Option value="ant-dark">Ant Design 深色</Option>
            </Select>
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>编程语言</Text>
            <Select
              value={settings.language}
              onChange={(value) => updateSetting('language', value)}
              style={{ width: '100%' }}
            >
              <Option value="javascript">JavaScript</Option>
              <Option value="typescript">TypeScript</Option>
              <Option value="html">HTML</Option>
              <Option value="css">CSS</Option>
              <Option value="python">Python</Option>
              <Option value="java">Java</Option>
            </Select>
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>字体大小: {settings.fontSize}px</Text>
            <Slider
              min={10}
              max={24}
              value={settings.fontSize}
              onChange={(value) => updateSetting('fontSize', value)}
            />
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>换行方式</Text>
            <Select
              value={settings.wordWrap}
              onChange={(value) => updateSetting('wordWrap', value as "on" | "wordWrapColumn" | "off" | "bounded" | undefined)}
              style={{ width: '100%' }}
            >
              <Option value="off">关闭</Option>
              <Option value="on">开启</Option>
              <Option value="wordWrapColumn">在列处换行</Option>
              <Option value="bounded">边界内换行</Option>
            </Select>
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>行号显示</Text>
            <Select
              value={settings.lineNumbers as string}
              onChange={(value) => updateSetting('lineNumbers', value as 'on' | 'off' | 'relative' | 'interval')}
              style={{ width: '100%' }}
            >
              <Option value="on">显示</Option>
              <Option value="off">隐藏</Option>
              <Option value="relative">相对行号</Option>
              <Option value="interval">间隔行号</Option>
            </Select>
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text strong>空白字符显示</Text>
            <Select
              value={settings.renderWhitespace}
              onChange={(value) => updateSetting('renderWhitespace', value as "boundary" | "none" | "selection" | "trailing" | "all" | undefined)}
              style={{ width: '100%' }}
            >
              <Option value="none">不显示</Option>
              <Option value="boundary">边界显示</Option>
              <Option value="selection">选中时显示</Option>
              <Option value="all">全部显示</Option>
              <Option value="trailing">仅尾部显示</Option>
            </Select>
          </div>
          
          <Divider dashed style={{ margin: '12px 0' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Switch 
              checked={settings.minimap} 
              onChange={(checked) => updateSetting('minimap', checked)}
            />
            <Text>显示缩略图</Text>
          </div>
        </div>
        
        <Divider style={{ margin: '24px 0' }} />
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={downloadCode}
            disabled={!isEditorReady}
            type="primary"
            block
          >
            保存代码
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default MonacoEditorDemo;