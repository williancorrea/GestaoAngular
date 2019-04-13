export const environment = {
    production: true,


    apiUrl: 'https://gestao-api-wcorrea.herokuapp.com',
    // Verificar arquivo de proxy - proxy.config.json
    // apiUrl: '/api',

    dataTable: {
        filterDelay: 500,
        rows: 10,
        rowsPerPageOptions: [5, 10, 20, 50, 100]
    },
    comboBox: {
        minCaracterParaPesquisa: 1,
        filtroDelay: 500,
        linhas: 100
    }
};
