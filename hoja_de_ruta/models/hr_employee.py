from odoo import api, fields, models


class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    estado = fields.Selection(selection=[('Efectivo', 'Efectivo'),
                                         ('Baja', 'Baja')], string='Estado',)
    tipo = fields.Many2one('l10n_latam.identification.type', string='Tipo',
                           related='work_contact_id.l10n_latam_identification_type_id')
    documento = fields.Char(string='Documento', related='work_contact_id.vat')
    legajo = fields.Integer(string='Legajo')
    cuil = fields.Char(string='CUIL')
    jornada = fields.Selection(selection=[('Completa', 'Completa'),
                                          ('Media', 'Media')], string='Jornada')
    registro_afip = fields.Selection(
        selection=[('Ventas A', 'Ventas A'), ('Ventas B', 'Ventas B'),
                   ('Admin A', 'Admin A'), ('Maestranza A', 'Maestranza A'),
                   ('FC', 'FC')], string='Registro AFIP')
    fecha_de_baja = fields.Date(string='Fecha De Baja')
    fecha_de_ingreso = fields.Date(string='Fecha De Ingreso')
    historia = fields.One2many('hr.employee.line', 'employee_id',
                               string='Historia')


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

    box = fields.Char(string='Box')


class ResUsers(models.Model):
    _inherit = 'res.users'

    patente = fields.Char(string='Patente')
