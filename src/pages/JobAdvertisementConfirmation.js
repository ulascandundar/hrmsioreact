import React, { useEffect, useState } from "react";
import JobAdvertisementService from "../services/jobAdvertisementService";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import swal from "sweetalert";

export default function JobAdvertisementConfirm() {
  let jobAdvertisementService = new JobAdvertisementService();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobAdvertisementService
      .getAllByActivationStatusFalse()
      .then((result) => setJobs(result.data.data));
  });

  const activate = (id) => {
    jobAdvertisementService.activate(id, true).then(
      swal({
        title: "Başarılı!",
        text: "İş ilanı aktifleştirildi.",
        icon: "success",
        button: "Ok",
      }).then(function () {
        window.location.reload();
      })
    );
  };

  const deleteJobAdvertisement = (id) => { console.log(id)
    swal({
      title: "Eminmisin?",
      text: "İş ilanı silindikten sonra geri dönüşü olamaz.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        jobAdvertisementService.delete(id).then(
          swal("Silindi", {
            icon: "success",
          }).then(function () {
            window.location.reload();
          })
        );
      } else {
        swal(
          "Cancelled",
          "Silme işlemi iptal edildi",
          "error"
        );
      }
    });
  };

  return (
    <div>
      <Header as="h2">
        <Icon name="thumbtack" />
        <Header.Content>Job Advertisement Requests</Header.Content>
      </Header>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Quota</Table.HeaderCell>
            <Table.HeaderCell>Working Time</Table.HeaderCell>
            <Table.HeaderCell>Working Method</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Approval Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.employer.companyName}</Table.Cell>
              <Table.Cell>{job.jobPosition.position_name}</Table.Cell>
              <Table.Cell>{job.city.cityName}</Table.Cell>
              <Table.Cell>{job.minSalary} ₺</Table.Cell>
              <Table.Cell>{job.maxSalary} ₺</Table.Cell>
              <Table.Cell>{job.jobDescription}</Table.Cell>
              <Table.Cell>{job.workTime.time}</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>
                {(
                  (new Date(job.applicationDeadline).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                days
              </Table.Cell>
              <Table.Cell>
                {job.isActive === true ? "Active" : "Passive"}
              </Table.Cell>
              <Table.Cell>
                <Button
                  fluid
                  size="tiny"
                  positive
                  onClick={(e) => activate(job.id)}
                >
                  <Icon name="check" /> Confirm
                </Button>
                <Button
                  fluid
                  size="tiny"
                  negative
                  onClick={(e) => deleteJobAdvertisement(job.id)}
                >
                  <Icon name="trash alternate" /> Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}