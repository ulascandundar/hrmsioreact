import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CandidateSkillService from "../../services/candidateSkillService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UpdateTechnology({ cvId, updateCvValues }) {
  let [technologies, setTechnologies] = useState([]);

  let technologyService = new CandidateSkillService();
  useEffect(() => {
    let technologyService = new CandidateSkillService();
    technologyService.getByCvId(cvId).then((result) => {
      setTechnologies(result.data.data);
    });
  },[cvId]);

  let technologyAddSchema = Yup.object().shape({
    skillName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
  });

  const formik = useFormik({
    initialValues: {
      skillName: "",
    },
    validationSchema: technologyAddSchema,
    onSubmit: (values) => {
      values.userId = cvId;
      technologyService
        .addSkill(values)
        .then((result) => {
          toast.success(result.data.message)
          technologyService.getByCvId(cvId).then((result) => {
            setTechnologies(result.data.data)
          })
          updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message)
        });
    },
  });

  const handleDeleteTechnology = (technologyId) => {
      technologyService.deleteSkill(technologyId).then((result) => {
          toast.success(result.data.message)
          technologyService.getByCvId(cvId).then((result) => {
            setTechnologies(result.data.data)
          })
          updateCvValues();
      }).catch((result) => {
          toast.error(result.response.data.message)
      })
  }

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Yetenek Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Yetenek Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı Adı"
                  type="text"
                  name="name"
                  value={formik.values.skillName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.name}
                  </div>
                )}
                <Button fluid color="green" type="submit">Ekle</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Yetenek</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {technologies?.map((technology) => (
                <Table.Row key={technology.id}>
                  <Table.Cell>{technology.skillName}</Table.Cell>
                  <Table.Cell>
                    <Button color="red" icon="x" circular onClick={() => handleDeleteTechnology(technology.id)}>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}