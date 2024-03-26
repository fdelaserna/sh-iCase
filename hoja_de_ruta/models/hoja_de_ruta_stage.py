from odoo import fields, models


class HojaDaRutaStage(models.Model):
    _name = 'hoja.de.ruta.stage'
    _description = 'Hoja De Ruta Stage'
    _rec_name = 'name'
    _order = "sequence, name, id"

    name = fields.Char(string='Stage name')
    sequence = fields.Integer(string='Sequence', default=1)
