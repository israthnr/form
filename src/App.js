import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ToolBox from './Components/Toolbox';
import FormContainer from './Components/FormContainer';
import './App.css';
import * as Yup from 'yup';
import { isVisible } from '@testing-library/user-event/dist/utils';

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolType: 'CUSTOM_COM',
      num1: 1,
      num2: 2,
    };
  }

  changeValue(value) {
    this.setState({
      num1: value,
    });
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  }

  render() {
    return (
      <div className="container">
        <span className="pull-right cross" onClick={() => this.props.removeField(this.props.index)}>
          x
        </span>
        <input onChange={(e) => this.changeValue(e.target.value)} type="text" />
      </div>
    );
  }
}

class TestPreview extends Component {
  render() {
    return <h3>{this.props.toolType}</h3>;
  }
}

const myCustoms = [
  {
    container: <TestComponent />,
    preview: <TestPreview />,
    toolbox: {
      title: 'Test',
      icon: 'fa fa-user',
      name: 'CUSTOM_COM',
    },
    states: {
      toolType: 'CUSTOM_COM',
      num1: 1,
      num2: 2,
    },
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      formFields: [], // Array to hold form field configurations
    };
    this.onEdit = this.onEdit.bind(this);
  }

  updateForm(callback) {
    // let rawForm = '[{"title":"ADS","toolType":"RADIO_BUTTONS","multiple":false,"inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"radios":[]},{"title":"Title","toolType":"CHECK_BOXES","inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"checkBoxes":[]}]';
    // let form = JSON.parse(rawForm);
    // callback(form);
  }

  onSave = (formData) => {
    // Perform any necessary actions with the form data
    const formFields = formData.map((field) => ({
      name: field.name,
      type: field.type,
      placeholder: field.placeholder,
      validation: {
        isReadOnly: field.validation.isReadOnly || false,
        isRequired: field.validation.isRequired || false,
        min: (field.type === "Text" && field.validation.min) || null,
        max: (field.type === "Text" && field.validation.max) || null,
      },
    }));
    this.setState({ formFields });
  };

  onPreview = (formData) => {

    const formFields = formData.map((field) => ({
      name: field.name,
      type: field.type,
      placeholder: field.placeholder,
      validation: {
        isReadOnly: field.validation.isReadOnly || false,
        isRequired: field.validation.isRequired || false,
        min: (field.type === "Text" && field.validation.min) || null,
        max: (field.type === "Text" && field.validation.max) || null,
      },
    }));
    this.setState({ formVisible: true, formFields });
    console.log(formFields)
  };

  onEdit = () => {
    this.setState({ formVisible: false });
  };
  
      

  render() {
    const { formFields } = this.state;

        // Define the initial form values
      
    const validationSchema = Yup.object().shape(
      formFields.reduce((schema, field) => {
        const { name, validation } = field;

        let fieldSchema = Yup.string();

        if (validation.isRequired) {
          fieldSchema = fieldSchema.required('This field is required');
        }

        if (validation.min !== null) {
          fieldSchema = fieldSchema.min(validation.min, 'Value is too short');
        }

        if (validation.max !== null) {
          fieldSchema = fieldSchema.max(validation.max, 'Value is too long');
        }

        return {
          ...schema,
          [name]: fieldSchema,
        };
      }, {})
    );


    return (
      <div className="App">
        <div className="container">
        {!this.state.formVisible ?(
            <div className="row">
              <div className="col-md-7">
                <FormContainer
                  loader={false}
                  debug={false}
                  updateOnMount={true}
                  onPreview={this.onPreview}
                  onSave={this.onSave}
                  onEdit = {this.onEdit}
                  custom={myCustoms}
                  formFields={this.state.formFields} // Pass the formFields data as a prop
                  initialFormValues={formFields} // Pass the initial form values as a prop
                />

              </div>

              <div className="col-md-5">
                <ToolBox custom={myCustoms} />
              </div>
            </div> ):(
            <div>
              <button type="button" onClick={() => {this.setState({ formVisible: false });}}>Edit</button>
              {/* <button type="button" onClick = {this.onEdit} ></button> */}

              <Formik
                initialValues={{}}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log('Form submitted:', values)}
              >
                <Form>
                  {formFields.map((field, index) => (
                    <div key={index} className='inputCont'>
                      <label htmlFor={field.name}>{field.name}</label>
                      <Field
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="input-field"
                      //css

                      />
                      <ErrorMessage name={field.name} component="div" className="error-message" />
                    </div>  
                  ))}
                  <button type="submit" className="submit-button">Submit</button>
                </Form>
              </Formik>
            </div>
            )
          }
        </div>
      </div>
    );
  }

}

export default App;
