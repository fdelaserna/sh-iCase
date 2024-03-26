from odoo import api, fields, models


class StockPicking(models.Model):
    _inherit = "stock.picking"

    roadmap = fields.Many2many('hoja.de.ruta', string='Hoja de Ruta')
    date_of_admission = fields.Date(
        string='Fecha de Ingreso', help='Date of arrival of the merchandise to'
                                        ' the warehouse',
        domain=[("picking_type_code", "!=", "incoming")])
