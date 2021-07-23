import React, { useEffect } from "react";
import { useState } from "react";
import SchoolService from "../../services/schoolService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UpdateSchools({cvId,updateCvValues}) {

  let [schools, setSchools] = useState([]);

  let schoolService = new SchoolService();
  useEffect(() => {    
    let schoolService = new SchoolService();
    schoolService.getByCvId(cvId).then((result) => {
      setSchools(result.data.data);
    });
  },[cvId]);

  let schoolAddSchema = Yup.object().shape({
    iscontinued: Yup.boolean(),
    schoolName: Yup.string().required("Bu alan zorunludur").min(2,"Minimum 2 karakter uzunlugunda olmalıdır"),
    
  })

  const formik = useFormik({
    initialValues: {
      iscontinued:false,
      schoolName:""
      
    },
    validationSchema: schoolAddSchema,
    onSubmit:(values)=>{
      values.userId=cvId;
      schoolService.addScholl(values).then((result) => {
        toast.success(result.data.message)
        schoolService.getByCvId(cvId).then((result) => {
          setSchools(result.data.data);
        })
        updateCvValues();
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  })

  const handleDeleteScholl = (schoolId) => {
    schoolService.deleteSchool(schoolId).then((result) =>{
      toast.success(result.data.message);
      schoolService.getByCvId(cvId).then((result) => {
        setSchools(result.data.data)
      })
      updateCvValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }


  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Okuduğu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Devam Ediyormu</Table.HeaderCell>

              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.iscontinued ? "Devam Ediyor":"Bitmiş"}</Table.Cell>

                <Table.Cell>
                  <Button color="red" icon="x" circular onClick={() => handleDeleteScholl(school.id)}>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Okul Ekle" />
        <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <label><b>Okul Adı</b></label>
                        <Form.Input
                            fluid
                            placeholder="Okul Adı"
                            type="text"
                            name="schoolName"
                            value={formik.values.schoolName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        
                    </Grid.Column>
                    <Grid.Column width={8}>
                    
                    <label><b>Devam Ediyormu</b></label>
                        <Form.Input
                            fluid 
                            type="checkbox"
                            name="iscontinued"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Grid.Column>
                </Grid>
                <div style={{marginTop:"1em"}}>
                <Button fluid color="green" type="submit">Ekle</Button>
                </div>
            </Form>
        </Card.Content>
      </Card>
    </div>
  );
}