import React, { useMemo, useState } from 'react';
import { initializeWidget } from '@vikadata/widget-sdk';
import { TestField } from './test_field/test_field_property';
import { Box, RadioGroup, Radio } from '@vikadata/components';
import { TestFieldDesc } from './test_field/test_field_desc';
import { TestAddField } from './test_field/field_add_property';
import { TestDeleteField } from './test_field/field_delete';
import { FieldEasyShuttle } from './test_field/easy_shuttle';

enum OperationType {
  'FieldProperty' = 'Field Property',
  'FieldDesc' = 'Field 描述',
  'AddField' = 'Add Field',
  'DeleteField' = 'Delete Field',
  'OneKeyField' = 'Field 一键操作'
}

export const HelloWorld: React.FC = () => {
  const [operationType, setOperationType] = useState('FieldProperty')
  const Content = useMemo(() => {
    switch(operationType) {
      case 'FieldProperty': {
        return <TestField/>
      }
      case 'FieldDesc': {
        return <TestFieldDesc/>
      }
      case 'AddField': {
        return <TestAddField/>
      }
      case 'DeleteField': {
        return <TestDeleteField/>
      }
      case 'OneKeyField': {
        return <FieldEasyShuttle/>
      }
      default: {
        return (
          <h1>请选择方式</h1>
        )
      }
    }
  }, [operationType])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box background={'#80808038'}>
        <div style={{ textAlign: 'center' }}>选择方式： </div>  
        <RadioGroup style={{ flex: '1' }} value={operationType} name="btn-group-with-default" isBtn block onChange={(e, value) => setOperationType(value)}>
          {Object.keys(OperationType).map(key =>(
            <Radio value={key}>{OperationType[key]}</Radio>
          ))}
        </RadioGroup>
      </Box>
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '0 8px'}}>
        {Content}
      </div>
    </div>
  );
};

initializeWidget(HelloWorld, process.env.WIDGET_PACKAGE_ID);
