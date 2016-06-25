require.config({
    baseUrl: '../dist/js',
    map: {
        '*' : {
            'material/waves': 'components/waves-initial',
            'classnames': 'lib/classnames',
            'classnames-prefix': 'utils/classnames-prefix',
            'material/buttons': 'components/buttons',
            'material/dropdown': 'components/dropdown',
            'material/cards': 'components/cards',
            'material/chips': 'components/chips',
            'material/tabs': 'components/tabs',
            'material/toasts': 'components/toasts',
            'material/tooltip': 'components/tooltip',
            'material/leanModal': 'components/leanModal',
            'material/collapsible': 'components/collapsible',
            'material/transitions': 'components/transitions',
            'material/materialbox': 'components/materialbox',
            'material/slider': 'components/slider',
            'material/carousel': 'components/carousel',
            'material/sideNav': 'components/sideNav',
            'material/scrollFire': 'components/scrollFire',
            'material/character_counter': 'components/character_counter',
            'jquery/hammer': 'lib/jquery/jquery.hammer',
            'zendkofy': 'utils/zendkofy-1.0.0',
            'zendkofy/init': 'utils/components/init',
            'zendkofy/default': 'utils/components/default',
            'zendkofy/classnames': 'utils/components/classnames',
            'zendkofy/selector-builder': 'utils/components/selector-builder',
            'zendkofy/selector-class': 'utils/components/selector-class',
            'zendkofy/selector-attribute': 'utils/components/selector-attribute',
            'material/guid': 'utils/components/guid',
            'material/element-or-parent-is-fixed': 'utils/components/element-or-parent-is-fixed',
        },
        'components/waves-initial': {
            'material/waves': 'material/waves'
        }
    },
    paths: {
        // 'jquery': 'lib/jquery/jquery-1.9.1.min',
        'jquery': 'lib/jquery/jquery-1.11.3',
        'jquery/ui': 'lib/jquery/jquery-ui',
        'jquery/ui/widget': 'lib/jquery/jquery.widget',
        'jquery/ui/easing': 'lib/jquery/jquery.easing.1.3',
        'velocity': 'lib/jquery/velocity.min',
        'hammerjs': 'lib/hammer.min',
        'material/groupButton': 'widget/group-button',
        'material/waves': 'components/waves',
        'material/scrollspy': 'components/scrollspy'
    },
    shim: {
        'velocity': ['jquery'],
        'jquery/ui': ['jquery'],
        'jquery/ui/easing': ['jquery'],
        'material/waves': {
            'exports': 'Waves'
        },
        'material/scrollspy': ['jquery'],
        'zendkofy': {
            'exports': 'Zendkofy'
        },
        'hammerjs': {
            'exports': 'Hammer'
        },
        'material/groupButton': ['jquery', 'jquery/ui/widget']
    },
    deps: [
        'zendkofy/selector-builder',
        'zendkofy'
    ]
});

require([
    'jquery',
    'material/waves',
    'material/buttons',
    'material/dropdown',
    'material/cards',
    'material/chips',
    'material/tabs',
    'material/toasts',
    'material/tooltip',
    'material/leanModal',
    'material/collapsible',
    'material/transitions',
    'material/sideNav',
    'material/materialbox',
    'material/slider',
    'material/carousel',
    'material/scrollFire',
    'material/scrollspy',
    'material/character_counter',
]);