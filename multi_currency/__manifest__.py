{
    'name': 'Multi Currency',
    'version': '17.0.1.0.0',
    'depends': ['stock', 'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/pos_payment_method_views.xml',
    ],
    'assets': {
         'point_of_sale._assets_pos': [
             'multi_currency/static/src/override/**/*',
             'multi_currency/static/src/js/card.js',
             'multi_currency/static/src/xml/card_views.xml',
             # 'multi_currency/static/src/xml/card.css',
         ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
