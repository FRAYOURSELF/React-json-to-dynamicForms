import React, { useState } from 'react';
import Form from 'react-jsonschema-form';
import DynamicForm from './components/DynamicForm';
const App = () => {
  // const [uiSchema, setUiSchema] = useState('');

  // const handleUiSchemaChange = (event) => {
  //   setUiSchema(event.target.value);
  // };

  // let parsedUiSchema = null;

  // try {
  //   parsedUiSchema = JSON.parse(uiSchema);
  // } catch (error) {
  //   console.error('Invalid UI Schema JSON');
  // }

  return (
    <div>
      <DynamicForm/>
    </div>
    // <div style={{ display: 'flex', height: '100vh' }}>
    //   {/* Left Section - JSON Editor */}
    //   <div style={{ flex: 1, padding: '20px' }}>
    //     <textarea
    //       placeholder="Paste UI Schema here"
    //       value={uiSchema}
    //       onChange={handleUiSchemaChange}
    //       style={{ width: '100%', height: '100%', fontFamily: 'monospace' }}
    //     />
    //   </div>

    //   {/* Right Section - Form Preview */}
    //   <div style={{ flex: 1, padding: '20px' }}>
    //     <div style={{ maxWidth: '400px', margin: 'auto' }}>
    //       {parsedUiSchema && (
    //         <Form
    //           schema={parsedUiSchema}
    //           showErrorList={false}
    //           onSubmit={({ formData }) => console.log('Form data submitted:', formData)}
    //         >
    //           <div>
    //             <button type="submit" className="btn btn-primary">
    //               Submit
    //             </button>
    //           </div>
    //         </Form>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default App;
