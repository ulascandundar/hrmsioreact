import React, { useEffect, useState } from "react";
import EmployerUpdateService from "../services/employerUpdateService";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import swal from "sweetalert";
import EmployeeService from "../services/employeeService";

export default function EmployerUpdateConfirm() {
  let employerUpdateService = new EmployerUpdateService();
  let employeeService=new EmployeeService();

  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    employerUpdateService
      .getAll()
      .then((result) => setUpdates(result.data.data));
  });

  const employerupdateconfirm = (id) => {
    employeeService.employerupdateconfirm(id).then(
      swal({
        title: "Başarılı!",
        text: "İş ilanı aktifleştirildi.",
        icon: "success",
        button: "Ok",
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
        employeeService.employerupdateconfirm(id)(
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
        <Header.Content>Şirket Güncellenmesi Onayı</Header.Content>
      </Header>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Web Site</Table.HeaderCell>
            <Table.HeaderCell>Telefon</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Şifre</Table.HeaderCell>
    
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {updates.map((update) => (
            <Table.Row key={update.employerUpdateId}>
              <Table.Cell>{update.companyName}</Table.Cell>
              <Table.Cell>{update.webSite}</Table.Cell>
              <Table.Cell>{update.phoneNumber}</Table.Cell>
              <Table.Cell>{update.email} ₺</Table.Cell>
              <Table.Cell>{update.password} ₺</Table.Cell>
              <Table.Cell>0</Table.Cell>
              
              <Table.Cell>
                <Button
                  fluid
                  size="tiny"
                  positive
                  onClick={(e) => employerupdateconfirm(update.employerUpdateId)}
                >
                  <Icon name="check" /> Confirm
                </Button>
                <Button
                  fluid
                  size="tiny"
                  negative
                  onClick={(e) => employerupdateconfirm(update.employerUpdateId)}
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