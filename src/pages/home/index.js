import React from 'react';
import Moment from 'moment';
import ReactTable from 'react-table';
import LoadingScreen from '../../components/LoadingScreen';
import { tableKeys } from '../../constants/constants';
import withAuthorization from '../../components/withAuthorization';
import { getReadableShipmentsTableData } from '../../utils/shipments';
import { getReadableReceiptsTableData } from '../../utils/receipts';

const shipKeys = tableKeys.shipments;
const receiptKeys = tableKeys.receipts;

const styles = {
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 24
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipData: null,
      receiptsData: null
    };
  }

  componentDidMount() {
    getReadableShipmentsTableData().then(snapshot => {
      const ship = snapshot.val();
      const filteredShip = [];
      for (let i = 0; i < ship.length; i++) {
        const entry = ship[i];
        const entryDate = Moment(entry.ship_date, 'MM/DD/YYYY');
        if (entryDate >= Moment().add(-10, 'days') && entryDate <= Moment()) {
          filteredShip.push(entry);
        }
      }
      this.setState({ shipData: filteredShip });
    });

    getReadableReceiptsTableData().then(snapshot => {
      const receipts = snapshot.val();
      const filteredReceipts = [];
      for (let i = 0; i < receipts.length; i++) {
        const entry = receipts[i];
        const entryDate = Moment(entry.recieve_date, 'MM/DD/YYYY');
        if (entryDate >= Moment().add(-10, 'days') && entryDate <= Moment()) {
          filteredReceipts.push(entry);
        }
      }
      this.setState({ receiptsData: filteredReceipts });
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <p>
          Welcome to
          <em>BMAC-Warehouse</em>! Today is
          {Moment().format('dddd MMMM Do YYYY')}
        </p>
        <strong>Last 10 days Shipments</strong>

        {!this.state.shipData ? (
          <LoadingScreen />
        ) : (
          <ReactTable
            data={this.state.shipData ? this.state.shipData : []}
            columns={shipKeys.map(string => {
              if (string === 'customer_id') {
                return {
                  Header: 'Customer',
                  accessor: string
                };
              }

              return {
                Header: 'Ship Date',
                accessor: string
              };
            })}
            defaultPageSize={this.state.shipData.length}
            className="-striped -highlight"
            showPagination={false}
          />
        )}

        <strong>Last 10 days Receipts</strong>

        {!this.state.receiptsData ? (
          <LoadingScreen />
        ) : (
          <ReactTable
            data={this.state.receiptsData ? this.state.receiptsData : []}
            columns={receiptKeys.map(string => ({
              Header: string
                .replace('_', ' ')
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' '),
              accessor: string
            }))}
            defaultPageSize={this.state.receiptsData.length}
            className="-striped -highlight"
            showPagination={false}
          />
        )}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

const adminOnly = false;

export default withAuthorization(authCondition, adminOnly)(Home);
