require.config({
    baseUrl: '../dist/js',
    map: {
        '*' : {
            'zendkofy/material/waves': 'components/waves-initial',
            'classnames': 'lib/classnames',
            'classnames-prefix': 'utils/classnames-prefix',
            'zendkofy/material/buttons': 'components/buttons',
            'zendkofy/material/dropdown': 'components/dropdown',
            'zendkofy/material/cards': 'components/cards',
            'zendkofy/material/chips': 'components/chips',
            'zendkofy/material/tabs': 'components/tabs',
            'zendkofy/material/toasts': 'components/toasts',
            'zendkofy/material/tooltip': 'components/tooltip',
            'zendkofy/material/leanModal': 'components/leanModal',
            'zendkofy/material/collapsible': 'components/collapsible',
            'zendkofy/material/transitions': 'components/transitions',
            'zendkofy': 'utils/zendkofy',
            'zendkofy/init': 'utils/zendkofy/init',
            'zendkofy/default': 'utils/zendkofy/default',
            'zendkofy/classnames': 'utils/zendkofy/classnames',
            'zendkofy/selector-builder': 'utils/zendkofy/selector-builder',
            'zendkofy/selector-class': 'utils/zendkofy/selector-class',
            'zendkofy/selector-attribute': 'utils/zendkofy/selector-attribute',
            'zendkofy/material/guid': 'utils/zendkofy/guid',
            'zendkofy/material/element-or-parent-is-fixed': 'utils/zendkofy/element-or-parent-is-fixed',
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
        'jquery/ui/easing': 'lib/jquery/jquery.easing.1.3',
        'velocity': 'lib/jquery/velocity.min',
        'hammer': 'lib/hammer.min',
        'zendkofy/material/groupButton': 'widget/group-button',
        'zendkofy/material/waves': 'components/waves'
    },
    shim: {
        'velocity': ['jquery'],
        'jquery/ui': ['jquery'],
        'jquery/ui/easing': ['jquery'],
        'zendkofy/material/waves': {
            'exports': 'Waves'
        },
        'zendkofy': {
            'exports': 'Zendkofy'
        },
        'hammer': {
            'exports': 'Hammer'
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
    'zendkofy/material/chips',
    'zendkofy/material/tabs',
    'zendkofy/material/toasts',
    'zendkofy/material/tooltip',
    'zendkofy/material/leanModal',
    'zendkofy/material/collapsible',
    'zendkofy/material/transitions',
]);