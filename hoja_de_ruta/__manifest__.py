{
    'name': 'Hoja De Ruta',
    'version': '17.0.1.0.0',
    'depends': ['stock', 'point_of_sale', 'helpdesk', 'hr', 'l10n_latam_base'],
    'data': [
        'security/ir.model.access.csv',
        'data/report_paperformat.xml',
        'views/hoja_de_ruta_views.xml',
        'views/hoja_de_ruta_stage_views.xml',
        'views/stock_picking_views.xml',
        'views/hr_employee.xml',
        'report/ir_actions_report.xml',
        'report/hoja_de_ruta_report.xml',
        'report/delivery_token.xml',

    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}
