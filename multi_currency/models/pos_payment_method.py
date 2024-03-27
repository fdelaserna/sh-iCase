from odoo import fields, models, _, api


class PosPaymentMethod(models.Model):
    _inherit = 'pos.payment.method'

    enable_multi_currency = fields.Boolean()
    currency_rate_ids = fields.One2many('currency.rate', 'pos_payment_method_id')


class CurrencyRate(models.Model):
    _name = 'currency.rate'

    currency = fields.Many2one('res.currency', string='Currency')
    rate = fields.Float(string='Currency Exchange Rate')
    pos_payment_method_id = fields.Many2one('pos.payment.method')
