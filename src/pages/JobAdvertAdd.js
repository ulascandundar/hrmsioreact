import { useFormik } from 'formik'
import { Button, Form, Grid, GridColumn, Label } from 'semantic-ui-react'
import *as Yup from "yup"
import React, { useEffect, useState } from 'react'
import CityService from '../services/cityService';
import JobPositionService from '../services/jobPositionService';

import { toast } from 'react-toastify';
import WorkingTimeService from '../services/workingTimeService';
import JobAdvertisementService from '../services/jobAdvertisementService';
import {ToastContainer,Zoom,Bounce} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from 'react-redux';

export default function JobAdvertAdd() {

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workTimes, setWorkTimes] = useState([])
    const {authItem} = useSelector(state => state.auth)


    useEffect(() => {
        let cityService = new CityService();
        cityService.getAll().then((result) => setCities(result.data.data));
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data));
        let workingTime = new WorkingTimeService();
        workingTime.getAll().then(result=> setWorkTimes(result.data.data));

    }, []);

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            jobDescription: "",
            minSalary: "",
            maxSalary: "",
            numberOfOpenPositions: "",
            applicationDeadline: "",
            employer_id: authItem[0].user.id,
            time_id: "",
            jobposition_id: "",
            city_id: "",
        },
        validationSchema:
            Yup.object({
                jobDescription: Yup.string().required("Açıklama bos bırakılamaz!"),
                minSalary: Yup.number().required("Minimum maaş bırakılamaz!"),
                maxSalary: Yup.number().required("Maximum maaş bırakılamaz!"),
                numberOfOpenPositions: Yup.number().required("Açık pozisyon sayısı boş bırakılamaz!"),
                applicationDeadline: Yup.date().required("Son başvuru tarihi bos bırakılamaz!"),
                time_id: Yup.number().required("Çalışma şekli bos bırakılamaz!"),
                jobposition_id: Yup.number().required("İş pozisyonu boş bırakılamaz!"),
                city_id: Yup.string().required("Şehir boş bırakılamaz!"),
            }),
        onSubmit: values => {
            console.log(values);
            let jobPostingService = new JobAdvertisementService();
            
            jobPostingService.add(values).then(toast.success("İş ilanı eklendi"));
        }
    });

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Grid stackable>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>İş pozisyonu</label>
                            <select id="jobposition_id" name="jobposition_id" value={values.jobposition_id} onChange={handleChange}>
                                <option value="">İş pozisyonu seçiniz</option>
                                {jobPositions.map(jobPosition => (
                                    <option value={jobPosition.id}>{jobPosition.position_name}</option>
                                ))}
                            </select>
                            {
                                errors.jobposition_id && touched.jobposition_id &&
                                <Label basic color='red' pointing>
                                    {errors.jobposition_id}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Çalışma Türü</label>
                            <select id="time_id" name="time_id" value={values.time_id} onChange={handleChange}>
                                <option value="">Çalışma türü seçiniz</option>
                                {workTimes.map(typeOfWorking => (
                                    <option value={typeOfWorking.id}>{typeOfWorking.time}</option>
                                ))}
                            </select>
                            {
                                errors.time_id && touched.time_id &&
                                <Label basic color='red' pointing>
                                    {errors.time_id}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Şehir</label>
                            <select id="city_id" name="city_id" value={values.city_id} onChange={handleChange}>
                                <option value="">Şehir seçiniz</option>
                                {cities.map(city => (<option key={city.id} value={city.id} selected>{city.cityName}</option>))}
                            </select>
                            {
                                errors.city_id && touched.city_id &&
                                <Label basic color='red' pointing>
                                    {errors.city_id}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Açık Pozisyon Sayısı</label>
                            <input name="numberOfOpenPositions" placeholder='Açık Pozisyon Sayısı' value={values.numberOfOpenPositions} onChange={handleChange} />
                            {
                                errors.numberOfOpenPositions && touched.numberOfOpenPositions &&
                                <Label basic color='red' pointing>
                                    {errors.numberOfOpenPositions}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Son Başvuru Tarihi</label>
                            <input name="applicationDeadline" type="date" value={values.applicationDeadline} onChange={handleChange} />
                            {
                                errors.applicationDeadline && touched.applicationDeadline &&
                                <Label basic color='red' pointing>
                                    {errors.applicationDeadline}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Minimum Maaş</label>
                            <input name="minSalary" placeholder='Minimum Maaş' value={values.minSalary} onChange={handleChange} />
                            {
                                errors.minSalary && touched.minSalary &&
                                <Label basic color='red' pointing>
                                    {errors.minSalary}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    <GridColumn width={7}>
                        <Form.Field>
                            <label>Maksimum Maaş</label>
                            <input name="maxSalary" placeholder='Maksimum Maaş' value={values.maxSalary} onChange={handleChange} />
                            {
                                errors.maxSalary && touched.maxSalary &&
                                <Label basic color='red' pointing>
                                    {errors.maxSalary}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                    
                    <GridColumn width={14}>
                        <Form.Field>
                            <label>Açıklama</label>
                            <textarea name="jobDescription" placeholder='Açıklama' value={values.jobDescription} onChange={handleChange} />
                            {
                                errors.jobDescription && touched.jobDescription &&
                                <Label basic color='red' pointing>
                                    {errors.jobDescription}
                                </Label>
                            }
                        </Form.Field>
                    </GridColumn>
                </Grid>
                <Button type='submit' color="teal" style={{ marginLeft: "22em", marginTop: "1em" }}>İlan Ver</Button>
            </Form>
        </div>
    )
}