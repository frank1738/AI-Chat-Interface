import FormComponent from './FormComponent';
import FormHeader from './FormHeader';
import { Input } from '../ui/input';
import FormButtons from './FormButtons';
import { Button } from '../ui/button';
const CreateComponent = () => {
  const handleCreate = (e) => {
    e.preventDefault();
    window.alert('create form');
  };
  return (
    <div>
      <FormComponent handleSubmit={handleCreate}>
        <FormHeader>
          <h1>Hi, welcome, create your form</h1>
        </FormHeader>
        <div>
          <Input placeholder="name" />
          <Input placeholder="email" />
          <Input placeholder="password" />
        </div>
        <FormButtons>
          <div className="flex flex-row-reverse">
            <Button>Create</Button>
          </div>
        </FormButtons>
      </FormComponent>
    </div>
  );
};

export default CreateComponent;
