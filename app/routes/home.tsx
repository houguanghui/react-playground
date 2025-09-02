import type { Route } from "./+types/home";
import React, { useState } from 'react';
import {  Layout, Splitter, theme } from 'antd';
import Sandbox from "~/components/Sandbox";
import MonacoEditorDemo from "~/components/MonacoEditorDemo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const { Content } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const codes = [
    `
      import React from 'react';
      import { Space, Table, Tag } from 'antd';
      import type { TableProps } from 'antd';
      import { createRoot } from 'react-dom';

      interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
      }

      const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

      const data: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

      const App: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

      createRoot(document.getElementById('sandbox')).render(<App />);
    `,
    `
      import { Line } from '@ant-design/plots';
      import React from 'react';
      import { createRoot } from 'react-dom';

      const DemoSegmentedLine = () => {
        const data = [
          {
            year: '1991',
            value: 3,
            type: 'Lon',
          },
          {
            year: '1992',
            value: 4,
            type: 'Lon',
          },
          {
            year: '1993',
            value: 3.5,
            type: 'Lon',
          },
          {
            year: '1994',
            value: 5,
            type: 'Lon',
          },
          {
            year: '1995',
            value: 4.9,
            type: 'Lon',
          },
          {
            year: '1996',
            value: 6,
            type: 'Lon',
          },
          {
            year: '1997',
            value: null,
            type: 'Lon',
          },
          {
            year: '1998',
            value: null,
            type: 'Lon',
          },
          {
            year: '1999',
            value: null,
            type: 'Lon',
          },
          {
            year: '1991',
            value: null,
            type: 'Bor',
          },
          {
            year: '1992',
            value: null,
            type: 'Bor',
          },
          {
            year: '1993',
            value: null,
            type: 'Bor',
          },
          {
            year: '1994',
            value: null,
            type: 'Bor',
          },
          {
            year: '1995',
            value: null,
            type: 'Bor',
          },
          {
            year: '1996',
            value: 6,
            type: 'Bor',
          },
          {
            year: '1997',
            value: 7,
            type: 'Bor',
          },
          {
            year: '1998',
            value: 9,
            type: 'Bor',
          },
          {
            year: '1999',
            value: 13,
            type: 'Bor',
          },
        ];
        const config = {
          data,
          xField: 'year',
          yField: 'value',
          colorField: 'type',
          scale: {
            color: {
              range: ['#2688FF', 'red'],
            },
          },
          style: {
            lineWidth: 2,
            lineDash: (items) => {
              const { type } = items[0];
              return type === 'Bor' ? [2, 4] : [0, 0];
            },
          },
          interaction: {
            tooltip: {
              render: (e, { title, items }) => {
                const list = items.filter((item) => item.value);
                return (
                  <div key={title}>
                    <h4>{title}</h4>
                    {list.map((item) => {
                      const { name, value, color } = item;
                      return (
                        <div>
                          <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: color,
                                  marginRight: 6,
                                }}
                              ></span>
                              <span>{name}</span>
                            </div>
                            <b>{value}</b>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              },
            },
          },
          legend: false,
        };
        return <Line {...config} />;
      };

      createRoot(document.getElementById('sandbox')).render(<DemoSegmentedLine />);
    `
  ]

  const [code, setCode] = useState<string|undefined>(codes[1])

  return (
    <Layout>
      <Content style={{ padding: '18px 48px', height: '100vh' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100%',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        <Splitter style={{ minHeight: '80vh'}}>

          <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            <Sandbox code={code}/>
          </Splitter.Panel>
          <Splitter.Panel>
            <MonacoEditorDemo code={code} setCode={setCode}/>
          </Splitter.Panel>
        </Splitter>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;