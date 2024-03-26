from odoo import fields, models


class HojaDeRuta(models.Model):
    _name = 'hoja.de.ruta'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _description = 'Hoja De Ruta'
    _track_duration_field = 'stage_id'

    check = fields.Boolean(string='Active')
    color = fields.Integer(string='Color')
    name = fields.Char(string='Description', required=True)
    additional = fields.Html(string='Adicionales')
    new_text = fields.Char(string='New Text')
    company_id = fields.Many2one('res.company', string='Compañía')
    delivery_date = fields.Date(string='Fecha de Reparto')
    status_in_progress = fields.Char(string='In Progress')
    status_prepared = fields.Char(string='Prepared')
    status_blocked = fields.Char(string='Blocked')
    kanban_state = fields.Selection(selection=[
        ('normal', 'In Progress'),
        ('done', 'Prepared'),
        ('blocked', 'Blocked'),
    ], string='Kanban Status',  default='normal', tracking=True)
    delivery_note = fields.Many2many('stock.picking',
                                     string='Albarán')
    grades = fields.Html(string='Grades')
    email = fields.Char(string='Email')
    partner_id = fields.Many2one('res.partner', string='Flete')
    phone = fields.Char(string='Teléfono')
    patent = fields.Char(string='Patente')
    priority = fields.Selection(selection=[
        ('0', 'Normal'), ('1', 'Low'), ('2', 'High'), ('3', 'Very High')
    ], string='Prioridad')
    high_priority = fields.Boolean(string='High priority')
    sequence = fields.Integer(string='Sequence')
    stage_id = fields.Many2one('hoja.de.ruta.stage', string='Stage')
