require.config({
    baseUrl: '../zdk-dist/js',
    map: {
        '*' : {
            'zdkmaterial/waves': 'components/waves-initial',
            'classnames': 'lib/classnames',
            'classnames-prefix': 'utils/classnames-prefix',
            'selector-builder': 'utils/selector-builder'
        },
        'components/waves-initial': {
            'zdkmaterial/waves': 'zdkmaterial/waves'
        }
    },
    paths: {
        'jquery': 'lib/jquery/jquery-1.9.1.min',
        'jquery/ui': 'lib/jquery/jquery-ui',
        'jquery/ui/widget': 'lib/jquery/jquery.widget',
        'velocity': 'lib/jquery/velocity.min',
        'zdkmaterial/groupButton': 'widget/group-button',
        'zdkmaterial/buttons': 'components/buttons',
        'zdkmaterial/dropdown': 'components/dropdown',
        'zdkmaterial/waves': 'components/waves'
    },
    shim: {
        'velocity': ['jquery'],
        'jquery/ui': ['jquery'],
        'zdkmaterial/waves': {
            'exports': 'Waves'
        },
        'classnames-prefix': {
            'exports': 'classnamesPrefix'
        },
        'selector-builder': {
            'exports': 'selectorBuilder'
        },
        'zdkmaterial/groupButton': ['jquery', 'jquery/ui/widget']
    },
    deps: [
        'classnames-prefix',
        'selector-builder'
    ]
});

require([
    'jquery',
    'zdkmaterial/waves',
    'zdkmaterial/buttons',
    'zdkmaterial/dropdown'
]);