import { useDatasheet, useField } from '@vikadata/widget-sdk';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import { Box, Button } from '@vikadata/components';
import ReactJson from 'react-json-view'

export const TestAddField: React.FC = () => {
  const datasheet = useDatasheet();
  const [fieldId, setFieldId] = useState<string>();
  const [editor, setEditor] = useState<any>();
  const editorRef = useRef<HTMLDivElement>(null);
  const field = useField(fieldId);
  const [errorJson, setErrorJson] =  useState<boolean>();
  useEffect(() => {
    const editorC = new JSONEditor(editorRef.current, {
      mode: 'code',
      mainMenuBar: false,
      onValidationError: (error) => {
        setErrorJson(Boolean(error.length))
      }
    });
    const json = {
      "name": "字段名称",
      "type": "字段类型",
      "property": "字段属性"
    }
    editorC.set(json)
    setEditor(editorC);
  }, [])
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <Box display={'flex'} padding={'10px'} flex={'1'} width={'100%'}>
        <Box display={'flex'} flexDirection={'column'} width={'50%'} height={'100%'}>
          <Box display={'flex'} alignItems={'center'}>
            <h2 style={{ flex: 1 }}>
              写 
            </h2>
          </Box>
          <div style={{ flex: 1 }} ref={editorRef}/>
        </Box>
        <Box width={'50%'} height={'100%'}>
        <h2>新增字段结果</h2>
          <ReactJson src={{
            id: field?.id,
            name: field?.name,
            type: field?.type,
            property: field?.property
          }} />
        </Box>
      </Box>
      <Button variant='fill' color='primary' block disabled={errorJson} onClick={() => {
        const { name, type, property } = editor.get() || {};
        console.log('updateProperty', name, type, property)
        const check = datasheet?.checkPermissionsForAddField(name, type, property)
        if (!check.acceptable) {
          console.error(check.message)
          alert(check.message)
          return
        }
        datasheet?.addField(name, type, property).then(fieldId => {
          setFieldId(fieldId)
        })
      }}>确认</Button>
    </div>
  )
}
