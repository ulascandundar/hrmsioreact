import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { NavLink } from "react-router-dom";
import {
  Table,
  Button,
  Header,
  Icon,
  Pagination,
  Grid,
} from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";
import JobAdvertisementFilter from "../layouts/filters/JobAdvertisementFilter";

export default function JobAdvertisementList() {
  const [jobs, setJobs] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [filterOption, setFilterOption] = useState({});
  const [pageSize, setPageSize] = useState(2);
  const [totalPageSize, setTotalPageSize] = useState(0);

  const { addToast } = useToasts();

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
    .getAllByFilteredAndPaged(activePage, pageSize, filterOption)
    .then((result) => {
      setJobs(result.data.data);
      setTotalPageSize(parseInt(result.data.message));
        
      });
  }, [filterOption, activePage]);

  const handleFilterClick = (filterOption) => {
    if (filterOption.city_id.length === 0) filterOption.city_id = null;
    if (filterOption.jobposition_id.length === 0)
      filterOption.jobposition_id = null;
    if (filterOption.time_id.length === 0)
      filterOption.time_id = null;
    setFilterOption(filterOption);
    setActivePage(1);
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  

  return (
    <div>
      <Grid style={{marginLeft: "-21rem", marginTop: "1rem"}}>
        <Grid.Column width={4}>
        <JobAdvertisementFilter clickEvent={handleFilterClick} />
          </Grid.Column>

      <Grid.Column width={12}>
      <Header  as="h2">
        <Icon name="bullhorn" />
        <Header.Content>Job Advertisements</Header.Content>
      </Header>

      <Table  color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Açıklama</Table.HeaderCell>
            <Table.HeaderCell>Working Time</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
            <Table.HeaderCell>Add to Favorites</Table.HeaderCell>
          </Table.Row>
          </Table.Header>

        <Table.Body>
          {jobs?.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.employer.companyName}</Table.Cell>
              <Table.Cell>{job.jobPosition.position_name}</Table.Cell>
              <Table.Cell>{job.city.cityName}</Table.Cell>
              <Table.Cell>{job.minSalary} ₺</Table.Cell>
              <Table.Cell>{job.maxSalary} ₺</Table.Cell>
              <Table.Cell>{job.jobDescription}</Table.Cell>
              <Table.Cell>{job.workTime.time}</Table.Cell>
              <Table.Cell>{job.applicationDeadline}</Table.Cell>
              <Table.Cell>
                {(
                  (new Date(job.expirationDate).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                days
              </Table.Cell>
              <Table.Cell>
                {job.activationStatus === true ? "Active" : "Passive"}
              </Table.Cell>
              <Table.Cell>
                <Button
                  animated
                  as={NavLink}
                  to={`/jobAdvertisements/${job.id}`}
                  color="violet"
                >
                  <Button.Content visible>Show</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
              
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      <Pagination
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(totalPageSize / pageSize)}
      />
      </Grid.Column>
      </Grid>
    </div>
  );
}