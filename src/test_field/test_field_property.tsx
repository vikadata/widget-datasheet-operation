import { FieldPicker, useActiveViewId, useField } from '@vikadata/widget-sdk';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import { Box, Button, Switch } from '@vikadata/components';
import ReactJson from 'react-json-view'

const effectOption = {
  enableSelectOptionDelete: true
}

export const TestField: React.FC = () => {
  const viewId = useActiveViewId();
  const [fieldId, setFieldId] = useState<string>();
  const [editor, setEditor] = useState<any>();
  const editorRef = useRef<HTMLDivElement>(null);
  const field = useField(fieldId);
  const [errorJson, setErrorJson] =  useState<boolean>();
  const [useEffectOpt, setUseEffectOpt] = useState<boolean>();
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

  useEffect(() => {
    console.log('@@@')
    console.log(field?.property)
    const json = field?.property || {}
    setEditor(editor=>{
      editor.update(json)
      return editor
    });
  }, [fieldId])
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => {
        setFieldId(option.value)
      }} />
      <Box display={'flex'} padding={'10px'} flex={'1'} width={'100%'}>
       <Box width={'50%'} height={'100%'}>
          <h2>读</h2>
          {field?.property ? <ReactJson src={field?.property} /> : '所选字段没有属性配置'}
        </Box>
        <Box display={'flex'} flexDirection={'column'} width={'50%'} height={'100%'}>
          <Box display={'flex'} alignItems={'center'}>
            <h2 style={{ flex: 1 }}>
              写 
            </h2>
            是否允许副作用：<Switch checked={useEffectOpt} onClick={() => setUseEffectOpt(!useEffectOpt)} />
          </Box>
          <div style={{ flex: 1 }} ref={editorRef}/>
        </Box>
      </Box>
      <Button variant='fill' color='primary' block disabled={!field || errorJson} onClick={() => {
        const json = editor.get();
        console.log('updateProperty', json)
        const check = field?.checkPermissionForUpdateProperty(json)
        if (!check.acceptable) {
          console.error(check.message)
          return
        }
        field?.updateProperty(json, useEffectOpt ? effectOption : undefined)
      }}>确认修改</Button>
    </div>
  )
}