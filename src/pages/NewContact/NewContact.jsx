import PageHeader from '../../components/PageHeader/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contacto"
      />

      <Input placeholder="Nome" />
      <Select>
        <option value="123">Instagram</option>
        <option value="123">Instagram</option>
        <option value="123">Instagram</option>
        <option value="123">Instagram</option>
      </Select>

      <Button>Save</Button>
      <Button disabled>Save</Button>

    </>
  );
}

export default NewContact;
