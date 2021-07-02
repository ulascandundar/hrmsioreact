import React, { useEffect, useState } from 'react'
import { Label, Dropdown, Segment, Checkbox, Button } from 'semantic-ui-react'
import CityService from '../../services/cityService';
import JobPositionService from '../../services/jobPositionService'
import WorkingTimeService from '../../services/workingTimeService';
import "../../App.css";

export default function JobAdvertisementFilter({ clickEvent }) {

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workingTimes, setWorkingTimes] = useState([])

    useEffect(() => {
        let cityService = new CityService()
        cityService.getAll().then(result => setCities(result.data.data))

        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))

        let workingTimeService = new WorkingTimeService()
        workingTimeService.getAll().then(result => setWorkingTimes(result.data.data))
    }, [])

    const [cityIndexs, setCityIndexs] = useState([])
    const handleChangeCity = (e, { value }) => {
        setCityIndexs(value)
    }

    const [jobPositionsIndexes, setJobPositionsIndexes] = useState([])
    const handleChangeJobPosition = (e, { value, checked }) => {
        if (checked)
        jobPositionsIndexes.push(value)
        else {
            let index = jobPositionsIndexes.indexOf(value)
            if (index > -1) {
                jobPositionsIndexes.splice(index, 1)
            }
        }
    }


    const [workingTimeIndexes, setWorkingTimeIndexes] = useState([])
    const handleChangeWorkingTime = (e, { value, checked }) => {

        if (checked)
            workingTimeIndexes.push(value)
        else {
            let index = workingTimeIndexes.indexOf(value)
            if (index > -1) {
                workingTimeIndexes.splice(index, 1)
            }
        }
    }

    return (
        <div>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">City</Label>
                <Dropdown
                    placeholder='Choose a City'
                    selection
                    search
                    multiple
                    clearable
                    options={cities.map((city, index) => {
                        return { text: city.cityName, key: city.index, value: city.id }
                    })}
                    onChange={handleChangeCity}
                    value={cityIndexs}
                />
            </Segment>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">Job Position</Label>
                {
                    jobPositions.map(jobPosition => (
                        <Checkbox
                        key={jobPosition.id}
                            label={jobPosition.position_name}
                            className="mt-4 d-block"
                            onChange={handleChangeJobPosition}
                            value={jobPosition.id}
                        />
                    ))
                }
            </Segment>
  
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">Working Time</Label>
                {
                    workingTimes.map(workingTime => (
                        <Checkbox
                        key={workingTime.id}
                            label={workingTime.time}
                            className="mt-4 d-block"
                            onChange={handleChangeWorkingTime}
                            value={workingTime.id}
                        />
                    ))
                }
            </Segment>
            <Button
                type="button"
                fluid
                color="olive"
                onClick={() => clickEvent({ city_id: cityIndexs, jobposition_id: jobPositionsIndexes, time_id: workingTimeIndexes })}
            >
                Filter
            </Button>            
        </div>
    )
}