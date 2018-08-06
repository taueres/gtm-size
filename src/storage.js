const { InfluxDB, FieldType } = require('influx');

const DATABASE_NAME = 'gtm_sizes';

const influx = new InfluxDB({
    host: 'influxdb',
    database: DATABASE_NAME,
    schema: [
        {
            measurement: 'size',
            fields: { size: FieldType.INTEGER },
            tags: ['type']
        }
    ]
});

const databaseCheck = influx.getDatabaseNames()
    .then(names => {
        if (!names.includes(DATABASE_NAME)) {
            return influx.createDatabase(DATABASE_NAME);
        }
    });

exports.saveSize = size => {
    databaseCheck.then(() => {
        return influx.writePoints([
            {
                measurement: 'size',
                tags: {
                    type: 'plain',
                },
                fields: { size },
            }
        ], {
            database: DATABASE_NAME,
            precision: 's',
        });
    });
};
