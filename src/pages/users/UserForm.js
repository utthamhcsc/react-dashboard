import { Paper, Box } from '@mui/material';

import React, { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { controls } from '../../components/Inputs';
import FormLayout from '../../components/layout/FormLayout';
import { LocalStorageService } from '../../services/LocalStorageService';
import { useForm } from '../../hooks/useForm';
function AdminForm() {
  const { id } = useParams();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    vendorEmail: '',
    vendorGSTIN: '',
    vendorName: '',
    vendorPhone: '',
    vendorPocName: '',
    vendorPrimaryAddress: '',
    vendorQuarternaryAddress: '',
    vendorSecondaryAddress: '',
    vendorTertiaryAddress: '',
  });
  const { values, handleInputChange, resetForm, setValue, setValues } = useForm(
    initialValues,
    false,
    {}
  );
  const ls = new LocalStorageService('supplier', []);
  const title = id ? 'Edit Items' : 'Add Items';
  const subtitle = '  Fill in the fields to Add or Update.';
  React.useEffect(() => {
    const data = ls.data?.find((item) => item.id == id) || initialValues;

    if (id) {
      setValues((v) => ({ ...data }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      ls.set(ls.data?.map((item) => (item.id == id ? values : item)));
    } else {
      ls.set([...ls.data, { id: ls.data.length + 1, ...values }]);
    }
    history.push(`/${path?.split('/')[1]}`);
  };
  return (
    <FormLayout loading={loading} {...{ title, subtitle, handleSubmit }}>
      <controls.MyInput
        label="Supplier Name"
        required
        name={'vendorName'}
        value={values?.vendorName}
        onChange={handleInputChange}
      />

      <controls.MyInput
        label="Supplier Primary Address"
        required
        multiline
        rows={3}
        name={'vendorPrimaryAddress'}
        value={values?.vendorPrimaryAddress}
        onChange={handleInputChange}
      />

      <controls.MyInput
        label="Supplier Secondary Address"
        required
        multiline
        rows={3}
        name={'vendorSecondaryAddress'}
        value={values?.vendorSecondaryAddress}
        onChange={handleInputChange}
      />

      <controls.MyInput
        label="Supplier Email"
        required
        name={'vendorEmail'}
        value={values?.vendorEmail}
        onChange={handleInputChange}
      />

      <controls.MyInput
        label="Supplier Phone"
        required
        name={'vendorPhone'}
        value={values?.vendorPhone}
        onChange={handleInputChange}
      />
      <controls.MyInput
        label="Supplier GSTIN"
        required
        name={'vendorGSTIN'}
        value={values?.vendorGSTIN}
        onChange={handleInputChange}
      />
    </FormLayout>
  );
}

export default AdminForm;
