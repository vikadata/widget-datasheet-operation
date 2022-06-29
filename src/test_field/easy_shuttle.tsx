import { Box, Button, RadioGroup, Radio } from '@vikadata/components';
import { FieldType, useActiveViewId, useDatasheet, useFields } from '@vikadata/widget-sdk';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import React, { useEffect, useRef, useState } from 'react';
import AddFieldJson from './createField.json';

export const FieldEasyShuttle: React.FC = () => {
  const addFieldArr = AddFieldJson.fields;
  const [editor, setEditor] = useState<any>();
  const editorRef = useRef<HTMLDivElement>(null);
  const [errorJson, setErrorJson] =  useState<boolean>();
  const datasheet = useDatasheet();
  const [method, setMethod] = useState<string>();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);

  useEffect(() => {
    const editorC = new JSONEditor(editorRef.current, {
      mode: 'code',
      mainMenuBar: false,
      onValidationError: (error) => {
        setErrorJson(Boolean(error.length))
      }
    });
    setEditor(editorC);
  }, [])

  const editorSetter = ({...props}) => {
    const { value } = props
    switch(value) {
      case '1': {
        editor.set(addFieldArr)
      }; break;
      case '2': {
        editor.set(fields.filter(field => !field.isPrimary).map(field => ({
          id: field.id,
          conversion: field.type === FieldType.MagicLink ? 'delete' : undefined
        })))
      }; break;
      default: editor.set({})
    }
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <Box display={'flex'} flexDirection={'row'} padding={'10px'} flex={'1'} width={'100%'}>
      <Box display={'flex'} flexDirection={'column'} flex={'1'} height={'100%'}>
        <RadioGroup name="column" value={method} onChange={(e, value) => {
          setMethod(value);
          editorSetter({value})
        }}>
          <Radio value="1">一键新增字段</Radio>
          <Radio value="2">一键删除字段</Radio>
        </RadioGroup>
        <div style={{
          color: 'rgb(140, 140, 140)',
          marginTop: '8px',
          marginRight: '12px',
          fontSize: '14px'
        }}>
          <ol style={{ padding: '0px' }}><strong>步骤：</strong>
            <li >选择操作模式「新增/删除」</li>
            <li>在右侧的 JSON 编辑框内定义要批量「新增/删除」的字段</li>
            <li>点击「确认」</li>
          </ol>         
          <ul style={{ padding: '0px' }}><strong>注意：</strong>
            <li >如果你选择「一键新增字段」，编辑器内容将初始化为维格表除「神奇关联」「神奇引用」外的所有字段类型（21 种）</li>
            <li>如果你选择「一键删除字段」，编辑器内容将初始化为当前视图下所有字段</li>
          </ul>         
        </div>
        </Box>
        <Box display={'flex'} flexDirection={'column'} flex={'2'} height={'100%'}>
          <div style={{ flex: 1 }} ref={editorRef}/>
        </Box>
      </Box>
      <Button variant='fill' color='primary' block disabled={errorJson || !method} onClick={() => {
        switch(method) {
          case '1': {
            const fields = editor.get();
            fields.forEach(({ name, type, property }) => {
              const check = datasheet?.checkPermissionsForAddField(name, type, property)
              if (!check.acceptable) {
                console.error(name, type, check.message)
                return
              }
              datasheet?.addField(name, type, property)
            })
          }; break;
          case '2': {
            const fields = editor.get();
            fields.forEach(({ id, conversion}) => {
              const check = datasheet?.checkPermissionsForDeleteField(id, conversion)
              if (!check.acceptable) {
                console.error(check.message)
                alert(check.message);
                return
              }
              datasheet?.deleteField(id, conversion)
            })
          }; break;
          default: console.log(editor.get())
        }
      }}>确认</Button>
    </div>
  )
}