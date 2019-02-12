/**
 *  A component
 */

import React from 'react';
import { Button } from 'antd';
import ReactTable from 'react-table';
import LoadingScreen from '../../components/LoadingScreen';
import { DatePicker } from 'antd';
import Moment from 'moment';
import TableDropdown from '../../components/TableDropdown';
import { tableKeys } from '../../constants/constants';
import withAuthorization from '../../components/withAuthorization';
import { getReadableShipmentsTableData } from '../../utils/shipments';
import matchSorter from 'match-sorter';
import ShipmentForm from '../../components/form/types/ShipmentForm';

const keys = tableKeys['shipments'];

const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: 24
  },
};

const { RangePicker } = DatePicker;

class Shipments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      filteredData: null,
      dateRange: null,
      formModalVisible: false,
      rowData: null,
    }
  }

  onDateChange = (dateRange) => {
    var newData = []
    for (var i = 0; i < this.state.data.length; i++){
      var entry = this.state.data[i]
      var entryDate = Moment(entry['ship_date'], 'MM/DD/YYYY')
      if(entryDate >= dateRange[0] && entryDate <= dateRange[1]){
        newData.push(entry)
      }
    }
    this.setState({
      filteredData: newData,
      dateRange: dateRange,
    }, function () {console.log(this.state.dateRange)})
  }

  componentDidMount(){
    this.refreshTable()
  }

  refreshTable = () => {
    getReadableShipmentsTableData().then(data =>
      this.setState({ data: data.val() })
    );
  }

  render() {
    return(
      <div style={styles.container}>

        <div>
          <RangePicker
            onChange={this.onDateChange}
            format={'MM/DD/YYYY'}
          />
        </div>

        <Button type="primary"
                onClick={ () => this.setState({
                    formModalVisible: true,
                    rowData: null
                }) }>
          Add New Shipment
        </Button>

        <ShipmentForm
          formModalVisible={this.state.formModalVisible}
          refreshTable={this.refreshTable}
          onCancel={ () => this.setState({ formModalVisible: false }) }
          rowData={ this.state.rowData }
        />

        { !this.state.data ? <LoadingScreen/> :
          <ReactTable
            getTrProps={(state, rowInfo) => ({
                onClick: () => this.setState({
                  rowData: rowInfo.original,
                  formModalVisible: true,
                })
            })}
            data={this.state.filteredData && this.state.dateRange.length ?
                  this.state.filteredData : this.state.data}
            columns={keys.map(string => {
                if(string==='customer_id'){
                  return({
                    Header: string,
                    accessor: string,
                    filterable: true,
                    filterAll: true,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ['customer_id'] }),
                  })
                }
                else{
                  return({
                    Header: string,
                    accessor: string,
                  })}
            })}
            SubComponent={row => {
                return <TableDropdown
                         row={row.original.ship_items}
                             index={this.state.data.indexOf(row.original)}
                />
            }}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        }

      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Shipments);
