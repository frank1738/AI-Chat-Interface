import { Input } from '../ui/input';
import FormButtons from './FormButtons';
import FormComponent from './FormComponent';
import FormHeader from './FormHeader';
import { Button } from '../ui/button';

const EditComponent = () => {
  const handleSubmit = () => {
    window.alert('Edit form');
  };
  return (
    <FormComponent handleSubmit={handleSubmit}>
      <FormHeader>
        <h1>Please Edit your form</h1>
      </FormHeader>
      <div>
        <Input placeholder="name" />
        <Input placeholder="email" />
      </div>
      <FormButtons>
        <div className="flex justify-between">
          <Button>Cancel</Button>
          <Button>Edit</Button>
        </div>
      </FormButtons>
    </FormComponent>
  );
};

export default EditComponent;

function ProfileCard({
  showEmail,
  showAvatar,
  showAge,
  showPhone,
  showBio,
  showLocation,
  user,
}) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.title}</p>
      {showAvatar && <img src={user.avatar} />}
      {showEmail && <p>{user.email}</p>}
      {showLocation && <span>{user.location}</span>}
      {/* too many props 😱 */}
    </div>
  );
}
