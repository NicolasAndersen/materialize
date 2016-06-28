require.config({
    baseUrl: '../dist/js',
    map: {
        '*' : {
            'material/waves': 'components/waves-initial',
            'classnames': 'lib/classnames',
            'jquery/hammer': 'lib/jquery/jquery.hammer',
            'css': 'lib/require-css/css'

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
        'nouislider': 'extras/noUiSlider/nouislider',
        'material': 'components/materialize-global',
        'material/init': 'components/global/init',
        'material/guid': 'components/global/guid',
        'material/element-or-parent-is-fixed': 'components/global/element-or-parent-is-fixed',
        'material/buttons': 'components/buttons',
        'material/dropdown': 'components/dropdown',
        'material/form/input-fields': 'components/form/input-fields',
        'material/form/material-select': 'components/form/material-select',
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
        'material/waves': 'components/waves',
        'material/scrollspy': 'components/scrollspy',
        'zendkofy': 'utils/zendkofy-1.0.0',
        'zendkofy/init': 'utils/components/init',
        'zendkofy/default': 'utils/components/default',
        'zendkofy/classnames': 'utils/components/classnames',
        'zendkofy/selector-builder': 'utils/components/selector-builder',
        'zendkofy/selector-class': 'utils/components/selector-class',
        'zendkofy/selector-attribute': 'utils/components/selector-attribute',
        'zendkofy/guid': 'utils/components/guid',
        'zendkofy/element-or-parent-is-fixed': 'utils/components/element-or-parent-is-fixed',
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
        'material': {
            'exports': 'zMeterial'
        },
        'hammerjs': {
            'exports': 'Hammer'
        },
        'nouislider': {
            'deps': ['css!extras/noUiSlider/nouislider_style'],
            'exports': 'noUiSlider'
        }
    },
    deps: [
        'zendkofy/selector-builder',
        'zendkofy'
    ]
});

require([
    'jquery',
    'material',
    'material/waves',
    'material/buttons',
    'material/dropdown',
    'material/form/input-fields',
    'material/form/material-select',
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