require.config({
    baseUrl: '../zdk-dist/js',
    map: {
        '*' : {
            'zendkofy/material/waves': 'components/waves-initial',
            'classnames': 'lib/classnames',
            'classnames-prefix': 'utils/classnames-prefix',
            'zendkofy/material/buttons': 'components/buttons',
            'zendkofy/material/dropdown': 'components/dropdown',
            'zendkofy/material/cards': 'components/cards',
            'zendkofy/material/chips': 'components/chips',
            'zendkofy': 'utils/zendkofy',
            'zendkofy/init': 'utils/zendkofy/init',
            'zendkofy/default': 'utils/zendkofy/default',
            'zendkofy/classnames': 'utils/zendkofy/classnames',
            'zendkofy/selector-builder': 'utils/zendkofy/selector-builder',
            'zendkofy/selector-class': 'utils/zendkofy/selector-class',
            'zendkofy/selector-attribute': 'utils/zendkofy/selector-attribute'
        },
        'components/waves-initial': {
            'zendkofy/material/waves': 'zendkofy/material/waves'
        }
    },
    paths: {
        // 'jquery': 'lib/jquery/jquery-1.9.1.min',
        'jquery': 'lib/jquery/jquery-3.0.0',
        'jquery/ui': 'lib/jquery/jquery-ui',
        'jquery/ui/widget': 'lib/jquery/jquery.widget',
        'velocity': 'lib/jquery/velocity.min',
        'zendkofy/material/groupButton': 'widget/group-button',
        'zendkofy/material/waves': 'components/waves'
    },
    shim: {
        'velocity': ['jquery'],
        'jquery/ui': ['jquery'],
        'zendkofy/material/waves': {
            'exports': 'Waves'
        },
        'zendkofy': {
            'exports': 'Zendkofy'
        },
        'zendkofy/material/groupButton': ['jquery', 'jquery/ui/widget']
    },
    deps: [
        'zendkofy/selector-builder',
        'zendkofy'
    ]
});

require([
    'jquery',
    'zendkofy/material/waves',
    'zendkofy/material/buttons',
    'zendkofy/material/dropdown',
    'zendkofy/material/cards',
    'zendkofy/material/chips'
]);