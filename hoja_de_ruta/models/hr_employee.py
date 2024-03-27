from odoo import api, fields, models


class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    estado = fields.Selection(selection=[('Efectivo', 'Efectivo'),
                                         ('Baja', 'Baja')], string='Estado1',)
    tipo = fields.Many2one('l10n_latam.identification.type', string='Tipo1',
                           related='work_contact_id.l10n_latam_identification_type_id')
    documento = fields.Char(string='Documento1', related='work_contact_id.vat')
    legajo = fields.Integer(string='Legajo1')
    cuil = fields.Char(string='CUIL1')
    jornada = fields.Selection(selection=[('Completa', 'Completa'),
                                          ('Media', 'Media')], string='Jornada1')
    registro_afip = fields.Selection(
        selection=[('Ventas A', 'Ventas A'), ('Ventas B', 'Ventas B'),
                   ('Admin A', 'Admin A'), ('Maestranza A', 'Maestranza A'),
                   ('FC', 'FC')], string='Registro AFIP1')
    fecha_de_baja = fields.Date(string='Fecha De Baja1')
    fecha_de_ingreso = fields.Date(string='Fecha De Ingreso1')
    historia = fields.One2many('hr.employee.line', 'employee_id',
                               string='Historial1')


class HrEmployeeLine(models.Model):
    _name = 'hr.employee.line'
    _description = 'Hr Employee Line'

    employee_id = fields.Many2one('hr.employee', string='Employee',
                                  readonly=True)
    name = fields.Char(string='Descripción')
    fecha_de_baja = fields.Date(string='Fecha De Baja')
    fecha_de_ingreso = fields.Date(string='Fecha De Ingreso')
    sequence = fields.Integer(string='Secuencia')


class HrPartner(models.Model):
    _inherit = 'res.partner'

    box = fields.Char(string='Box')
    patente = fields.Char(string='Patente')


class HelpDeskTicket(models.Model):
    _inherit = 'helpdesk.ticket'

    partner_id = fields.Many2one('res.partner')
    box = fields.Char(string='Box', related='partner_id.box')


class ResUsers(models.Model):
    _inherit = 'res.users'

    patente = fields.Char(string='Patente')
