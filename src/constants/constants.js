export const tableKeys = {

  shipments: [
    "customer_id",
    "funds_source",
    "ship_date",
    "ship_via",
    "ship_rate",
    "total_weight",
    "total_price",
    "invoice_date",
    "invoice_no",
    "notes"
  ],

  customers: [
    "customer_id",
    "code",
    "address",
    "city",
    "state",
    "zip",
    "county",
    "contact",
    "phone",
    "email",
    "status",
    "notes"
  ],

  receipts: [
    "provider_id",
    "recieve_date",
    "payment_source",
    "billed_amt",
    "notes"
  ],

  products: [
    "product_id",
    "product_code",
    "funding_source",
    "unit_weight",
    "unit_price",
    "initial_date",
    "initial_stock",
    "minimum_stock",
    "history",
    "current_stock",
    "inventory_date",
    "status",
    "notes"
  ],

  providers: [
    "provider_id",
    "code",
    "type",
    "address",
    "city",
    "state",
    "zip",
    "county",
    "contact",
    "phone",
    "email",
    "status",
    "notes"
  ],

  staff: [
    "unique_id",
    "username",
    "last_name",
    "first_name",
    "address",
    "city",
    "zip",
    "phone1",
    "phone2",
    "email",
    "type",
    "status",
    "notes",
    "password"
  ],
}

export const reportKeys = {
  'shipments': ['product', 'ship_date', 'customer', 'weight'],
  'receipts': ['product', 'receive_date', 'provider', 'weight'],
  'products': [],
  'customers': [],
  'providers': [],
}

export const radioValue2ReportType = {
  '1': 'Inventory Shipments',
  '2': 'Inventory Receipts',
  '3': 'Current Inventory',
  '4': 'Current Customers',
  '5': 'Current Providers',
  '6': 'Active',
  '7': 'Inactive/Discontinued',
}

export const reportType2TableName = {
  'Inventory Shipments': 'shipments',
  'Inventory Receipts': 'receipts',
  'Current Inventory': 'products',
  'Current Customers': 'customers',
  'Current Providers': 'providers',
};

export const reportType2DateAccessor = {
  'Inventory Shipments': 'ship_date',
  'Inventory Receipts': 'recieve_date',
  'Current Inventory': 'initial_date',
  'Current Customers': null,
  'Current Providers': null,
};

export const reportType2FundingSourceRelavancy = {
  'Inventory Shipments': true,
  'Inventory Receipts': false,
  'Current Inventory': true,
  'Current Customers': false,
  'Current Providers': false,
};

export const reportType2DateRangeRelavancy = {
  'Inventory Shipments': true,
  'Inventory Receipts': true,
  'Current Inventory': false,
  'Current Customers': false,
  'Current Providers': false,
};

export const tableName2FirebasePath = {
  'shipments': '2/shipments',
  'receipts':  '6/contributions',
  'products': '5/products',
  'customers': '1/customers',
  'providers': '3/providers',
  'persons': '0/persons',
  'fundingsources': '4/fundingsources',
};