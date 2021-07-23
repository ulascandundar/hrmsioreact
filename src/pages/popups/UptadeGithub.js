import React from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Form } from "semantic-ui-react";
import { toast } from 'react-toastify';
import CandidateService from '../../services/candidateService';

export default function UptadeGithub({id,updateCvValues}) {

    let candidateService = new CandidateService();
    const updateGithubSchema = Yup.object().shape({
        github: Yup.string().required("Zorunlu")
    })

    const formik = useFormik({
        initialValues:{
            github:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            candidateService.updateGithub(id,values.github).then((result) =>{
                toast.success(result.data.message)
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    return (
        <div>
            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>GitHub Link</b></label>
                <div style={{marginTop :"1em" ,marginBottom:"1em"}}>
                <Form.Input
                    fluid
                    placeholder="Github Link"
                    type="text"
                    value={formik.values.github}
                    name="github"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.github && formik.touched.github && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.github}
                  </div>
                )
              }
              </div>
              <Button color="green" fluid size="large" type="submit">Güncelle</Button>
            </Form>
        </div>
    )
}