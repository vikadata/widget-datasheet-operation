import { FieldPicker, useActiveViewId, useDatasheet, useField } from '@vikadata/widget-sdk';
import React from 'react';
import { useState } from 'react';
import { Button, RadioGroup, Radio } from '@vikadata/components';

enum Conversion {
  /** 删除关联表的关联字段 */
  delete = '直接删除',
  /** 保留关联表的关联字段，并转换成文本类型 */
  keepText = '保留关联表的对应字段'
}


export const TestDeleteField: React.FC = () => {
  const datasheet = useDatasheet();
  const [fieldId, setFieldId] = useState<string>();
  const field = useField(fieldId);
  const viewId = useActiveViewId();
  const [conversion, setConversion] = useState<Conversion>();

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
      <RadioGroup value={conversion} name="inline-block" row block onChange={(e, value) => setConversion(value)}>
          {Object.keys(Conversion).map(key =>(
            <Radio value={key}>{Conversion[key]}</Radio>
          ))}
      </RadioGroup>
      <Button variant='fill' color='primary' block disabled={!field} onClick={() => {
        console.log('deleteField', field, conversion)
        const check = datasheet?.checkPermissionsForDeleteField(fieldId, conversion)
        if (!check.acceptable) {
          if (field.isPrimary) {
            alert('首字段无法删除～') 
          }
          console.error(check.message)
          return
        }
        datasheet?.deleteField(fieldId, conversion).then(() => setFieldId(undefined))
      }}>确认</Button>
    </div>
  )
}
