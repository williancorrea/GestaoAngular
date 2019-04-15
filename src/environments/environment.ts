// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --variaveisAmbiente=prod` then `environment.prod.ts` will be used instead.
// The estadoCivilList of which variaveisAmbiente maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: 'https://gestao-api-wcorrea.herokuapp.com',
    // apiUrl: 'http://192.168.0.134:8080',
    // apiUrl: 'http://localhost:8080',

    // ng serve --proxy-config proxy.config.json
    // apiUrl: 'api',

    dataTable: {
        filterDelay: 500,
        rows: 5,
        rowsPerPageOptions: [5, 10, 20, 50, 100]
    },

    comboBox: {
        minCaracterParaPesquisa: 1,
        filtroDelay: 500,
        linhas: 100
    }
};


// ng serve --port 4200 --host 192.168.0.110
