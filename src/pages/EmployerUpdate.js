import { useSelector } from "react-redux";
import *as Yup from "yup"
import HRMSInput from "../utilities/fields/HRMSInput";
import { Grid, Header, Segment, Button, FormGroup } from "semantic-ui-react";
import { Formik, Form } from "formik";
import EmployerUpdateService from "../services/employerUpdateService";
import { toast } from "react-toastify";


export default function EmployerUpdate() {

  const {authItem} = useSelector(state => state.auth)


  const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Şirket adı boş bırakılamaz!"),
        email:Yup.string().required("Mail adresi boş bırakılamaz!"),
        phoneNumber:Yup.string().required("Telefon Numarası boş bırakılamaz!"),
        password:Yup.string().required("Şifre bilgisi boş bırakılamaz!"),
        webSite:Yup.string().required("Şirket web adresi boş bırakılamaz!")
  });
  const initialValues = {
    companyName: undefined,
    email: undefined,
    phoneNumber: undefined,
    password: undefined,
    webSite: undefined,
    employer_id:authItem[0].user.id
  };

  const onSubmit = (values) => {
    
    console.log(values)
    let employerUpdateService= new EmployerUpdateService()
    employerUpdateService.add(values).then(toast.success("İş ilanı eklendi").catch((result) => {
      toast.error("güncellenemedi")
    }))
  }

  return (
    <>
      <Grid
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as="h1" color="teal" textAlign="center">
            Güncelleme
          </Header>

          <Segment stacked>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="ui form">
                <FormGroup widths="equal">
                  
                  <HRMSInput
                    label="Şirket İsmi"
                    name="companyName"
                    placeholder="Şirket İsmi"
                    icon="briefcase"
                    iconPosition="left"
                  />
                </FormGroup>

                

                <FormGroup widths="equal">
                  <HRMSInput
                    label="Email"
                    name="email"
                    placeholder="Email"
                    icon="money"
                    iconPosition="left"
                  />
                  <HRMSInput
                    label="Telefon Numarası"
                    name="phoneNumber"
                    placeholder="Telefon Numarası"
                    icon="money"
                    iconPosition="left"
                    type="number"
                  />
                </FormGroup>

                <HRMSInput
                  label="Şifre"
                  name="password"
                  placeholder="Şifre"
                  icon="calendar alternate"
                  iconPosition="left"
                />

                <HRMSInput
                  label="Web Sitesi"
                  name="webSite"
                  placeholder="Web Sitesi"
                  icon="file text"
                  iconPosition="left"
                />

                <br />
                <Button type="submit" color="teal" fluid size="large">
                  Oluştur
                </Button>
              </Form>
            </Formik>
          </Segment>
        </Grid.Column>
      </Grid>
      
    </>
  );
}