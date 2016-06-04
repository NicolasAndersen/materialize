require.config({
    baseUrl: '../zdk-dist/js',
    map: {
        '*' : {
            'zdkmaterial/waves': 'components/waves-initial'
        },
        'components/waves-initial': {
            'zdkmaterial/waves': 'zdkmaterial/waves'
        }
    },
    paths: {
        jquery: 'utils/jquery-1.9.1.min',
        velocity: 'utils/velocity.min',
        'zdkmaterial/buttons': 'components/buttons',
        'zdkmaterial/waves': 'components/waves'
    },
    shim: {
        velocity: ['jquery'],
        'zdkmaterial/buttons': ['jquery', 'velocity'],
        'zdkmaterial/waves': {
            'exports': 'Waves'
        }
    }
});