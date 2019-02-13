/**
 *  A component
 */

import React from 'react';
import { db } from '../../firebase';
import ReactTable from 'react-table';
import LoadingScreen from '../../components/LoadingScreen';
import { tableKeys } from '../../constants/constants';
import withAuthorization from '../../components/withAuthorization';
import matchSorter from 'match-sorter';
import {Button} from 'antd';
import CustomerForm from '../../components/form/types/CustomerForm';


const keys = tableKeys['customers'];

const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: 24,
  },
};

class Customers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      formModalVisible:false,
    }
  }

 
componentDidMount(){
    this.refreshTable();
}

refreshTable = () => {
  db.onceGetCustomers().then(snapshot =>
    this.setState({ data: Object.values(snapshot.val()) })
  );
}


  render() {
    return(
      <div style={styles.container}>
      <Button type="primary"
                onClick={ () => this.setState({ formModalVisible: true }) }>
          Add New Customer
        </Button>
        <CustomerForm
          formModalVisible={this.state.formModalVisible}
          refreshTable={this.refreshTable}
          onCancel={ () => this.setState({ formModalVisible: false }) }
        />
        { !this.state.data ? <LoadingScreen/> :
          <ReactTable
            data={this.state.data ? this.state.data : []}
            columns={keys.map(string => {
              if(string === 'customer_id')
                return({
                  Header:"Customer",
                  accessor: string,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ['customer_id'] }),
                  filterAll: true,
                  filterable:true,

                })
              else{
                return({
                  Header: string.replace('_',' ').split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' '),
                  accessor: string,
                })
              }
            })}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        }
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Customers);
