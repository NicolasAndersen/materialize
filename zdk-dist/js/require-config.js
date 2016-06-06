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
        'jquery': 'utils/jquery/jquery-1.9.1.min',
        'jquery/ui': 'utils/jquery/jquery-ui',
        'jquery/ui/widget': 'utils/jquery/jquery.widget',
        'velocity': 'utils/jquery/velocity.min',
        'zdkmaterial/groupButton': 'widget/group-button',
        'zdkmaterial/buttons': 'components/buttons',
        'zdkmaterial/waves': 'components/waves'
    },
    shim: {
        'velocity': ['jquery'],
        'jquery/ui': ['jquery'],
        'zdkmaterial/buttons': ['jquery', 'velocity'],
        'zdkmaterial/waves': {
            'exports': 'Waves'
        },
        'zdkmaterial/groupButton': ['jquery', 'jquery/ui/widget']
    }
});